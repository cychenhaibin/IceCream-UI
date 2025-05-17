import React, { useState, useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames';
import Icon from '../../General/Icon';
import './index.less';

export interface TreeNode {
  key: string;
  title: React.ReactNode;
  children?: TreeNode[];
  isLeaf?: boolean;
  disabled?: boolean;
  checkable?: boolean;
  selectable?: boolean;
  expanded?: boolean;
  selected?: boolean;
  checked?: boolean;
  loading?: boolean;
}

export interface TreeProps {
  data: TreeNode[];
  defaultExpandedKeys?: string[];
  defaultSelectedKeys?: string[];
  defaultCheckedKeys?: string[];
  expandedKeys?: string[];
  selectedKeys?: string[];
  checkedKeys?: string[];
  checkable?: boolean;
  selectable?: boolean;
  multiple?: boolean;
  accordion?: boolean;
  draggable?: boolean;
  showLine?: boolean;
  loadData?: (node: TreeNode) => Promise<void>;
  onExpand?: (expandedKeys: string[], info: { node: TreeNode; expanded: boolean }) => void;
  onSelect?: (selectedKeys: string[], info: { node: TreeNode; selected: boolean }) => void;
  onCheck?: (checkedKeys: string[], info: { node: TreeNode; checked: boolean }) => void;
  onDragStart?: (node: TreeNode, e: React.DragEvent) => void;
  onDragEnter?: (dragNode: TreeNode, dropNode: TreeNode, e: React.DragEvent) => void;
  onDragLeave?: (dragNode: TreeNode, dropNode: TreeNode, e: React.DragEvent) => void;
  onDragOver?: (dragNode: TreeNode, dropNode: TreeNode, e: React.DragEvent) => void;
  onDragEnd?: (
    dragNode: TreeNode,
    dropNode: TreeNode | null,
    dropType: 'before' | 'after' | 'inner',
    e: React.DragEvent,
  ) => void;
  onDrop?: (
    dragNode: TreeNode,
    dropNode: TreeNode,
    dropType: 'before' | 'after' | 'inner',
    e: React.DragEvent,
  ) => void;
  allowDrop?: (
    dragNode: TreeNode,
    dropNode: TreeNode,
    dropType: 'before' | 'after' | 'inner',
  ) => boolean;
  allowDrag?: (node: TreeNode) => boolean;
  filterValue?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Tree: React.FC<TreeProps> = ({
  data,
  defaultExpandedKeys = [],
  defaultSelectedKeys = [],
  defaultCheckedKeys = [],
  expandedKeys,
  selectedKeys,
  checkedKeys,
  checkable = false,
  selectable = true,
  multiple = false,
  accordion = false,
  draggable = false,
  showLine = false,
  loadData,
  onExpand,
  onSelect,
  onCheck,
  onDragStart,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDragEnd,
  onDrop,
  allowDrop,
  allowDrag,
  filterValue,
  className,
  style,
}) => {
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(defaultExpandedKeys);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [internalCheckedKeys, setInternalCheckedKeys] = useState<string[]>(defaultCheckedKeys);
  const [loadingKeys, setLoadingKeys] = useState<string[]>([]);
  const [dragOverNode, setDragOverNode] = useState<TreeNode | null>(null);
  const [dropPosition, setDropPosition] = useState<number>(0);
  const [treeData, setTreeData] = useState<TreeNode[]>(data);
  const dragNode = useRef<TreeNode | null>(null);

  useEffect(() => {
    setTreeData(data);
  }, [data]);

  const handleExpand = useCallback(
    (node: TreeNode) => {
      if (node.disabled) return;

      const key = node.key;
      const isExpanded = internalExpandedKeys.includes(key);
      let newExpandedKeys: string[];

      if (accordion) {
        newExpandedKeys = isExpanded ? [] : [key];
      } else {
        newExpandedKeys = isExpanded
          ? internalExpandedKeys.filter((k) => k !== key)
          : [...internalExpandedKeys, key];
      }

      setInternalExpandedKeys(newExpandedKeys);
      onExpand?.(newExpandedKeys, { node, expanded: !isExpanded });

      if (loadData && !node.children && !node.isLeaf) {
        setLoadingKeys((prev) => [...prev, key]);
        loadData(node)
          .then(() => {
            setLoadingKeys((prev) => prev.filter((k) => k !== key));
          })
          .catch(() => {
            setLoadingKeys((prev) => prev.filter((k) => k !== key));
          });
      }
    },
    [internalExpandedKeys, accordion, loadData, onExpand],
  );

  const handleSelect = useCallback(
    (node: TreeNode) => {
      if (!selectable || node.disabled) return;

      const key = node.key;
      const isSelected = internalSelectedKeys.includes(key);
      let newSelectedKeys: string[];

      if (multiple) {
        newSelectedKeys = isSelected
          ? internalSelectedKeys.filter((k) => k !== key)
          : [...internalSelectedKeys, key];
      } else {
        newSelectedKeys = isSelected ? [] : [key];
      }

      setInternalSelectedKeys(newSelectedKeys);
      onSelect?.(newSelectedKeys, { node, selected: !isSelected });
    },
    [internalSelectedKeys, multiple, selectable, onSelect],
  );

  const findNode = useCallback(
    (
      key: string,
      nodes: TreeNode[],
    ): { node: TreeNode; parent: TreeNode | null; index: number } | null => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.key === key) {
          return { node, parent: null, index: i };
        }
        if (node.children) {
          const result = findNode(key, node.children);
          if (result) {
            return { ...result, parent: node };
          }
        }
      }
      return null;
    },
    [],
  );

  const getAllChildKeys = useCallback((node: TreeNode): string[] => {
    let keys: string[] = [];
    if (node.children) {
      node.children.forEach((child) => {
        keys.push(child.key);
        keys = keys.concat(getAllChildKeys(child));
      });
    }
    return keys;
  }, []);

  const getAllParentKeys = useCallback((key: string, nodes: TreeNode[]): string[] => {
    const keys: string[] = [];
    const findParent = (targetKey: string, currentNodes: TreeNode[], parentKey?: string) => {
      for (const node of currentNodes) {
        if (node.key === targetKey) {
          if (parentKey) keys.push(parentKey);
          return true;
        }
        if (node.children) {
          if (findParent(targetKey, node.children, node.key)) {
            if (parentKey) keys.push(parentKey);
            return true;
          }
        }
      }
      return false;
    };
    findParent(key, nodes);
    return keys;
  }, []);

  const handleCheck = useCallback(
    (node: TreeNode) => {
      if (!checkable || node.disabled) return;

      const key = node.key;
      const isChecked = internalCheckedKeys.includes(key);
      let newCheckedKeys: string[];

      // 获取所有子节点的key
      const childKeys = getAllChildKeys(node);
      // 获取所有父节点的key
      const parentKeys = getAllParentKeys(key, treeData);

      if (isChecked) {
        // 取消选中时，移除当前节点、所有子节点和父节点
        newCheckedKeys = internalCheckedKeys.filter(
          (k) => k !== key && !childKeys.includes(k) && !parentKeys.includes(k),
        );
      } else {
        // 选中时，添加当前节点和所有子节点
        newCheckedKeys = [...internalCheckedKeys, key, ...childKeys];

        // 检查是否需要选中父节点
        parentKeys.forEach((parentKey) => {
          const parentNode = findNode(parentKey, treeData)?.node;
          if (parentNode) {
            const allSiblings = getAllChildKeys(parentNode);
            const allSiblingsChecked = allSiblings.every((siblingKey) =>
              newCheckedKeys.includes(siblingKey),
            );
            if (allSiblingsChecked) {
              newCheckedKeys.push(parentKey);
            }
          }
        });
      }

      setInternalCheckedKeys(newCheckedKeys);
      onCheck?.(newCheckedKeys, { node, checked: !isChecked });
    },
    [
      internalCheckedKeys,
      checkable,
      treeData,
      getAllChildKeys,
      getAllParentKeys,
      findNode,
      onCheck,
    ],
  );

  const removeNode = useCallback((key: string, nodes: TreeNode[]): TreeNode[] => {
    return nodes.filter((node) => {
      if (node.key === key) {
        return false;
      }
      if (node.children) {
        node.children = removeNode(key, node.children);
      }
      return true;
    });
  }, []);

  const insertNode = useCallback(
    (targetNode: TreeNode, dragNode: TreeNode, position: number, nodes: TreeNode[]): TreeNode[] => {
      // 检查是否是根节点之间的排序
      const isRootLevel = nodes.some((node) => node.key === targetNode.key);

      if (isRootLevel) {
        const targetIndex = nodes.findIndex((node) => node.key === targetNode.key);
        if (targetIndex === -1) return nodes;

        const newNodes = [...nodes];
        const dragIndex = newNodes.findIndex((node) => node.key === dragNode.key);

        if (dragIndex !== -1) {
          newNodes.splice(dragIndex, 1);
        }

        if (position === -1) {
          newNodes.splice(targetIndex, 0, dragNode);
        } else {
          newNodes.splice(targetIndex + 1, 0, dragNode);
        }

        return newNodes;
      }

      // 处理子节点排序
      return nodes.map((node) => {
        if (node.children) {
          const children = [...node.children];
          const targetIndex = children.findIndex((child) => child.key === targetNode.key);
          const dragIndex = children.findIndex((child) => child.key === dragNode.key);

          // 如果目标节点在当前节点的子节点中
          if (targetIndex !== -1) {
            // 如果拖拽节点也在当前节点的子节点中
            if (dragIndex !== -1) {
              children.splice(dragIndex, 1);
            }

            if (position === -1) {
              children.splice(targetIndex, 0, dragNode);
            } else {
              children.splice(targetIndex + 1, 0, dragNode);
            }

            return { ...node, children };
          }

          // 如果拖拽节点在当前节点的子节点中，但目标节点不在
          if (dragIndex !== -1) {
            children.splice(dragIndex, 1);
            return { ...node, children };
          }

          // 递归处理子节点
          const updatedChildren = insertNode(targetNode, dragNode, position, node.children);
          if (updatedChildren !== node.children) {
            return { ...node, children: updatedChildren };
          }
        }

        return node;
      });
    },
    [],
  );

  const handleDragStart = useCallback(
    (e: React.DragEvent, node: TreeNode) => {
      if (!draggable || (allowDrag && !allowDrag(node))) return;
      dragNode.current = node;
      setDragOverNode(null);
      onDragStart?.(node, e);
    },
    [draggable, allowDrag, onDragStart],
  );

  const handleDragEnter = useCallback(
    (e: React.DragEvent, node: TreeNode) => {
      if (!draggable || !dragNode.current) return;
      onDragEnter?.(dragNode.current, node, e);
    },
    [draggable, onDragEnter],
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent, node: TreeNode) => {
      if (!draggable || !dragNode.current) return;
      onDragLeave?.(dragNode.current, node, e);
    },
    [draggable, onDragLeave],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, node: TreeNode) => {
      if (!draggable || !dragNode.current) return;

      e.preventDefault();
      e.stopPropagation();

      const dragNodeKey = dragNode.current.key;
      const dropNodeKey = node.key;

      // 不允许拖拽到自身或其子节点
      if (dragNodeKey === dropNodeKey) return;

      const isChild = (parentKey: string, childKey: string, nodes: TreeNode[]): boolean => {
        const node = findNode(parentKey, nodes);
        if (!node) return false;
        if (node.node.children) {
          return (
            node.node.children.some((child) => child.key === childKey) ||
            node.node.children.some((child) => isChild(child.key, childKey, nodes))
          );
        }
        return false;
      };

      if (isChild(dragNodeKey, dropNodeKey, treeData)) return;

      setDragOverNode(node);

      const rect = e.currentTarget.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
      const height = rect.height;
      const position = offsetY < height / 3 ? -1 : offsetY > (height * 2) / 3 ? 1 : 0;
      setDropPosition(position);

      onDragOver?.(dragNode.current, node, e);
    },
    [draggable, dragNode, treeData, findNode, onDragOver],
  );

  const handleDragEnd = useCallback(
    (e: React.DragEvent, node: TreeNode) => {
      if (!draggable) return;
      const dropType = dropPosition === -1 ? 'before' : dropPosition === 1 ? 'after' : 'inner';
      onDragEnd?.(node, dragOverNode, dropType, e);
      dragNode.current = null;
      setDragOverNode(null);
    },
    [draggable, dropPosition, dragOverNode, onDragEnd],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, node: TreeNode) => {
      if (!draggable || !dragNode.current) return;

      e.preventDefault();
      e.stopPropagation();

      const dropType = dropPosition === -1 ? 'before' : dropPosition === 1 ? 'after' : 'inner';

      if (allowDrop && !allowDrop(dragNode.current, node, dropType)) {
        return;
      }

      // 查找拖拽节点
      const dragNodeInfo = findNode(dragNode.current.key, treeData);
      if (!dragNodeInfo) return;

      // 从原位置移除节点
      const newTreeData = removeNode(dragNode.current.key, treeData);

      // 在新位置插入节点
      const updatedTreeData = insertNode(node, dragNode.current, dropPosition, newTreeData);

      // 如果插入失败，恢复原数据
      if (JSON.stringify(updatedTreeData) === JSON.stringify(newTreeData)) {
        setTreeData(treeData);
        return;
      }

      setTreeData(updatedTreeData);
      onDrop?.(dragNode.current, node, dropType, e);
    },
    [treeData, findNode, removeNode, insertNode, draggable, dropPosition, allowDrop, onDrop],
  );

  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    const {
      key,
      title,
      children,
      isLeaf,
      disabled,
      checkable: nodeCheckable,
      selectable: nodeSelectable,
      expanded,
      selected,
      checked,
      loading,
    } = node;

    const isExpanded = expandedKeys
      ? expandedKeys.includes(key)
      : internalExpandedKeys.includes(key);
    const isSelected = selectedKeys
      ? selectedKeys.includes(key)
      : internalSelectedKeys.includes(key);
    const isChecked = checkedKeys ? checkedKeys.includes(key) : internalCheckedKeys.includes(key);
    const isLoading = loadingKeys.includes(key);
    const isDragOver = dragOverNode?.key === key;

    const hasChildren = children && children.length > 0;
    const showExpandIcon = !isLeaf && (hasChildren || loadData);

    const nodeClasses = classNames('ice-tree-node', {
      'ice-tree-node-expanded': isExpanded,
      'ice-tree-node-selected': isSelected,
      'ice-tree-node-checked': isChecked,
      'ice-tree-node-disabled': disabled,
      'ice-tree-node-loading': isLoading,
      'ice-tree-node-drag-over': isDragOver,
      'ice-tree-node-drag-over-top': isDragOver && dropPosition === -1,
      'ice-tree-node-drag-over-bottom': isDragOver && dropPosition === 1,
    });

    const checkboxClasses = classNames('ice-tree-checkbox', {
      'ice-tree-checkbox-checked': isChecked,
      'ice-tree-checkbox-disabled': disabled,
    });

    const handleNodeClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      handleSelect(node);
    };

    const handleCheckboxClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      handleCheck(node);
    };

    return (
      <div
        key={key}
        className={nodeClasses}
        draggable={draggable && !disabled && (!allowDrag || allowDrag(node))}
        onDragStart={(e) => handleDragStart(e, node)}
        onDragEnd={(e) => handleDragEnd(e, node)}
        onDragEnter={(e) => handleDragEnter(e, node)}
        onDragLeave={(e) => handleDragLeave(e, node)}
        onDragOver={(e) => handleDragOver(e, node)}
        onDrop={(e) => handleDrop(e, node)}
      >
        <span className="ice-tree-node-indent">
          {showExpandIcon && (
            <span className="ice-tree-switcher" onClick={() => !disabled && handleExpand(node)}>
              <Icon type={isExpanded ? 'arrow-down' : 'arrow-right'} />
            </span>
          )}
        </span>
        {checkable && nodeCheckable !== false && (
          <span className={checkboxClasses} onClick={handleCheckboxClick}>
            {isChecked && <Icon type="check" />}
          </span>
        )}
        <span className="ice-tree-node-content" onClick={handleNodeClick}>
          {title}
        </span>
        {isLoading && <Icon type="loading" className="ice-tree-loading-icon" spin />}
        {isExpanded && hasChildren && (
          <div className="ice-tree-child-nodes">
            {children.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const filteredData = filterValue
    ? treeData.filter((node) => {
        const title = node.title?.toString().toLowerCase() || '';
        return title.includes(filterValue.toLowerCase());
      })
    : treeData;

  return (
    <div className={classNames('ice-tree', className)} style={style}>
      {filteredData.map((node) => renderTreeNode(node))}
    </div>
  );
};

export default Tree;

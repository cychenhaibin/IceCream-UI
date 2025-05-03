import React, { useState, useEffect, useRef } from 'react';
import './index.less';

export interface TreeNode {
  key: string;
  title: React.ReactNode;
  children?: TreeNode[];
  isLeaf?: boolean;
  checkable?: boolean;
  disabled?: boolean;
  [key: string]: any;
}

interface TreeProps {
  data: TreeNode[];
  checkable?: boolean;
  selectable?: boolean;
  multiple?: boolean;
  defaultExpandedKeys?: string[];
  defaultCheckedKeys?: string[];
  defaultSelectedKeys?: string[];
  loadData?: (node: TreeNode) => Promise<TreeNode[]>;
  onSelect?: (selectedKeys: string[], info: any) => void;
  onCheck?: (checkedKeys: string[], info: any) => void;
  filterTreeNode?: (node: TreeNode) => boolean;
  accordion?: boolean;
  draggable?: boolean;
}

const Tree: React.FC<TreeProps> = ({
  data,
  checkable = false,
  selectable = true,
  multiple = false,
  defaultExpandedKeys = [],
  defaultCheckedKeys = [],
  defaultSelectedKeys = [],
  loadData,
  onSelect,
  onCheck,
  filterTreeNode,
  accordion = false,
  draggable = false,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultExpandedKeys);
  const [checkedKeys, setCheckedKeys] = useState<string[]>(defaultCheckedKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [loadingKeys, setLoadingKeys] = useState<string[]>([]);
  const [treeData, setTreeData] = useState<TreeNode[]>(data);
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);

  useEffect(() => {
    setTreeData(data);
  }, [data]);

  // 展开/收起节点
  const handleExpand = async (node: TreeNode) => {
    if (expandedKeys.includes(node.key)) {
      setExpandedKeys(expandedKeys.filter((k) => k !== node.key));
    } else {
      // 懒加载
      if (loadData && !node.isLeaf && (!node.children || node.children.length === 0)) {
        setLoadingKeys((keys) => [...keys, node.key]);
        try {
          const children = await loadData(node);
          setTreeData(updateNode(treeData, node.key, { children }));
        } catch {
          // 懒加载失败，保持节点状态，允许重试
        } finally {
          setLoadingKeys((keys) => keys.filter((k) => k !== node.key));
        }
      }
      // 手风琴模式
      if (accordion) {
        setExpandedKeys([node.key]);
      } else {
        setExpandedKeys([...expandedKeys, node.key]);
      }
    }
  };

  // 选择节点
  const handleSelect = (node: TreeNode) => {
    if (!selectable || node.disabled) return;
    let newSelected: string[];
    if (multiple) {
      if (selectedKeys.includes(node.key)) {
        newSelected = selectedKeys.filter((k) => k !== node.key);
      } else {
        newSelected = [...selectedKeys, node.key];
      }
    } else {
      newSelected = [node.key];
    }
    setSelectedKeys(newSelected);
    onSelect && onSelect(newSelected, { node });
  };

  // 复选框
  const handleCheck = (node: TreeNode) => {
    if (node.disabled || node.checkable === false) return;
    let newChecked: string[];
    if (checkedKeys.includes(node.key)) {
      newChecked = checkedKeys.filter((k) => k !== node.key);
    } else {
      newChecked = [...checkedKeys, node.key];
    }
    setCheckedKeys(newChecked);
    onCheck && onCheck(newChecked, { node });
  };

  // 拖拽
  const handleDragStart = (e: React.DragEvent, node: TreeNode) => {
    e.dataTransfer.setData('dragKey', node.key);
  };
  const handleDragOver = (e: React.DragEvent, node: TreeNode) => {
    e.preventDefault();
    setDragOverKey(node.key);
  };
  const handleDrop = (e: React.DragEvent, node: TreeNode) => {
    e.preventDefault();
    const dragKey = e.dataTransfer.getData('dragKey');
    if (dragKey && dragKey !== node.key) {
      setTreeData(moveNode(treeData, dragKey, node.key));
    }
    setDragOverKey(null);
  };

  // 递归渲染树节点
  const renderTree = (nodes: TreeNode[]) => {
    return nodes.map((node) => {
      // 过滤
      if (filterTreeNode && !filterTreeNode(node)) return null;
      const expanded = expandedKeys.includes(node.key);
      const checked = checkedKeys.includes(node.key);
      const selected = selectedKeys.includes(node.key);
      const loading = loadingKeys.includes(node.key);
      const isLeaf = node.isLeaf || (node.children && node.children.length === 0);
      return (
        <div
          key={node.key}
          className={`ice-tree-node${expanded ? ' expanded' : ''}${selected ? ' selected' : ''}${
            checked ? ' checked' : ''
          }${node.disabled ? ' disabled' : ''}${dragOverKey === node.key ? ' drag-over' : ''}`}
          draggable={draggable && !node.disabled}
          onDragStart={draggable ? (e) => handleDragStart(e, node) : undefined}
          onDragOver={draggable ? (e) => handleDragOver(e, node) : undefined}
          onDrop={draggable ? (e) => handleDrop(e, node) : undefined}
        >
          <span
            className="ice-tree-switcher"
            onClick={() => !isLeaf && !loading && handleExpand(node)}
          >
            {loading ? (
              <span className="ice-tree-loading">⏳</span>
            ) : isLeaf ? null : (
              <span>{expanded ? '▼' : '▶'}</span>
            )}
          </span>
          {checkable && node.checkable !== false && (
            <input
              type="checkbox"
              checked={checked}
              disabled={node.disabled}
              onChange={() => handleCheck(node)}
            />
          )}
          <span
            className={`ice-tree-title${selectable && !node.disabled ? ' selectable' : ''}`}
            onClick={() => handleSelect(node)}
          >
            {node.title}
          </span>
          {expanded && node.children && node.children.length > 0 && (
            <div className="ice-tree-children">{renderTree(node.children)}</div>
          )}
        </div>
      );
    });
  };

  return <div className="ice-tree">{renderTree(treeData)}</div>;
};

// 工具函数：更新节点
function updateNode(tree: TreeNode[], key: string, patch: Partial<TreeNode>): TreeNode[] {
  return tree.map((node) => {
    if (node.key === key) return { ...node, ...patch };
    if (node.children) return { ...node, children: updateNode(node.children, key, patch) };
    return node;
  });
}
// 工具函数：拖拽移动节点
function moveNode(tree: TreeNode[], dragKey: string, dropKey: string): TreeNode[] {
  let dragNode: TreeNode | null = null;
  function removeNode(nodes: TreeNode[]): TreeNode[] {
    return nodes.filter((node) => {
      if (node.key === dragKey) {
        dragNode = node;
        return false;
      }
      if (node.children) node.children = removeNode(node.children);
      return true;
    });
  }
  const newTree = removeNode([...tree]);
  function insertNode(nodes: TreeNode[]): boolean {
    for (let node of nodes) {
      if (node.key === dropKey && dragNode) {
        node.children = node.children ? [...node.children, dragNode] : [dragNode];
        return true;
      }
      if (node.children && insertNode(node.children)) return true;
    }
    return false;
  }
  insertNode(newTree);
  return newTree;
}

export default Tree;

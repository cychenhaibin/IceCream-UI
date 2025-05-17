var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod,
  )
);
var __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// src/Data/Tree/index.tsx
var Tree_exports = {};
__export(Tree_exports, {
  default: () => Tree_default,
});
module.exports = __toCommonJS(Tree_exports);
var import_react = __toESM(require('react'));
var import_classnames = __toESM(require('classnames'));
var import_Icon = __toESM(require('../../General/Icon'));
var import_index = require('./index.less');
var Tree = ({
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
  const [internalExpandedKeys, setInternalExpandedKeys] = (0, import_react.useState)(
    defaultExpandedKeys,
  );
  const [internalSelectedKeys, setInternalSelectedKeys] = (0, import_react.useState)(
    defaultSelectedKeys,
  );
  const [internalCheckedKeys, setInternalCheckedKeys] = (0, import_react.useState)(
    defaultCheckedKeys,
  );
  const [loadingKeys, setLoadingKeys] = (0, import_react.useState)([]);
  const [dragOverNode, setDragOverNode] = (0, import_react.useState)(null);
  const [dropPosition, setDropPosition] = (0, import_react.useState)(0);
  const [treeData, setTreeData] = (0, import_react.useState)(data);
  const dragNode = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    setTreeData(data);
  }, [data]);
  const handleExpand = (0, import_react.useCallback)(
    (node) => {
      if (node.disabled) return;
      const key = node.key;
      const isExpanded = internalExpandedKeys.includes(key);
      let newExpandedKeys;
      if (accordion) {
        newExpandedKeys = isExpanded ? [] : [key];
      } else {
        newExpandedKeys = isExpanded
          ? internalExpandedKeys.filter((k) => k !== key)
          : [...internalExpandedKeys, key];
      }
      setInternalExpandedKeys(newExpandedKeys);
      onExpand == null ? void 0 : onExpand(newExpandedKeys, { node, expanded: !isExpanded });
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
  const handleSelect = (0, import_react.useCallback)(
    (node) => {
      if (!selectable || node.disabled) return;
      const key = node.key;
      const isSelected = internalSelectedKeys.includes(key);
      let newSelectedKeys;
      if (multiple) {
        newSelectedKeys = isSelected
          ? internalSelectedKeys.filter((k) => k !== key)
          : [...internalSelectedKeys, key];
      } else {
        newSelectedKeys = isSelected ? [] : [key];
      }
      setInternalSelectedKeys(newSelectedKeys);
      onSelect == null ? void 0 : onSelect(newSelectedKeys, { node, selected: !isSelected });
    },
    [internalSelectedKeys, multiple, selectable, onSelect],
  );
  const findNode = (0, import_react.useCallback)((key, nodes) => {
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
  }, []);
  const getAllChildKeys = (0, import_react.useCallback)((node) => {
    let keys = [];
    if (node.children) {
      node.children.forEach((child) => {
        keys.push(child.key);
        keys = keys.concat(getAllChildKeys(child));
      });
    }
    return keys;
  }, []);
  const getAllParentKeys = (0, import_react.useCallback)((key, nodes) => {
    const keys = [];
    const findParent = (targetKey, currentNodes, parentKey) => {
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
  const handleCheck = (0, import_react.useCallback)(
    (node) => {
      if (!checkable || node.disabled) return;
      const key = node.key;
      const isChecked = internalCheckedKeys.includes(key);
      let newCheckedKeys;
      const childKeys = getAllChildKeys(node);
      const parentKeys = getAllParentKeys(key, treeData);
      if (isChecked) {
        newCheckedKeys = internalCheckedKeys.filter(
          (k) => k !== key && !childKeys.includes(k) && !parentKeys.includes(k),
        );
      } else {
        newCheckedKeys = [...internalCheckedKeys, key, ...childKeys];
        parentKeys.forEach((parentKey) => {
          var _a;
          const parentNode = (_a = findNode(parentKey, treeData)) == null ? void 0 : _a.node;
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
      onCheck == null ? void 0 : onCheck(newCheckedKeys, { node, checked: !isChecked });
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
  const removeNode = (0, import_react.useCallback)((key, nodes) => {
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
  const insertNode = (0, import_react.useCallback)((targetNode, dragNode2, position, nodes) => {
    const isRootLevel = nodes.some((node) => node.key === targetNode.key);
    if (isRootLevel) {
      const targetIndex = nodes.findIndex((node) => node.key === targetNode.key);
      if (targetIndex === -1) return nodes;
      const newNodes = [...nodes];
      const dragIndex = newNodes.findIndex((node) => node.key === dragNode2.key);
      if (dragIndex !== -1) {
        newNodes.splice(dragIndex, 1);
      }
      if (position === -1) {
        newNodes.splice(targetIndex, 0, dragNode2);
      } else {
        newNodes.splice(targetIndex + 1, 0, dragNode2);
      }
      return newNodes;
    }
    return nodes.map((node) => {
      if (node.children) {
        const children = [...node.children];
        const targetIndex = children.findIndex((child) => child.key === targetNode.key);
        const dragIndex = children.findIndex((child) => child.key === dragNode2.key);
        if (targetIndex !== -1) {
          if (dragIndex !== -1) {
            children.splice(dragIndex, 1);
          }
          if (position === -1) {
            children.splice(targetIndex, 0, dragNode2);
          } else {
            children.splice(targetIndex + 1, 0, dragNode2);
          }
          return { ...node, children };
        }
        if (dragIndex !== -1) {
          children.splice(dragIndex, 1);
          return { ...node, children };
        }
        const updatedChildren = insertNode(targetNode, dragNode2, position, node.children);
        if (updatedChildren !== node.children) {
          return { ...node, children: updatedChildren };
        }
      }
      return node;
    });
  }, []);
  const handleDragStart = (0, import_react.useCallback)(
    (e, node) => {
      if (!draggable || (allowDrag && !allowDrag(node))) return;
      dragNode.current = node;
      setDragOverNode(null);
      onDragStart == null ? void 0 : onDragStart(node, e);
    },
    [draggable, allowDrag, onDragStart],
  );
  const handleDragEnter = (0, import_react.useCallback)(
    (e, node) => {
      if (!draggable || !dragNode.current) return;
      onDragEnter == null ? void 0 : onDragEnter(dragNode.current, node, e);
    },
    [draggable, onDragEnter],
  );
  const handleDragLeave = (0, import_react.useCallback)(
    (e, node) => {
      if (!draggable || !dragNode.current) return;
      onDragLeave == null ? void 0 : onDragLeave(dragNode.current, node, e);
    },
    [draggable, onDragLeave],
  );
  const handleDragOver = (0, import_react.useCallback)(
    (e, node) => {
      if (!draggable || !dragNode.current) return;
      e.preventDefault();
      e.stopPropagation();
      const dragNodeKey = dragNode.current.key;
      const dropNodeKey = node.key;
      if (dragNodeKey === dropNodeKey) return;
      const isChild = (parentKey, childKey, nodes) => {
        const node2 = findNode(parentKey, nodes);
        if (!node2) return false;
        if (node2.node.children) {
          return (
            node2.node.children.some((child) => child.key === childKey) ||
            node2.node.children.some((child) => isChild(child.key, childKey, nodes))
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
      onDragOver == null ? void 0 : onDragOver(dragNode.current, node, e);
    },
    [draggable, dragNode, treeData, findNode, onDragOver],
  );
  const handleDragEnd = (0, import_react.useCallback)(
    (e, node) => {
      if (!draggable) return;
      const dropType = dropPosition === -1 ? 'before' : dropPosition === 1 ? 'after' : 'inner';
      onDragEnd == null ? void 0 : onDragEnd(node, dragOverNode, dropType, e);
      dragNode.current = null;
      setDragOverNode(null);
    },
    [draggable, dropPosition, dragOverNode, onDragEnd],
  );
  const handleDrop = (0, import_react.useCallback)(
    (e, node) => {
      if (!draggable || !dragNode.current) return;
      e.preventDefault();
      e.stopPropagation();
      const dropType = dropPosition === -1 ? 'before' : dropPosition === 1 ? 'after' : 'inner';
      if (allowDrop && !allowDrop(dragNode.current, node, dropType)) {
        return;
      }
      const dragNodeInfo = findNode(dragNode.current.key, treeData);
      if (!dragNodeInfo) return;
      const newTreeData = removeNode(dragNode.current.key, treeData);
      const updatedTreeData = insertNode(node, dragNode.current, dropPosition, newTreeData);
      if (JSON.stringify(updatedTreeData) === JSON.stringify(newTreeData)) {
        setTreeData(treeData);
        return;
      }
      setTreeData(updatedTreeData);
      onDrop == null ? void 0 : onDrop(dragNode.current, node, dropType, e);
    },
    [treeData, findNode, removeNode, insertNode, draggable, dropPosition, allowDrop, onDrop],
  );
  const renderTreeNode = (node, level = 0) => {
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
    const isDragOver = (dragOverNode == null ? void 0 : dragOverNode.key) === key;
    const hasChildren = children && children.length > 0;
    const showExpandIcon = !isLeaf && (hasChildren || loadData);
    const nodeClasses = (0, import_classnames.default)('ice-tree-node', {
      'ice-tree-node-expanded': isExpanded,
      'ice-tree-node-selected': isSelected,
      'ice-tree-node-checked': isChecked,
      'ice-tree-node-disabled': disabled,
      'ice-tree-node-loading': isLoading,
      'ice-tree-node-drag-over': isDragOver,
      'ice-tree-node-drag-over-top': isDragOver && dropPosition === -1,
      'ice-tree-node-drag-over-bottom': isDragOver && dropPosition === 1,
    });
    const checkboxClasses = (0, import_classnames.default)('ice-tree-checkbox', {
      'ice-tree-checkbox-checked': isChecked,
      'ice-tree-checkbox-disabled': disabled,
    });
    const handleNodeClick = (e) => {
      e.stopPropagation();
      if (disabled) return;
      handleSelect(node);
    };
    const handleCheckboxClick = (e) => {
      e.stopPropagation();
      if (disabled) return;
      handleCheck(node);
    };
    return /* @__PURE__ */ import_react.default.createElement(
      'div',
      {
        key,
        className: nodeClasses,
        draggable: draggable && !disabled && (!allowDrag || allowDrag(node)),
        onDragStart: (e) => handleDragStart(e, node),
        onDragEnd: (e) => handleDragEnd(e, node),
        onDragEnter: (e) => handleDragEnter(e, node),
        onDragLeave: (e) => handleDragLeave(e, node),
        onDragOver: (e) => handleDragOver(e, node),
        onDrop: (e) => handleDrop(e, node),
      },
      /* @__PURE__ */ import_react.default.createElement(
        'span',
        { className: 'ice-tree-node-indent' },
        showExpandIcon &&
          /* @__PURE__ */ import_react.default.createElement(
            'span',
            { className: 'ice-tree-switcher', onClick: () => !disabled && handleExpand(node) },
            /* @__PURE__ */ import_react.default.createElement(import_Icon.default, {
              name: isExpanded ? 'icon_double_screen' : 'icon_output',
              size: 16,
            }),
          ),
      ),
      checkable &&
        nodeCheckable !== false &&
        /* @__PURE__ */ import_react.default.createElement(
          'span',
          { className: checkboxClasses, onClick: handleCheckboxClick },
          isChecked &&
            /* @__PURE__ */ import_react.default.createElement(import_Icon.default, {
              name: 'icon_check',
              size: 16,
            }),
        ),
      /* @__PURE__ */ import_react.default.createElement(
        'span',
        { className: 'ice-tree-node-content', onClick: handleNodeClick },
        title,
      ),
      isLoading &&
        /* @__PURE__ */ import_react.default.createElement(import_Icon.default, {
          name: 'icon_refresh',
          size: 14,
          className: 'ice-tree-loading-icon',
          spin: true,
        }),
      isExpanded &&
        hasChildren &&
        /* @__PURE__ */ import_react.default.createElement(
          'div',
          { className: 'ice-tree-child-nodes' },
          children.map((child) => renderTreeNode(child, level + 1)),
        ),
    );
  };
  const filteredData = filterValue
    ? treeData.filter((node) => {
        var _a;
        const title = ((_a = node.title) == null ? void 0 : _a.toString().toLowerCase()) || '';
        return title.includes(filterValue.toLowerCase());
      })
    : treeData;
  return /* @__PURE__ */ import_react.default.createElement(
    'div',
    { className: (0, import_classnames.default)('ice-tree', className), style },
    filteredData.map((node) => renderTreeNode(node)),
  );
};
var Tree_default = Tree;

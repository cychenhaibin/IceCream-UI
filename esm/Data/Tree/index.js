function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (_e) { function e(_x) { return _e.apply(this, arguments); } e.toString = function () { return _e.toString(); }; return e; }(function (e) { throw e; }), f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function (_e2) { function e(_x2) { return _e2.apply(this, arguments); } e.toString = function () { return _e2.toString(); }; return e; }(function (e) { didErr = true; err = e; }), f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useState, useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames';
import Icon from "../../General/Icon";
import "./index.less";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Tree = function Tree(_ref) {
  var data = _ref.data,
    _ref$defaultExpandedK = _ref.defaultExpandedKeys,
    defaultExpandedKeys = _ref$defaultExpandedK === void 0 ? [] : _ref$defaultExpandedK,
    _ref$defaultSelectedK = _ref.defaultSelectedKeys,
    defaultSelectedKeys = _ref$defaultSelectedK === void 0 ? [] : _ref$defaultSelectedK,
    _ref$defaultCheckedKe = _ref.defaultCheckedKeys,
    defaultCheckedKeys = _ref$defaultCheckedKe === void 0 ? [] : _ref$defaultCheckedKe,
    expandedKeys = _ref.expandedKeys,
    selectedKeys = _ref.selectedKeys,
    checkedKeys = _ref.checkedKeys,
    _ref$checkable = _ref.checkable,
    checkable = _ref$checkable === void 0 ? false : _ref$checkable,
    _ref$selectable = _ref.selectable,
    selectable = _ref$selectable === void 0 ? true : _ref$selectable,
    _ref$multiple = _ref.multiple,
    multiple = _ref$multiple === void 0 ? false : _ref$multiple,
    _ref$accordion = _ref.accordion,
    accordion = _ref$accordion === void 0 ? false : _ref$accordion,
    _ref$draggable = _ref.draggable,
    draggable = _ref$draggable === void 0 ? false : _ref$draggable,
    _ref$showLine = _ref.showLine,
    showLine = _ref$showLine === void 0 ? false : _ref$showLine,
    loadData = _ref.loadData,
    onExpand = _ref.onExpand,
    onSelect = _ref.onSelect,
    onCheck = _ref.onCheck,
    onDragStart = _ref.onDragStart,
    onDragEnter = _ref.onDragEnter,
    onDragLeave = _ref.onDragLeave,
    onDragOver = _ref.onDragOver,
    onDragEnd = _ref.onDragEnd,
    onDrop = _ref.onDrop,
    allowDrop = _ref.allowDrop,
    allowDrag = _ref.allowDrag,
    filterValue = _ref.filterValue,
    className = _ref.className,
    style = _ref.style;
  var _useState = useState(defaultExpandedKeys),
    _useState2 = _slicedToArray(_useState, 2),
    internalExpandedKeys = _useState2[0],
    setInternalExpandedKeys = _useState2[1];
  var _useState3 = useState(defaultSelectedKeys),
    _useState4 = _slicedToArray(_useState3, 2),
    internalSelectedKeys = _useState4[0],
    setInternalSelectedKeys = _useState4[1];
  var _useState5 = useState(defaultCheckedKeys),
    _useState6 = _slicedToArray(_useState5, 2),
    internalCheckedKeys = _useState6[0],
    setInternalCheckedKeys = _useState6[1];
  var _useState7 = useState([]),
    _useState8 = _slicedToArray(_useState7, 2),
    loadingKeys = _useState8[0],
    setLoadingKeys = _useState8[1];
  var _useState9 = useState(null),
    _useState10 = _slicedToArray(_useState9, 2),
    dragOverNode = _useState10[0],
    setDragOverNode = _useState10[1];
  var _useState11 = useState(0),
    _useState12 = _slicedToArray(_useState11, 2),
    dropPosition = _useState12[0],
    setDropPosition = _useState12[1];
  var _useState13 = useState(data),
    _useState14 = _slicedToArray(_useState13, 2),
    treeData = _useState14[0],
    setTreeData = _useState14[1];
  var dragNode = useRef(null);
  useEffect(function () {
    setTreeData(data);
  }, [data]);
  var handleExpand = useCallback(function (node) {
    if (node.disabled) return;
    var key = node.key;
    var isExpanded = internalExpandedKeys.includes(key);
    var newExpandedKeys;
    if (accordion) {
      newExpandedKeys = isExpanded ? [] : [key];
    } else {
      newExpandedKeys = isExpanded ? internalExpandedKeys.filter(function (k) {
        return k !== key;
      }) : [].concat(_toConsumableArray(internalExpandedKeys), [key]);
    }
    setInternalExpandedKeys(newExpandedKeys);
    onExpand === null || onExpand === void 0 || onExpand(newExpandedKeys, {
      node: node,
      expanded: !isExpanded
    });
    if (loadData && !node.children && !node.isLeaf) {
      setLoadingKeys(function (prev) {
        return [].concat(_toConsumableArray(prev), [key]);
      });
      loadData(node).then(function () {
        setLoadingKeys(function (prev) {
          return prev.filter(function (k) {
            return k !== key;
          });
        });
      }).catch(function () {
        setLoadingKeys(function (prev) {
          return prev.filter(function (k) {
            return k !== key;
          });
        });
      });
    }
  }, [internalExpandedKeys, accordion, loadData, onExpand]);
  var handleSelect = useCallback(function (node) {
    if (!selectable || node.disabled) return;
    var key = node.key;
    var isSelected = internalSelectedKeys.includes(key);
    var newSelectedKeys;
    if (multiple) {
      newSelectedKeys = isSelected ? internalSelectedKeys.filter(function (k) {
        return k !== key;
      }) : [].concat(_toConsumableArray(internalSelectedKeys), [key]);
    } else {
      newSelectedKeys = isSelected ? [] : [key];
    }
    setInternalSelectedKeys(newSelectedKeys);
    onSelect === null || onSelect === void 0 || onSelect(newSelectedKeys, {
      node: node,
      selected: !isSelected
    });
  }, [internalSelectedKeys, multiple, selectable, onSelect]);
  var findNode = useCallback(function (key, nodes) {
    for (var i = 0; i < nodes.length; i++) {
      var _node = nodes[i];
      if (_node.key === key) {
        return {
          node: _node,
          parent: null,
          index: i
        };
      }
      if (_node.children) {
        var result = findNode(key, _node.children);
        if (result) {
          return _objectSpread(_objectSpread({}, result), {}, {
            parent: _node
          });
        }
      }
    }
    return null;
  }, []);
  var getAllChildKeys = useCallback(function (node) {
    var keys = [];
    if (node.children) {
      node.children.forEach(function (child) {
        keys.push(child.key);
        keys = keys.concat(getAllChildKeys(child));
      });
    }
    return keys;
  }, []);
  var getAllParentKeys = useCallback(function (key, nodes) {
    var keys = [];
    var findParent = function findParent(targetKey, currentNodes, parentKey) {
      var _iterator = _createForOfIteratorHelper(currentNodes),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _node2 = _step.value;
          if (_node2.key === targetKey) {
            if (parentKey) keys.push(parentKey);
            return true;
          }
          if (_node2.children) {
            if (findParent(targetKey, _node2.children, _node2.key)) {
              if (parentKey) keys.push(parentKey);
              return true;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return false;
    };
    findParent(key, nodes);
    return keys;
  }, []);
  var handleCheck = useCallback(function (node) {
    if (!checkable || node.disabled) return;
    var key = node.key;
    var isChecked = internalCheckedKeys.includes(key);
    var newCheckedKeys;

    // 获取所有子节点的key
    var childKeys = getAllChildKeys(node);
    // 获取所有父节点的key
    var parentKeys = getAllParentKeys(key, treeData);
    if (isChecked) {
      // 取消选中时，移除当前节点、所有子节点和父节点
      newCheckedKeys = internalCheckedKeys.filter(function (k) {
        return k !== key && !childKeys.includes(k) && !parentKeys.includes(k);
      });
    } else {
      // 选中时，添加当前节点和所有子节点
      newCheckedKeys = [].concat(_toConsumableArray(internalCheckedKeys), [key], _toConsumableArray(childKeys));

      // 检查是否需要选中父节点
      parentKeys.forEach(function (parentKey) {
        var _findNode;
        var parentNode = (_findNode = findNode(parentKey, treeData)) === null || _findNode === void 0 ? void 0 : _findNode.node;
        if (parentNode) {
          var allSiblings = getAllChildKeys(parentNode);
          var allSiblingsChecked = allSiblings.every(function (siblingKey) {
            return newCheckedKeys.includes(siblingKey);
          });
          if (allSiblingsChecked) {
            newCheckedKeys.push(parentKey);
          }
        }
      });
    }
    setInternalCheckedKeys(newCheckedKeys);
    onCheck === null || onCheck === void 0 || onCheck(newCheckedKeys, {
      node: node,
      checked: !isChecked
    });
  }, [internalCheckedKeys, checkable, treeData, getAllChildKeys, getAllParentKeys, findNode, onCheck]);
  var removeNode = useCallback(function (key, nodes) {
    return nodes.filter(function (node) {
      if (node.key === key) {
        return false;
      }
      if (node.children) {
        node.children = removeNode(key, node.children);
      }
      return true;
    });
  }, []);
  var insertNode = useCallback(function (targetNode, dragNode, position, nodes) {
    // 检查是否是根节点之间的排序
    var isRootLevel = nodes.some(function (node) {
      return node.key === targetNode.key;
    });
    if (isRootLevel) {
      var targetIndex = nodes.findIndex(function (node) {
        return node.key === targetNode.key;
      });
      if (targetIndex === -1) return nodes;
      var newNodes = _toConsumableArray(nodes);
      var dragIndex = newNodes.findIndex(function (node) {
        return node.key === dragNode.key;
      });
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
    return nodes.map(function (node) {
      if (node.children) {
        var children = _toConsumableArray(node.children);
        var _targetIndex = children.findIndex(function (child) {
          return child.key === targetNode.key;
        });
        var _dragIndex = children.findIndex(function (child) {
          return child.key === dragNode.key;
        });

        // 如果目标节点在当前节点的子节点中
        if (_targetIndex !== -1) {
          // 如果拖拽节点也在当前节点的子节点中
          if (_dragIndex !== -1) {
            children.splice(_dragIndex, 1);
          }
          if (position === -1) {
            children.splice(_targetIndex, 0, dragNode);
          } else {
            children.splice(_targetIndex + 1, 0, dragNode);
          }
          return _objectSpread(_objectSpread({}, node), {}, {
            children: children
          });
        }

        // 如果拖拽节点在当前节点的子节点中，但目标节点不在
        if (_dragIndex !== -1) {
          children.splice(_dragIndex, 1);
          return _objectSpread(_objectSpread({}, node), {}, {
            children: children
          });
        }

        // 递归处理子节点
        var updatedChildren = insertNode(targetNode, dragNode, position, node.children);
        if (updatedChildren !== node.children) {
          return _objectSpread(_objectSpread({}, node), {}, {
            children: updatedChildren
          });
        }
      }
      return node;
    });
  }, []);
  var handleDragStart = useCallback(function (e, node) {
    if (!draggable || allowDrag && !allowDrag(node)) return;
    dragNode.current = node;
    setDragOverNode(null);
    onDragStart === null || onDragStart === void 0 || onDragStart(node, e);
  }, [draggable, allowDrag, onDragStart]);
  var handleDragEnter = useCallback(function (e, node) {
    if (!draggable || !dragNode.current) return;
    onDragEnter === null || onDragEnter === void 0 || onDragEnter(dragNode.current, node, e);
  }, [draggable, onDragEnter]);
  var handleDragLeave = useCallback(function (e, node) {
    if (!draggable || !dragNode.current) return;
    onDragLeave === null || onDragLeave === void 0 || onDragLeave(dragNode.current, node, e);
  }, [draggable, onDragLeave]);
  var handleDragOver = useCallback(function (e, node) {
    if (!draggable || !dragNode.current) return;
    e.preventDefault();
    e.stopPropagation();
    var dragNodeKey = dragNode.current.key;
    var dropNodeKey = node.key;

    // 不允许拖拽到自身或其子节点
    if (dragNodeKey === dropNodeKey) return;
    var isChild = function isChild(parentKey, childKey, nodes) {
      var node = findNode(parentKey, nodes);
      if (!node) return false;
      if (node.node.children) {
        return node.node.children.some(function (child) {
          return child.key === childKey;
        }) || node.node.children.some(function (child) {
          return isChild(child.key, childKey, nodes);
        });
      }
      return false;
    };
    if (isChild(dragNodeKey, dropNodeKey, treeData)) return;
    setDragOverNode(node);
    var rect = e.currentTarget.getBoundingClientRect();
    var offsetY = e.clientY - rect.top;
    var height = rect.height;
    var position = offsetY < height / 3 ? -1 : offsetY > height * 2 / 3 ? 1 : 0;
    setDropPosition(position);
    onDragOver === null || onDragOver === void 0 || onDragOver(dragNode.current, node, e);
  }, [draggable, dragNode, treeData, findNode, onDragOver]);
  var handleDragEnd = useCallback(function (e, node) {
    if (!draggable) return;
    var dropType = dropPosition === -1 ? 'before' : dropPosition === 1 ? 'after' : 'inner';
    onDragEnd === null || onDragEnd === void 0 || onDragEnd(node, dragOverNode, dropType, e);
    dragNode.current = null;
    setDragOverNode(null);
  }, [draggable, dropPosition, dragOverNode, onDragEnd]);
  var handleDrop = useCallback(function (e, node) {
    if (!draggable || !dragNode.current) return;
    e.preventDefault();
    e.stopPropagation();
    var dropType = dropPosition === -1 ? 'before' : dropPosition === 1 ? 'after' : 'inner';
    if (allowDrop && !allowDrop(dragNode.current, node, dropType)) {
      return;
    }

    // 查找拖拽节点
    var dragNodeInfo = findNode(dragNode.current.key, treeData);
    if (!dragNodeInfo) return;

    // 从原位置移除节点
    var newTreeData = removeNode(dragNode.current.key, treeData);

    // 在新位置插入节点
    var updatedTreeData = insertNode(node, dragNode.current, dropPosition, newTreeData);

    // 如果插入失败，恢复原数据
    if (JSON.stringify(updatedTreeData) === JSON.stringify(newTreeData)) {
      setTreeData(treeData);
      return;
    }
    setTreeData(updatedTreeData);
    onDrop === null || onDrop === void 0 || onDrop(dragNode.current, node, dropType, e);
  }, [treeData, findNode, removeNode, insertNode, draggable, dropPosition, allowDrop, onDrop]);
  var renderTreeNode = function renderTreeNode(node) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var key = node.key,
      title = node.title,
      children = node.children,
      isLeaf = node.isLeaf,
      disabled = node.disabled,
      nodeCheckable = node.checkable,
      nodeSelectable = node.selectable,
      expanded = node.expanded,
      selected = node.selected,
      checked = node.checked,
      loading = node.loading;
    var isExpanded = expandedKeys ? expandedKeys.includes(key) : internalExpandedKeys.includes(key);
    var isSelected = selectedKeys ? selectedKeys.includes(key) : internalSelectedKeys.includes(key);
    var isChecked = checkedKeys ? checkedKeys.includes(key) : internalCheckedKeys.includes(key);
    var isLoading = loadingKeys.includes(key);
    var isDragOver = (dragOverNode === null || dragOverNode === void 0 ? void 0 : dragOverNode.key) === key;
    var hasChildren = children && children.length > 0;
    var showExpandIcon = !isLeaf && (hasChildren || loadData);
    var nodeClasses = classNames('ice-tree-node', {
      'ice-tree-node-expanded': isExpanded,
      'ice-tree-node-selected': isSelected,
      'ice-tree-node-checked': isChecked,
      'ice-tree-node-disabled': disabled,
      'ice-tree-node-loading': isLoading,
      'ice-tree-node-drag-over': isDragOver,
      'ice-tree-node-drag-over-top': isDragOver && dropPosition === -1,
      'ice-tree-node-drag-over-bottom': isDragOver && dropPosition === 1
    });
    var checkboxClasses = classNames('ice-tree-checkbox', {
      'ice-tree-checkbox-checked': isChecked,
      'ice-tree-checkbox-disabled': disabled
    });
    var handleNodeClick = function handleNodeClick(e) {
      e.stopPropagation();
      if (disabled) return;
      handleSelect(node);
    };
    var handleCheckboxClick = function handleCheckboxClick(e) {
      e.stopPropagation();
      if (disabled) return;
      handleCheck(node);
    };
    return /*#__PURE__*/_jsxs("div", {
      className: nodeClasses,
      draggable: draggable && !disabled && (!allowDrag || allowDrag(node)),
      onDragStart: function onDragStart(e) {
        return handleDragStart(e, node);
      },
      onDragEnd: function onDragEnd(e) {
        return handleDragEnd(e, node);
      },
      onDragEnter: function onDragEnter(e) {
        return handleDragEnter(e, node);
      },
      onDragLeave: function onDragLeave(e) {
        return handleDragLeave(e, node);
      },
      onDragOver: function onDragOver(e) {
        return handleDragOver(e, node);
      },
      onDrop: function onDrop(e) {
        return handleDrop(e, node);
      },
      children: [/*#__PURE__*/_jsx("span", {
        className: "ice-tree-node-indent",
        children: showExpandIcon && /*#__PURE__*/_jsx("span", {
          className: "ice-tree-switcher",
          onClick: function onClick() {
            return !disabled && handleExpand(node);
          },
          children: /*#__PURE__*/_jsx(Icon, {
            name: isExpanded ? 'icon_double_screen' : 'icon_output',
            size: 16
          })
        })
      }), checkable && nodeCheckable !== false && /*#__PURE__*/_jsx("span", {
        className: checkboxClasses,
        onClick: handleCheckboxClick,
        children: isChecked && /*#__PURE__*/_jsx(Icon, {
          name: "icon_check",
          size: 16
        })
      }), /*#__PURE__*/_jsx("span", {
        className: "ice-tree-node-content",
        onClick: handleNodeClick,
        children: title
      }), isLoading && /*#__PURE__*/_jsx(Icon, {
        name: "icon_refresh",
        size: 14,
        className: "ice-tree-loading-icon",
        spin: true
      }), isExpanded && hasChildren && /*#__PURE__*/_jsx("div", {
        className: "ice-tree-child-nodes",
        children: children.map(function (child) {
          return renderTreeNode(child, level + 1);
        })
      })]
    }, key);
  };
  var filteredData = filterValue ? treeData.filter(function (node) {
    var _node$title;
    var title = ((_node$title = node.title) === null || _node$title === void 0 ? void 0 : _node$title.toString().toLowerCase()) || '';
    return title.includes(filterValue.toLowerCase());
  }) : treeData;
  return /*#__PURE__*/_jsx("div", {
    className: classNames('ice-tree', className),
    style: style,
    children: filteredData.map(function (node) {
      return renderTreeNode(node);
    })
  });
};
export default Tree;
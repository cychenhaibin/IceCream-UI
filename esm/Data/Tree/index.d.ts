import React from 'react';
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
    onExpand?: (expandedKeys: string[], info: {
        node: TreeNode;
        expanded: boolean;
    }) => void;
    onSelect?: (selectedKeys: string[], info: {
        node: TreeNode;
        selected: boolean;
    }) => void;
    onCheck?: (checkedKeys: string[], info: {
        node: TreeNode;
        checked: boolean;
    }) => void;
    onDragStart?: (node: TreeNode, e: React.DragEvent) => void;
    onDragEnter?: (dragNode: TreeNode, dropNode: TreeNode, e: React.DragEvent) => void;
    onDragLeave?: (dragNode: TreeNode, dropNode: TreeNode, e: React.DragEvent) => void;
    onDragOver?: (dragNode: TreeNode, dropNode: TreeNode, e: React.DragEvent) => void;
    onDragEnd?: (dragNode: TreeNode, dropNode: TreeNode | null, dropType: 'before' | 'after' | 'inner', e: React.DragEvent) => void;
    onDrop?: (dragNode: TreeNode, dropNode: TreeNode, dropType: 'before' | 'after' | 'inner', e: React.DragEvent) => void;
    allowDrop?: (dragNode: TreeNode, dropNode: TreeNode, dropType: 'before' | 'after' | 'inner') => boolean;
    allowDrag?: (node: TreeNode) => boolean;
    filterValue?: string;
    className?: string;
    style?: React.CSSProperties;
}
declare const Tree: React.FC<TreeProps>;
export default Tree;

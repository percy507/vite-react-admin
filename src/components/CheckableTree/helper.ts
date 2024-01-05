function findNodeById(tree: any[], id: React.Key) {
  for (const node of tree) {
    if (node.id === id) return node;
    if (node.children) {
      const foundInChildren = findNodeById(node.children, id);
      if (foundInChildren) return foundInChildren;
    }
  }
  return null;
}

/** 根据传入的树状数据以及id集合，返回全选中、半选中、未选中的id集合 */
export function getNodeSelectionStatus(tree: any[], selectedIds: React.Key[]) {
  const isNodeSelected = (node) => selectedIds.includes(node.id);

  function isNodeFullySelected(node) {
    if (!node.children) return isNodeSelected(node);
    const allChildrenSelected = node.children.every(isNodeFullySelected);
    return allChildrenSelected && isNodeSelected(node);
  }

  function isNodePartiallySelected(node) {
    if (!node.children) return false;
    const someChildrenSelected = node.children.some(isNodeSelected);
    return someChildrenSelected && !isNodeFullySelected(node);
  }

  const fullIds: React.Key[] = [],
    partialIds: React.Key[] = [],
    noneIds: React.Key[] = [];

  for (const id of selectedIds) {
    const node = findNodeById(tree, id);
    if (node) {
      if (isNodeFullySelected(node)) fullIds.push(id);
      else if (isNodePartiallySelected(node)) partialIds.push(id);
      else noneIds.push(id);
    }
  }

  return { fullIds, partialIds, noneIds };
}

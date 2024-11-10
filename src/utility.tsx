import { RawNodeDatum } from "react-d3-tree";

export function bfs(
  id: string,
  tree: RawNodeDatum | RawNodeDatum[],
  node: RawNodeDatum
): RawNodeDatum | RawNodeDatum[] {
  const queue: RawNodeDatum[] = [];

  queue.push(tree as RawNodeDatum);

  while (queue.length > 0) {
    const currNode = queue.shift();

    if (currNode && currNode.attributes?.id === id) {
      if (currNode.children?.length === 2) {
        if (currNode.children[0].name === "Null") {
          currNode.children[0] = node;
        } else if (currNode.children[1].name === "Null") {
          currNode.children[1] = node;
        } else {
          console.warn(
            "Cannot add more than two children to a binary tree node."
          );
        }

        return { ...tree };
      }

      currNode.children?.push(node);

      if (currNode.children?.length === 1) {
        currNode.children.push({
          name: "Null",
          attributes: {
            id: "",
          },
        });
      }

      return { ...tree };
    }

    while (currNode?.children && currNode?.children?.length < 2) {
      currNode?.children?.push({
        name: "Null",
        attributes: {
          id: "",
        },
      });
    }

    currNode?.children?.forEach((child) => {
      queue.push(child);
    });
  }
  return { ...tree };
}

export function updateTree(
  tree: RawNodeDatum | RawNodeDatum[],
  selectedNode: RawNodeDatum,
  value: string
): RawNodeDatum | RawNodeDatum[] {
  const queue: RawNodeDatum[] = [];

  queue.push(tree as RawNodeDatum);

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (
      currentNode &&
      currentNode?.attributes?.id === selectedNode.attributes?.id
    ) {
      currentNode.name = value;
      return { ...tree };
    }

    currentNode?.children?.forEach((node) => {
      queue.push(node);
    });
  }

  return { ...tree };
}

import dagre from "dagre";
import type { WolfNode, WolfEdge } from "./types";

export function autoLayout(
  nodes: WolfNode[],
  edges: WolfEdge[],
  direction: "TB" | "LR" = "TB"
): WolfNode[] {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, nodesep: 80, ranksep: 150, edgesep: 50 });

  nodes.forEach((node) => {
    const width = node.measured?.width ?? 180;
    const height = node.measured?.height ?? 60;
    g.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  return nodes.map((node) => {
    const pos = g.node(node.id);
    const width = node.measured?.width ?? 180;
    const height = node.measured?.height ?? 60;
    return {
      ...node,
      position: {
        x: Math.round((pos.x - width / 2) / 20) * 20,
        y: Math.round((pos.y - height / 2) / 20) * 20,
      },
    };
  });
}

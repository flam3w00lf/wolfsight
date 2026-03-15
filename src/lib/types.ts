import type { Node, Edge } from "@xyflow/react";

export type ArrowType =
  | "solid"
  | "dashed"
  | "double"
  | "red"
  | "purple";

export type LayerId =
  | "surface"
  | "gates"
  | "pack"
  | "burrow"
  | "wild";

export type WolfNodeType =
  | "rectangle"
  | "roundedRectangle"
  | "cylinder"
  | "hexagon"
  | "cloud"
  | "person"
  | "diamond"
  | "systemBoundary";

export interface WolfNodeData {
  label: string;
  description: string;
  layer: LayerId;
  customColor?: string;
  wolfNodeType: WolfNodeType;
  [key: string]: unknown;
}

export interface WolfEdgeData {
  arrowType: ArrowType;
  [key: string]: unknown;
}

export type WolfNode = Node<WolfNodeData>;
export type WolfEdge = Edge<WolfEdgeData>;

export interface Layer {
  id: LayerId;
  name: string;
  subtitle: string;
  color: string;
  yStart: number;
  height: number;
}

export interface Diagram {
  title: string;
  description: string;
  nodes: WolfNode[];
  edges: WolfEdge[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  diagram: Diagram;
}

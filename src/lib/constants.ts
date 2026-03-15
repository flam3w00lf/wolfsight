import type { Layer, LayerId, WolfNodeType, EdgeDirection, EdgeRouting } from "./types";

export const COLORS = {
  alpha: "#F97316",
  den: "#1C1917",
  bone: "#FAF5F0",
  ironclad: "#6B7280",
  prey: "#F59E0B",
  fang: "#DC2626",
  moss: "#16A34A",
  howl: "#7C3AED",
  frost: "#3B82F6",
  mist: "#E5E7EB",
  bg: "#0a0a0f",
} as const;

export const LAYERS: Layer[] = [
  { id: "surface", name: "THE SURFACE", subtitle: "Users, browsers, mobile apps", color: COLORS.frost, yStart: 0, height: 200 },
  { id: "gates", name: "THE GATES", subtitle: "API gateways, load balancers, auth", color: COLORS.alpha, yStart: 200, height: 200 },
  { id: "pack", name: "THE PACK", subtitle: "Core services, business logic", color: COLORS.alpha, yStart: 400, height: 200 },
  { id: "burrow", name: "THE BURROW", subtitle: "Databases, caches, queues", color: COLORS.moss, yStart: 600, height: 200 },
  { id: "wild", name: "THE WILD", subtitle: "External APIs, third-party services", color: COLORS.prey, yStart: 800, height: 200 },
];

export const NODE_PALETTE: { type: WolfNodeType; label: string; color: string; description: string }[] = [
  { type: "rectangle", label: "Service", color: COLORS.alpha, description: "Service / Application" },
  { type: "roundedRectangle", label: "API Gateway", color: COLORS.alpha, description: "API / Gateway" },
  { type: "cylinder", label: "Database", color: COLORS.moss, description: "Database / Storage" },
  { type: "hexagon", label: "AI Agent", color: COLORS.howl, description: "AI Agent / LLM" },
  { type: "cloud", label: "External", color: COLORS.prey, description: "External Service" },
  { type: "person", label: "User", color: COLORS.frost, description: "User / Actor" },
  { type: "diamond", label: "Decision", color: COLORS.fang, description: "Decision / Gate" },
  { type: "systemBoundary", label: "Boundary", color: COLORS.den, description: "System Boundary" },
];

export const ARROW_TYPES: { id: string; label: string; style: Record<string, string | number> }[] = [
  { id: "solid", label: "Data Flow", style: { stroke: COLORS.ironclad, strokeWidth: 2 } },
  { id: "dashed", label: "Async / Webhook", style: { stroke: COLORS.ironclad, strokeWidth: 2, strokeDasharray: "5,5" } },
  { id: "double", label: "Auth Flow", style: { stroke: COLORS.fang, strokeWidth: 4 } },
  { id: "red", label: "Destructive", style: { stroke: COLORS.fang, strokeWidth: 2 } },
  { id: "purple", label: "AI Inference", style: { stroke: COLORS.howl, strokeWidth: 2 } },
];

export const EDGE_DIRECTIONS: { id: EdgeDirection; label: string }[] = [
  { id: "forward", label: "One-way (A → B)" },
  { id: "reverse", label: "Reverse (B → A)" },
  { id: "bidirectional", label: "Bidirectional (A ↔ B)" },
];

export const EDGE_ROUTINGS: { id: EdgeRouting; label: string }[] = [
  { id: "smoothstep", label: "Smooth Step" },
  { id: "bezier", label: "Bezier" },
  { id: "straight", label: "Straight" },
  { id: "step", label: "Step" },
];

export const GRID_SIZE = 20;

export function getLayerForY(y: number): LayerId {
  for (const layer of LAYERS) {
    if (y >= layer.yStart && y < layer.yStart + layer.height) {
      return layer.id;
    }
  }
  return "pack";
}

export function getLayerColor(layerId: LayerId): string {
  const layer = LAYERS.find((l) => l.id === layerId);
  return layer?.color ?? COLORS.alpha;
}

export function getNodeDefaultColor(nodeType: WolfNodeType): string {
  const entry = NODE_PALETTE.find((n) => n.type === nodeType);
  return entry?.color ?? COLORS.alpha;
}

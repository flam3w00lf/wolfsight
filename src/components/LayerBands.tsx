"use client";

import { LAYERS } from "@/lib/constants";

interface Props {
  visible: boolean;
}

export default function LayerBands({ visible }: Props) {
  if (!visible) return null;

  return (
    <>
      {LAYERS.map((layer) => (
        <div
          key={layer.id}
          style={{
            position: "absolute",
            left: -5000,
            top: layer.yStart,
            width: 15000,
            height: layer.height,
            background: `${layer.color}08`,
            borderBottom: `1px solid ${layer.color}20`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "sticky",
              left: 10,
              top: 4,
              padding: "2px 8px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              color: `${layer.color}60`,
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >
            {layer.name} — {layer.subtitle}
          </div>
        </div>
      ))}
    </>
  );
}

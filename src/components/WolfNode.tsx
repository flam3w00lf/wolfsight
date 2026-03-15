"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { WolfNodeData } from "@/lib/types";
import { getNodeDefaultColor } from "@/lib/constants";

function WolfNodeComponent({ data, selected }: NodeProps & { data: WolfNodeData }) {
  const color = data.customColor || getNodeDefaultColor(data.wolfNodeType);
  const textColor = "#FAF5F0";

  const baseStyle = {
    borderColor: selected ? "#fff" : color,
    borderWidth: selected ? 3 : 2,
    color: textColor,
    minWidth: 140,
    minHeight: 50,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 600,
    position: "relative" as const,
  };

  const renderShape = () => {
    switch (data.wolfNodeType) {
      case "rectangle":
        return (
          <div style={{ ...baseStyle, background: `${color}22`, borderStyle: "solid", borderRadius: 4 }}>
            <span>{data.label}</span>
            {data.description && <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 400, marginTop: 2 }}>{data.description}</span>}
          </div>
        );
      case "roundedRectangle":
        return (
          <div style={{ ...baseStyle, background: `${color}22`, borderStyle: "solid", borderRadius: 16 }}>
            <span>{data.label}</span>
            {data.description && <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 400, marginTop: 2 }}>{data.description}</span>}
          </div>
        );
      case "cylinder":
        return (
          <div style={{ ...baseStyle, background: `${color}22`, borderStyle: "solid", borderRadius: 4 }}>
            <div style={{ position: "absolute", top: -1, left: -1, right: -1, height: 14, background: color, borderRadius: "4px 4px 50% 50%", opacity: 0.5 }} />
            <div style={{ position: "absolute", bottom: -1, left: -1, right: -1, height: 8, background: color, borderRadius: "0 0 50% 50%", opacity: 0.3 }} />
            <span style={{ marginTop: 8 }}>{data.label}</span>
            {data.description && <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 400, marginTop: 2 }}>{data.description}</span>}
          </div>
        );
      case "hexagon":
        return (
          <div style={{ ...baseStyle, background: `${color}22`, borderStyle: "solid", borderRadius: 4, clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", minWidth: 160, minHeight: 70, padding: "8px 32px" }}>
            <span>{data.label}</span>
            {data.description && <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 400, marginTop: 2 }}>{data.description}</span>}
          </div>
        );
      case "cloud":
        return (
          <div style={{ ...baseStyle, background: `${color}22`, borderStyle: "dashed", borderRadius: 24, padding: "12px 24px" }}>
            <span>☁ {data.label}</span>
            {data.description && <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 400, marginTop: 2 }}>{data.description}</span>}
          </div>
        );
      case "person":
        return (
          <div style={{ ...baseStyle, borderStyle: "none", background: "transparent", flexDirection: "column" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginBottom: 4 }}>👤</div>
            <span>{data.label}</span>
            {data.description && <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 400, marginTop: 2 }}>{data.description}</span>}
          </div>
        );
      case "diamond":
        return (
          <div style={{ ...baseStyle, background: `${color}22`, borderStyle: "solid", borderRadius: 4, transform: "rotate(45deg)", minWidth: 80, minHeight: 80, padding: 8 }}>
            <div style={{ transform: "rotate(-45deg)", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span>{data.label}</span>
              {data.description && <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 400, marginTop: 2 }}>{data.description}</span>}
            </div>
          </div>
        );
      case "systemBoundary":
        return (
          <div style={{ ...baseStyle, background: `${color}33`, borderStyle: "double", borderWidth: selected ? 4 : 3, borderRadius: 8, minWidth: 180, minHeight: 60 }}>
            <span style={{ textTransform: "uppercase", letterSpacing: 1 }}>{data.label}</span>
            {data.description && <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 400, marginTop: 2 }}>{data.description}</span>}
          </div>
        );
      default:
        return (
          <div style={{ ...baseStyle, background: `${color}22`, borderStyle: "solid", borderRadius: 4 }}>
            <span>{data.label}</span>
          </div>
        );
    }
  };

  const handleStyle = {
    background: color,
    width: 12,
    height: 12,
    border: "2px solid #0a0a0f",
    boxShadow: `0 0 4px ${color}88`,
  };

  // Multiple handles per side for spreading connections
  // Each side has 3 handles: top/left, center, bottom/right
  // All handles are both source and target for maximum flexibility
  return (
    <div className="wolf-node-wrapper">
      {/* Top handles */}
      <Handle type="target" position={Position.Top} id="top-left" isConnectable style={{ ...handleStyle, left: "25%" }} />
      <Handle type="target" position={Position.Top} id="top-center" isConnectable style={handleStyle} />
      <Handle type="target" position={Position.Top} id="top-right" isConnectable style={{ ...handleStyle, left: "75%" }} />

      {/* Bottom handles */}
      <Handle type="source" position={Position.Bottom} id="bottom-left" isConnectable style={{ ...handleStyle, left: "25%" }} />
      <Handle type="source" position={Position.Bottom} id="bottom-center" isConnectable style={handleStyle} />
      <Handle type="source" position={Position.Bottom} id="bottom-right" isConnectable style={{ ...handleStyle, left: "75%" }} />

      {/* Left handles */}
      <Handle type="target" position={Position.Left} id="left-top" isConnectable style={{ ...handleStyle, top: "25%" }} />
      <Handle type="target" position={Position.Left} id="left-center" isConnectable style={handleStyle} />
      <Handle type="target" position={Position.Left} id="left-bottom" isConnectable style={{ ...handleStyle, top: "75%" }} />

      {/* Right handles */}
      <Handle type="source" position={Position.Right} id="right-top" isConnectable style={{ ...handleStyle, top: "25%" }} />
      <Handle type="source" position={Position.Right} id="right-center" isConnectable style={handleStyle} />
      <Handle type="source" position={Position.Right} id="right-bottom" isConnectable style={{ ...handleStyle, top: "75%" }} />

      {renderShape()}
    </div>
  );
}

export default memo(WolfNodeComponent);

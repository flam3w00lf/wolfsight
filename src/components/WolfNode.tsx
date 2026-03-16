"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { WolfNodeData } from "@/lib/types";
import { getNodeDefaultColor } from "@/lib/constants";

function WolfNodeComponent({ data, selected }: NodeProps & { data: WolfNodeData }) {
  const color = data.customColor || getNodeDefaultColor(data.wolfNodeType);
  const textColor = "#FAF5F0";

  const baseStyle = {
    borderColor: selected ? "#fff" : `${color}88`,
    borderWidth: selected ? 1.5 : 1,
    color: textColor,
    minWidth: 140,
    minHeight: 44,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 20px",
    position: "relative" as const,
    boxShadow: selected
      ? `0 0 0 1px rgba(255,255,255,0.2), 0 4px 16px rgba(0,0,0,0.3)`
      : `0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.15)`,
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
  };

  const labelStyle = {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
  };

  const descStyle = {
    fontSize: 11,
    opacity: 0.6,
    fontWeight: 400,
    marginTop: 3,
    lineHeight: 1.3,
  };

  const renderShape = () => {
    switch (data.wolfNodeType) {
      case "rectangle":
        return (
          <div style={{ ...baseStyle, background: `${color}18`, borderStyle: "solid", borderRadius: 6 }}>
            <span style={labelStyle}>{data.label}</span>
            {data.description && <span style={descStyle}>{data.description}</span>}
          </div>
        );
      case "roundedRectangle":
        return (
          <div style={{ ...baseStyle, background: `${color}18`, borderStyle: "solid", borderRadius: 12 }}>
            <span style={labelStyle}>{data.label}</span>
            {data.description && <span style={descStyle}>{data.description}</span>}
          </div>
        );
      case "cylinder":
        return (
          <div style={{ ...baseStyle, background: `${color}18`, borderStyle: "solid", borderRadius: 6 }}>
            <div style={{ position: "absolute", top: -1, left: -1, right: -1, height: 12, background: color, borderRadius: "6px 6px 50% 50%", opacity: 0.35 }} />
            <div style={{ position: "absolute", bottom: -1, left: -1, right: -1, height: 6, background: color, borderRadius: "0 0 50% 50%", opacity: 0.2 }} />
            <span style={{ ...labelStyle, marginTop: 6 }}>{data.label}</span>
            {data.description && <span style={descStyle}>{data.description}</span>}
          </div>
        );
      case "hexagon":
        return (
          <div style={{ ...baseStyle, background: `${color}18`, borderStyle: "solid", borderRadius: 4, clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", minWidth: 160, minHeight: 70, padding: "12px 36px" }}>
            <span style={labelStyle}>{data.label}</span>
            {data.description && <span style={descStyle}>{data.description}</span>}
          </div>
        );
      case "cloud":
        return (
          <div style={{ ...baseStyle, background: `${color}14`, borderStyle: "dashed", borderRadius: 20, padding: "14px 24px" }}>
            <span style={labelStyle}>☁ {data.label}</span>
            {data.description && <span style={descStyle}>{data.description}</span>}
          </div>
        );
      case "person":
        return (
          <div style={{ ...baseStyle, borderStyle: "none", background: "transparent", flexDirection: "column", boxShadow: "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${color}30`, border: `1.5px solid ${color}60`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginBottom: 6 }}>👤</div>
            <span style={labelStyle}>{data.label}</span>
            {data.description && <span style={descStyle}>{data.description}</span>}
          </div>
        );
      case "diamond":
        return (
          <div style={{ ...baseStyle, background: `${color}18`, borderStyle: "solid", borderRadius: 4, transform: "rotate(45deg)", minWidth: 80, minHeight: 80, padding: 8 }}>
            <div style={{ transform: "rotate(-45deg)", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={labelStyle}>{data.label}</span>
              {data.description && <span style={descStyle}>{data.description}</span>}
            </div>
          </div>
        );
      case "systemBoundary":
        return (
          <div style={{ ...baseStyle, background: `${color}0c`, borderStyle: "solid", borderWidth: selected ? 1.5 : 1, borderRadius: 8, minWidth: 180, minHeight: 60 }}>
            <span style={{ ...labelStyle, textTransform: "uppercase", letterSpacing: 1.5, fontSize: 11, fontWeight: 500, opacity: 0.7 }}>{data.label}</span>
            {data.description && <span style={descStyle}>{data.description}</span>}
          </div>
        );
      default:
        return (
          <div style={{ ...baseStyle, background: `${color}18`, borderStyle: "solid", borderRadius: 6 }}>
            <span style={labelStyle}>{data.label}</span>
          </div>
        );
    }
  };

  return (
    <div className="wolf-node-wrapper">
      <Handle type="target" position={Position.Top} id="top-center" isConnectable className="wolf-handle" />
      <Handle type="source" position={Position.Bottom} id="bottom-center" isConnectable className="wolf-handle" />
      <Handle type="target" position={Position.Left} id="left-center" isConnectable className="wolf-handle" />
      <Handle type="source" position={Position.Right} id="right-center" isConnectable className="wolf-handle" />

      {renderShape()}
    </div>
  );
}

export default memo(WolfNodeComponent);

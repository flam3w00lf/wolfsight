"use client";

import { NODE_PALETTE, GRID_SIZE } from "@/lib/constants";
import type { WolfNode, WolfNodeType } from "@/lib/types";

interface Props {
  onAddNode: (node: WolfNode) => void;
  collapsed: boolean;
  onToggle: () => void;
}

export default function NodePalette({ onAddNode, collapsed, onToggle }: Props) {
  const handleAdd = (type: WolfNodeType, label: string) => {
    const node: WolfNode = {
      id: `node-${Date.now()}`,
      type: "wolf",
      position: { x: 300 + Math.random() * 200, y: 300 + Math.random() * 200 },
      data: {
        label,
        description: "",
        layer: "pack",
        wolfNodeType: type,
      },
    };
    // Snap
    node.position.x = Math.round(node.position.x / GRID_SIZE) * GRID_SIZE;
    node.position.y = Math.round(node.position.y / GRID_SIZE) * GRID_SIZE;
    onAddNode(node);
  };

  return (
    <div
      className={`flex flex-col border-r border-white/10 bg-[#0d0d14] transition-all ${collapsed ? "w-12" : "w-56"}`}
      style={{ height: "100%" }}
    >
      <button
        onClick={onToggle}
        className="p-3 text-xs text-[#FAF5F0]/60 hover:text-[#F97316] border-b border-white/10 text-left"
      >
        {collapsed ? "▶" : "◀ Nodes"}
      </button>
      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {NODE_PALETTE.map((item) => (
            <button
              key={item.type}
              onClick={() => handleAdd(item.type, item.label)}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm hover:bg-white/5 transition-colors group"
            >
              <div
                className="w-4 h-4 rounded-sm flex-shrink-0"
                style={{ background: item.color }}
              />
              <div className="flex flex-col">
                <span className="text-[#FAF5F0] text-xs font-medium group-hover:text-[#F97316]">
                  {item.label}
                </span>
                <span className="text-[#6B7280] text-[10px]">{item.description}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

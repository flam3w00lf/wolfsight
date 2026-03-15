"use client";

import type { WolfNode, WolfEdge, ArrowType, LayerId } from "@/lib/types";
import { LAYERS, ARROW_TYPES, COLORS } from "@/lib/constants";

interface Props {
  selectedNode: WolfNode | null;
  selectedEdge: WolfEdge | null;
  diagramTitle: string;
  diagramDescription: string;
  onUpdateNode: (id: string, data: Partial<WolfNode["data"]>) => void;
  onUpdateEdge: (id: string, data: Partial<WolfEdge>) => void;
  onSetTitle: (t: string) => void;
  onSetDescription: (d: string) => void;
  onExportJSON: () => void;
  onExportPNG: () => void;
  onImportJSON: () => void;
  collapsed: boolean;
  onToggle: () => void;
}

const inputClass = "w-full bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs text-[#FAF5F0] focus:outline-none focus:border-[#F97316]";
const labelClass = "text-[10px] uppercase tracking-wider text-[#6B7280] mb-1";

export default function PropertiesPanel({
  selectedNode, selectedEdge, diagramTitle, diagramDescription,
  onUpdateNode, onUpdateEdge, onSetTitle, onSetDescription,
  onExportJSON, onExportPNG, onImportJSON,
  collapsed, onToggle,
}: Props) {
  return (
    <div
      className={`flex flex-col border-l border-white/10 bg-[#0d0d14] transition-all ${collapsed ? "w-12" : "w-64"}`}
      style={{ height: "100%" }}
    >
      <button
        onClick={onToggle}
        className="p-3 text-xs text-[#FAF5F0]/60 hover:text-[#F97316] border-b border-white/10 text-right"
      >
        {collapsed ? "◀" : "Properties ▶"}
      </button>
      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {selectedNode ? (
            <>
              <div>
                <p className={labelClass}>Node Label</p>
                <input
                  className={inputClass}
                  value={selectedNode.data.label}
                  onChange={(e) => onUpdateNode(selectedNode.id, { label: e.target.value })}
                />
              </div>
              <div>
                <p className={labelClass}>Description</p>
                <textarea
                  className={`${inputClass} h-16 resize-none`}
                  value={selectedNode.data.description}
                  onChange={(e) => onUpdateNode(selectedNode.id, { description: e.target.value })}
                />
              </div>
              <div>
                <p className={labelClass}>Layer</p>
                <select
                  className={inputClass}
                  value={selectedNode.data.layer}
                  onChange={(e) => onUpdateNode(selectedNode.id, { layer: e.target.value as LayerId })}
                >
                  {LAYERS.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className={labelClass}>Color Override</p>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    className="w-8 h-8 cursor-pointer bg-transparent border-0"
                    value={selectedNode.data.customColor || COLORS.alpha}
                    onChange={(e) => onUpdateNode(selectedNode.id, { customColor: e.target.value })}
                  />
                  <button
                    className="text-[10px] text-[#F97316] hover:underline"
                    onClick={() => onUpdateNode(selectedNode.id, { customColor: undefined })}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div>
                <p className={labelClass}>Type</p>
                <p className="text-xs text-[#FAF5F0]/60">{selectedNode.data.wolfNodeType}</p>
              </div>
            </>
          ) : selectedEdge ? (
            <>
              <div>
                <p className={labelClass}>Edge Label</p>
                <input
                  className={inputClass}
                  value={(selectedEdge.label as string) || ""}
                  onChange={(e) => onUpdateEdge(selectedEdge.id, { label: e.target.value })}
                />
              </div>
              <div>
                <p className={labelClass}>Arrow Type</p>
                <select
                  className={inputClass}
                  value={selectedEdge.data?.arrowType || "solid"}
                  onChange={(e) => onUpdateEdge(selectedEdge.id, { data: { arrowType: e.target.value as ArrowType } })}
                >
                  {ARROW_TYPES.map((a) => (
                    <option key={a.id} value={a.id}>{a.label}</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className={labelClass}>Diagram Title</p>
                <input
                  className={inputClass}
                  value={diagramTitle}
                  onChange={(e) => onSetTitle(e.target.value)}
                />
              </div>
              <div>
                <p className={labelClass}>Description</p>
                <textarea
                  className={`${inputClass} h-16 resize-none`}
                  value={diagramDescription}
                  onChange={(e) => onSetDescription(e.target.value)}
                />
              </div>
              <hr className="border-white/10" />
              <div className="space-y-2">
                <p className={labelClass}>Export</p>
                <button onClick={onExportPNG} className="w-full py-1.5 px-3 rounded bg-[#F97316] text-white text-xs font-medium hover:bg-[#ea580c] transition-colors">
                  Export PNG
                </button>
                <button onClick={onExportJSON} className="w-full py-1.5 px-3 rounded bg-white/10 text-[#FAF5F0] text-xs font-medium hover:bg-white/15 transition-colors">
                  Export JSON
                </button>
                <button onClick={onImportJSON} className="w-full py-1.5 px-3 rounded bg-white/10 text-[#FAF5F0] text-xs font-medium hover:bg-white/15 transition-colors">
                  Import JSON
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

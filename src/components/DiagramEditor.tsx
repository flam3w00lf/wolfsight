"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useReactFlow,
  ReactFlowProvider,
  ConnectionMode,
  SelectionMode,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { toPng } from "html-to-image";

import WolfNode from "./WolfNode";
import NodePalette from "./NodePalette";
import PropertiesPanel from "./PropertiesPanel";
import Toolbar from "./Toolbar";
import TemplateModal from "./TemplateModal";
import LayerBands from "./LayerBands";
import { useDiagramStore } from "@/lib/store";
import { ARROW_TYPES, COLORS } from "@/lib/constants";
import type { WolfNode as WolfNodeType, WolfEdge, Diagram, ArrowType, EdgeDirection, EdgeRouting } from "@/lib/types";
import { MarkerType } from "@xyflow/react";

const nodeTypes: NodeTypes = {
  wolf: WolfNode,
};

const kbdStyle: React.CSSProperties = {
  display: "inline-block",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 4,
  padding: "1px 5px",
  fontSize: 10,
  fontFamily: "monospace",
  marginRight: 6,
  color: "#FAF5F0",
};

const kbdStyleLight: React.CSSProperties = {
  ...kbdStyle,
  background: "rgba(0,0,0,0.06)",
  border: "1px solid rgba(0,0,0,0.12)",
  color: "#1C1917",
};

function getEdgeStyle(arrowType: ArrowType) {
  const entry = ARROW_TYPES.find((a) => a.id === arrowType);
  return entry?.style || {};
}

function Editor() {
  const store = useDiagramStore();
  const { zoomIn, zoomOut, fitView, getNodes } = useReactFlow();
  const flowRef = useRef<HTMLDivElement>(null);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [showConnectHint, setShowConnectHint] = useState(true);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wolfsight-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("wolfsight-theme", next);
      return next;
    });
  }, []);

  const isDark = theme === "dark";

  // Dismiss the connect hint after 8 seconds or on first connect
  useEffect(() => {
    const timer = setTimeout(() => setShowConnectHint(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    store.loadDiagramFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save
  useEffect(() => {
    const timer = setInterval(() => {
      store.saveDiagramToLocalStorage();
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.nodes, store.edges, store.title, store.description]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT";

      if (e.key === "Delete" || e.key === "Backspace") {
        if (isInput) return;
        store.deleteSelected();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) store.redo();
        else store.undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "a") {
        if (isInput) return;
        e.preventDefault();
        store.selectAll();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "e") {
        e.preventDefault();
        handleExportPNG();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  const selectedNode = useMemo(
    () => store.nodes.find((n) => n.id === store.selectedNodeId) || null,
    [store.nodes, store.selectedNodeId]
  );

  const selectedEdge = useMemo(
    () => store.edges.find((e) => e.id === store.selectedEdgeId) || null,
    [store.edges, store.selectedEdgeId]
  );

  // Style edges based on arrow type, direction, and routing
  const styledEdges = useMemo(
    () =>
      store.edges.map((e) => {
        const style = getEdgeStyle(e.data?.arrowType || "solid");
        const direction: EdgeDirection = e.data?.direction || "forward";
        const routing: EdgeRouting = e.data?.routing || "smoothstep";
        const edgeColor = (style as Record<string, unknown>).stroke as string || COLORS.ironclad;

        const markerEnd = direction === "reverse"
          ? undefined
          : { type: MarkerType.ArrowClosed, color: edgeColor };
        const markerStart = direction === "reverse"
          ? { type: MarkerType.ArrowClosed, color: edgeColor }
          : direction === "bidirectional"
          ? { type: MarkerType.ArrowClosed, color: edgeColor }
          : undefined;

        return {
          ...e,
          type: routing,
          style,
          animated: e.data?.arrowType === "dashed",
          markerEnd,
          markerStart,
        };
      }),
    [store.edges]
  );

  const handleExportPNG = useCallback(async () => {
    if (!flowRef.current) return;
    const el = flowRef.current.querySelector(".react-flow__viewport") as HTMLElement;
    if (!el) return;

    // Get bounds of all nodes to capture full diagram
    const allNodes = getNodes();
    if (allNodes.length === 0) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    allNodes.forEach((n) => {
      const w = n.measured?.width ?? 180;
      const h = n.measured?.height ?? 60;
      minX = Math.min(minX, n.position.x);
      minY = Math.min(minY, n.position.y);
      maxX = Math.max(maxX, n.position.x + w);
      maxY = Math.max(maxY, n.position.y + h);
    });

    const padding = 60;
    const diagramWidth = maxX - minX + padding * 2;
    const diagramHeight = maxY - minY + padding * 2;

    try {
      const dataUrl = await toPng(el, {
        backgroundColor: isDark ? COLORS.bg : "#FAF5F0",
        width: diagramWidth,
        height: diagramHeight,
        style: {
          width: `${diagramWidth}px`,
          height: `${diagramHeight}px`,
          transform: `translate(${-minX + padding}px, ${-minY + padding}px) scale(1)`,
        },
      });
      const link = document.createElement("a");
      link.download = `${store.title.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("PNG export failed:", err);
    }
  }, [store.title, isDark, getNodes]);

  const handleExportJSON = useCallback(() => {
    const diagram = store.exportDiagram();
    const json = JSON.stringify(diagram, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${store.title.replace(/\s+/g, "-").toLowerCase()}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, [store]);

  const handleImportJSON = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const diagram = JSON.parse(text) as Diagram;
        store.loadDiagram(diagram);
      } catch {
        console.error("Invalid JSON file");
      }
    };
    input.click();
  }, [store]);

  // Context menu for grouping
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    const selected = store.nodes.filter((n) => n.selected);
    if (selected.length >= 2) {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
    }
  }, [store.nodes]);

  const handleGroup = useCallback(() => {
    store.groupSelectedNodes();
    setContextMenu(null);
  }, [store]);

  // Close context menu on click anywhere
  useEffect(() => {
    if (!contextMenu) return;
    const handler = () => setContextMenu(null);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [contextMenu]);

  const bgColor = isDark ? COLORS.bg : "#FAF5F0";
  const dotColor = isDark ? "#1a1a2e" : "#d4d0cb";
  const overlayBg = isDark ? "rgba(13, 13, 20, 0.85)" : "rgba(250, 245, 240, 0.9)";
  const overlayBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const overlayText = isDark ? "#9CA3AF" : "#6B7280";
  const overlayTitle = isDark ? "#FAF5F0" : "#1C1917";
  const kbd = isDark ? kbdStyle : kbdStyleLight;

  return (
    <div className="flex flex-col h-screen" style={{ background: bgColor }}>
      <Toolbar
        title={store.title}
        onTitleChange={store.setTitle}
        onUndo={store.undo}
        onRedo={store.redo}
        onZoomIn={() => zoomIn()}
        onZoomOut={() => zoomOut()}
        onFitView={() => fitView()}
        showGrid={store.showGrid}
        onToggleGrid={() => store.setShowGrid(!store.showGrid)}
        showLayers={store.showLayers}
        onToggleLayers={() => store.setShowLayers(!store.showLayers)}
        onExportPNG={handleExportPNG}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onLoadTemplate={() => setTemplateModalOpen(true)}
        onDeleteSelected={store.deleteSelected}
        onAutoLayout={store.runAutoLayout}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <div className="flex flex-1 overflow-hidden" onContextMenu={handleContextMenu}>
        <NodePalette
          onAddNode={store.addNode}
          collapsed={leftCollapsed}
          onToggle={() => setLeftCollapsed(!leftCollapsed)}
        />
        <div className="flex-1 relative" ref={flowRef}>
          <ReactFlow
            nodes={store.nodes}
            edges={styledEdges}
            onNodesChange={store.onNodesChange}
            onEdgesChange={store.onEdgesChange}
            onConnect={(conn) => { store.onConnect(conn); setShowConnectHint(false); }}
            nodeTypes={nodeTypes}
            onNodeClick={(_, node) => {
              store.setSelectedNodeId(node.id);
              store.setSelectedEdgeId(null);
            }}
            onEdgeClick={(_, edge) => {
              store.setSelectedEdgeId(edge.id);
              store.setSelectedNodeId(null);
            }}
            onPaneClick={() => {
              store.setSelectedNodeId(null);
              store.setSelectedEdgeId(null);
            }}
            connectionMode={ConnectionMode.Loose}
            snapToGrid
            snapGrid={[20, 20]}
            fitView
            selectionOnDrag
            selectionMode={SelectionMode.Partial}
            multiSelectionKeyCode="Shift"
            proOptions={{ hideAttribution: true }}
            defaultEdgeOptions={{
              type: "smoothstep",
              style: { stroke: COLORS.ironclad, strokeWidth: 2 },
              markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.ironclad },
            }}
            style={{ background: bgColor }}
          >
            {store.showGrid && (
              <Background
                variant={BackgroundVariant.Dots}
                gap={20}
                size={1}
                color={dotColor}
              />
            )}
            <Controls
              showInteractive={false}
              style={{ background: isDark ? "#0d0d14" : "#f5f0eb", borderColor: overlayBorder, borderRadius: 8 }}
            />
            <LayerBands visible={store.showLayers} />
          </ReactFlow>

          {/* Connection hint tooltip */}
          {showConnectHint && (
            <div
              style={{
                position: "absolute",
                top: 12,
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(249, 115, 22, 0.9)",
                color: "#fff",
                padding: "8px 20px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                zIndex: 50,
                pointerEvents: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                whiteSpace: "nowrap",
                animation: "fade-in 0.3s ease",
              }}
            >
              Drag from a dot on any node to another node to connect them
            </div>
          )}

          {/* Context menu for grouping */}
          {contextMenu && (
            <div
              style={{
                position: "fixed",
                top: contextMenu.y,
                left: contextMenu.x,
                background: isDark ? "#1a1a2e" : "#fff",
                border: `1px solid ${overlayBorder}`,
                borderRadius: 6,
                padding: 4,
                zIndex: 100,
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              }}
            >
              <button
                onClick={handleGroup}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "6px 16px",
                  fontSize: 12,
                  color: isDark ? "#FAF5F0" : "#1C1917",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 4,
                  textAlign: "left",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "transparent"; }}
              >
                Group Selected
              </button>
            </div>
          )}

          {/* Keyboard shortcuts help overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: 12,
              background: overlayBg,
              border: `1px solid ${overlayBorder}`,
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 11,
              color: overlayText,
              zIndex: 40,
              lineHeight: 1.7,
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ fontWeight: 700, color: overlayTitle, marginBottom: 4, fontSize: 12 }}>Shortcuts</div>
            <div><kbd style={kbd}>Del</kbd> Delete selected</div>
            <div><kbd style={kbd}>⌘Z</kbd> Undo</div>
            <div><kbd style={kbd}>⌘⇧Z</kbd> Redo</div>
            <div><kbd style={kbd}>⌘A</kbd> Select all</div>
            <div><kbd style={kbd}>⌘E</kbd> Export PNG</div>
            <div style={{ borderTop: `1px solid ${overlayBorder}`, marginTop: 6, paddingTop: 6, color: "#F97316" }}>
              Drag handle dots to connect
            </div>
          </div>
        </div>
        <PropertiesPanel
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          diagramTitle={store.title}
          diagramDescription={store.description}
          onUpdateNode={store.updateNodeData}
          onUpdateEdge={store.updateEdgeData}
          onSetTitle={store.setTitle}
          onSetDescription={store.setDescription}
          onExportJSON={handleExportJSON}
          onExportPNG={handleExportPNG}
          onImportJSON={handleImportJSON}
          collapsed={rightCollapsed}
          onToggle={() => setRightCollapsed(!rightCollapsed)}
        />
      </div>
      <TemplateModal
        open={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
        onLoad={store.loadDiagram}
      />
    </div>
  );
}

export default function DiagramEditor() {
  return (
    <ReactFlowProvider>
      <Editor />
    </ReactFlowProvider>
  );
}

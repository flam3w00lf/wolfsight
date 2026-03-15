"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useReactFlow,
  ReactFlowProvider,
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
import type { WolfNode as WolfNodeType, WolfEdge, Diagram, ArrowType } from "@/lib/types";

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

function getEdgeStyle(arrowType: ArrowType) {
  const entry = ARROW_TYPES.find((a) => a.id === arrowType);
  return entry?.style || {};
}

function Editor() {
  const store = useDiagramStore();
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const flowRef = useRef<HTMLDivElement>(null);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [showConnectHint, setShowConnectHint] = useState(true);

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
      if (e.key === "Delete" || e.key === "Backspace") {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") return;
        store.deleteSelected();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) store.redo();
        else store.undo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [store]);

  const selectedNode = useMemo(
    () => store.nodes.find((n) => n.id === store.selectedNodeId) || null,
    [store.nodes, store.selectedNodeId]
  );

  const selectedEdge = useMemo(
    () => store.edges.find((e) => e.id === store.selectedEdgeId) || null,
    [store.edges, store.selectedEdgeId]
  );

  // Style edges based on arrow type
  const styledEdges = useMemo(
    () =>
      store.edges.map((e) => ({
        ...e,
        style: getEdgeStyle(e.data?.arrowType || "solid"),
        animated: e.data?.arrowType === "dashed",
      })),
    [store.edges]
  );

  const handleExportPNG = useCallback(async () => {
    if (!flowRef.current) return;
    const el = flowRef.current.querySelector(".react-flow__viewport") as HTMLElement;
    if (!el) return;
    try {
      const dataUrl = await toPng(el, {
        backgroundColor: COLORS.bg,
        width: 1920,
        height: 1080,
      });
      const link = document.createElement("a");
      link.download = `${store.title.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("PNG export failed:", err);
    }
  }, [store.title]);

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

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0f]">
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
        onLoadTemplate={() => setTemplateModalOpen(true)}
        onDeleteSelected={store.deleteSelected}
      />
      <div className="flex flex-1 overflow-hidden">
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
            snapToGrid
            snapGrid={[20, 20]}
            fitView
            proOptions={{ hideAttribution: true }}
            defaultEdgeOptions={{
              type: "default",
              style: { stroke: COLORS.ironclad, strokeWidth: 2 },
              markerEnd: { type: "arrowclosed" as never, color: COLORS.ironclad },
            }}
            style={{ background: COLORS.bg }}
          >
            {store.showGrid && (
              <Background
                variant={BackgroundVariant.Dots}
                gap={20}
                size={1}
                color="#1a1a2e"
              />
            )}
            <Controls
              showInteractive={false}
              style={{ background: "#0d0d14", borderColor: "#ffffff15", borderRadius: 8 }}
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
          {/* Help overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: 12,
              background: "rgba(13, 13, 20, 0.85)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 11,
              color: "#9CA3AF",
              zIndex: 40,
              lineHeight: 1.7,
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ fontWeight: 700, color: "#FAF5F0", marginBottom: 4, fontSize: 12 }}>Shortcuts</div>
            <div><kbd style={kbdStyle}>Del</kbd> Delete selected</div>
            <div><kbd style={kbdStyle}>⌘Z</kbd> Undo</div>
            <div><kbd style={kbdStyle}>⌘⇧Z</kbd> Redo</div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 6, paddingTop: 6, color: "#F97316" }}>
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

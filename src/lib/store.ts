"use client";

import { useCallback, useState } from "react";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Connection,
  type NodeChange,
  type EdgeChange,
} from "@xyflow/react";
import type { WolfNode, WolfEdge, WolfEdgeData, Diagram, ArrowType, LayerId, EdgeDirection, EdgeRouting } from "./types";
import { GRID_SIZE, getLayerForY } from "./constants";

interface HistoryEntry {
  nodes: WolfNode[];
  edges: WolfEdge[];
}

export function useDiagramStore() {
  const [nodes, setNodes] = useState<WolfNode[]>([]);
  const [edges, setEdges] = useState<WolfEdge[]>([]);
  const [title, setTitle] = useState("Untitled Diagram");
  const [description, setDescription] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [showLayers, setShowLayers] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const pushHistory = useCallback((n: WolfNode[], e: WolfEdge[]) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push({ nodes: structuredClone(n), edges: structuredClone(e) });
      if (newHistory.length > 50) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 49));
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const entry = history[historyIndex - 1];
      setNodes(entry.nodes);
      setEdges(entry.edges);
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const entry = history[historyIndex + 1];
      setNodes(entry.nodes);
      setEdges(entry.edges);
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex]);

  const onNodesChange = useCallback((changes: NodeChange<WolfNode>[]) => {
    setNodes((nds) => {
      const updated = applyNodeChanges(changes, nds);
      return updated.map((n) => ({
        ...n,
        position: {
          x: Math.round(n.position.x / GRID_SIZE) * GRID_SIZE,
          y: Math.round(n.position.y / GRID_SIZE) * GRID_SIZE,
        },
        data: {
          ...n.data,
          layer: getLayerForY(n.position.y),
        },
      }));
    });
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange<WolfEdge>[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => {
      const newEdge: WolfEdge = {
        ...connection,
        id: `e-${Date.now()}`,
        label: "",
        type: "smoothstep",
        data: {
          arrowType: "solid" as ArrowType,
          direction: "forward" as EdgeDirection,
          routing: "smoothstep" as EdgeRouting,
        },
      } as unknown as WolfEdge;
      // Append directly instead of addEdge to allow unlimited connections per handle
      return [...eds, newEdge];
    });
  }, []);

  const addNode = useCallback((node: WolfNode) => {
    setNodes((nds) => {
      const updated = [...nds, node];
      pushHistory(updated, edges);
      return updated;
    });
  }, [edges, pushHistory]);

  const updateNodeData = useCallback((nodeId: string, data: Partial<WolfNode["data"]>) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n))
    );
  }, []);

  const updateEdgeData = useCallback((edgeId: string, updates: Partial<Omit<WolfEdge, 'data'>> & { data?: Partial<WolfEdgeData> }) => {
    setEdges((eds) =>
      eds.map((e) => {
        if (e.id !== edgeId) return e;
        const mergedData: WolfEdgeData = {
          arrowType: e.data?.arrowType ?? "solid",
          direction: e.data?.direction ?? "forward",
          routing: e.data?.routing ?? "smoothstep",
          ...(updates.data || {}),
        };
        return { ...e, ...updates, data: mergedData } as WolfEdge;
      })
    );
  }, []);

  const deleteSelected = useCallback(() => {
    if (selectedNodeId) {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
      setEdges((eds) => eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId));
      setSelectedNodeId(null);
    }
    if (selectedEdgeId) {
      setEdges((eds) => eds.filter((e) => e.id !== selectedEdgeId));
      setSelectedEdgeId(null);
    }
  }, [selectedNodeId, selectedEdgeId]);

  const loadDiagram = useCallback((diagram: Diagram) => {
    setNodes(diagram.nodes);
    setEdges(diagram.edges);
    setTitle(diagram.title);
    setDescription(diagram.description);
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    pushHistory(diagram.nodes, diagram.edges);
  }, [pushHistory]);

  const exportDiagram = useCallback((): Diagram => {
    return { title, description, nodes, edges };
  }, [title, description, nodes, edges]);

  const saveDiagramToLocalStorage = useCallback(() => {
    const diagram = exportDiagram();
    localStorage.setItem("wolfsight-diagram", JSON.stringify(diagram));
  }, [exportDiagram]);

  const loadDiagramFromLocalStorage = useCallback(() => {
    const saved = localStorage.getItem("wolfsight-diagram");
    if (saved) {
      const diagram = JSON.parse(saved) as Diagram;
      loadDiagram(diagram);
    }
  }, [loadDiagram]);

  return {
    nodes, edges, title, description,
    selectedNodeId, selectedEdgeId,
    showGrid, showLayers,
    setTitle, setDescription,
    setSelectedNodeId, setSelectedEdgeId,
    setShowGrid, setShowLayers,
    onNodesChange, onEdgesChange, onConnect,
    addNode, updateNodeData, updateEdgeData,
    deleteSelected, loadDiagram, exportDiagram,
    saveDiagramToLocalStorage, loadDiagramFromLocalStorage,
    undo, redo,
    setNodes, setEdges,
  };
}

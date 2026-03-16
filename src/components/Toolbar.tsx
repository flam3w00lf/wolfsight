"use client";

import Link from "next/link";

interface Props {
  title: string;
  onTitleChange: (t: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  showLayers: boolean;
  onToggleLayers: () => void;
  onExportPNG: () => void;
  onExportJSON: () => void;
  onImportJSON: () => void;
  onLoadTemplate: () => void;
  onDeleteSelected: () => void;
  onAutoLayout: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function Toolbar({
  title, onTitleChange,
  onUndo, onRedo,
  onZoomIn, onZoomOut, onFitView,
  showGrid, onToggleGrid,
  showLayers, onToggleLayers,
  onExportPNG, onExportJSON, onImportJSON,
  onLoadTemplate, onDeleteSelected,
  onAutoLayout,
  theme, onToggleTheme,
}: Props) {
  const isDark = theme === "dark";
  const bg = isDark ? "bg-[#0d0d14]" : "bg-[#f5f0eb]";
  const textColor = isDark ? "text-[#FAF5F0]/80" : "text-[#1C1917]/80";
  const hoverText = isDark ? "hover:text-[#F97316]" : "hover:text-[#D97706]";
  const divider = isDark ? "bg-white/10" : "bg-black/10";
  const inputBorder = isDark ? "hover:border-white/10 focus:border-[#F97316]" : "hover:border-black/10 focus:border-[#D97706]";
  const inputText = isDark ? "text-[#FAF5F0]" : "text-[#1C1917]";

  const btnClass = `px-2.5 py-1.5 rounded text-xs ${textColor} hover:bg-white/10 ${hoverText} transition-colors`;
  const activeBtnClass = `px-2.5 py-1.5 rounded text-xs bg-[#F97316]/20 text-[#F97316]`;

  return (
    <div className={`h-12 flex items-center gap-1 px-3 border-b ${isDark ? "border-white/10" : "border-black/10"} ${bg}`}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1.5 mr-3">
        <span className="text-lg">🐺</span>
        <span className="text-sm font-bold text-[#F97316]">WolfSight</span>
      </Link>

      {/* Title */}
      <input
        className={`bg-transparent border border-transparent ${inputBorder} rounded px-2 py-1 text-sm ${inputText} font-medium focus:outline-none w-48`}
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <div className={`w-px h-6 ${divider} mx-1`} />

      {/* Actions */}
      <button onClick={onUndo} className={btnClass} title="Undo (⌘Z)">↩</button>
      <button onClick={onRedo} className={btnClass} title="Redo (⌘⇧Z)">↪</button>

      <div className={`w-px h-6 ${divider} mx-1`} />

      <button onClick={onZoomIn} className={btnClass} title="Zoom In">+</button>
      <button onClick={onZoomOut} className={btnClass} title="Zoom Out">−</button>
      <button onClick={onFitView} className={btnClass} title="Fit View">⊞</button>

      <div className={`w-px h-6 ${divider} mx-1`} />

      <button onClick={onToggleGrid} className={showGrid ? activeBtnClass : btnClass} title="Toggle Grid">Grid</button>
      <button onClick={onToggleLayers} className={showLayers ? activeBtnClass : btnClass} title="Toggle Layers">Layers</button>

      <div className={`w-px h-6 ${divider} mx-1`} />

      <button onClick={onAutoLayout} className={btnClass} title="Auto-arrange nodes in hierarchy">Layout</button>
      <button onClick={onDeleteSelected} className={`${btnClass} hover:!text-[#DC2626]`} title="Delete Selected">Del</button>

      <div className="flex-1" />

      <button onClick={onToggleTheme} className={btnClass} title="Toggle dark/light theme">
        {isDark ? "☀" : "🌙"}
      </button>

      <div className={`w-px h-6 ${divider} mx-1`} />

      <button onClick={onLoadTemplate} className={btnClass}>Templates</button>
      <button onClick={onImportJSON} className={btnClass}>Import</button>
      <button onClick={onExportPNG} className={`${btnClass} !text-[#F97316]`}>PNG</button>
      <button onClick={onExportJSON} className={btnClass}>JSON</button>

      <div className={`w-px h-6 ${divider} mx-1`} />

      <Link href="/templates" className={btnClass}>Browse</Link>
      <Link href="/about" className={btnClass}>About</Link>
    </div>
  );
}

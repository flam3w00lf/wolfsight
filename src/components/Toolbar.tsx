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
  onLoadTemplate: () => void;
  onDeleteSelected: () => void;
}

export default function Toolbar({
  title, onTitleChange,
  onUndo, onRedo,
  onZoomIn, onZoomOut, onFitView,
  showGrid, onToggleGrid,
  showLayers, onToggleLayers,
  onExportPNG, onExportJSON,
  onLoadTemplate, onDeleteSelected,
}: Props) {
  const btnClass = "px-2.5 py-1.5 rounded text-xs text-[#FAF5F0]/80 hover:bg-white/10 hover:text-[#F97316] transition-colors";
  const activeBtnClass = "px-2.5 py-1.5 rounded text-xs bg-[#F97316]/20 text-[#F97316]";

  return (
    <div className="h-12 flex items-center gap-1 px-3 border-b border-white/10 bg-[#0d0d14]">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1.5 mr-3">
        <span className="text-lg">🐺</span>
        <span className="text-sm font-bold text-[#F97316]">WolfSight</span>
      </Link>

      {/* Title */}
      <input
        className="bg-transparent border border-transparent hover:border-white/10 focus:border-[#F97316] rounded px-2 py-1 text-sm text-[#FAF5F0] font-medium focus:outline-none w-48"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <div className="w-px h-6 bg-white/10 mx-1" />

      {/* Actions */}
      <button onClick={onUndo} className={btnClass} title="Undo">↩</button>
      <button onClick={onRedo} className={btnClass} title="Redo">↪</button>

      <div className="w-px h-6 bg-white/10 mx-1" />

      <button onClick={onZoomIn} className={btnClass} title="Zoom In">+</button>
      <button onClick={onZoomOut} className={btnClass} title="Zoom Out">−</button>
      <button onClick={onFitView} className={btnClass} title="Fit View">⊞</button>

      <div className="w-px h-6 bg-white/10 mx-1" />

      <button onClick={onToggleGrid} className={showGrid ? activeBtnClass : btnClass} title="Toggle Grid">Grid</button>
      <button onClick={onToggleLayers} className={showLayers ? activeBtnClass : btnClass} title="Toggle Layers">Layers</button>

      <div className="w-px h-6 bg-white/10 mx-1" />

      <button onClick={onDeleteSelected} className={`${btnClass} hover:!text-[#DC2626]`} title="Delete Selected">Del</button>

      <div className="flex-1" />

      <button onClick={onLoadTemplate} className={btnClass}>Templates</button>
      <button onClick={onExportPNG} className={`${btnClass} !text-[#F97316]`}>PNG</button>
      <button onClick={onExportJSON} className={btnClass}>JSON</button>

      <div className="w-px h-6 bg-white/10 mx-1" />

      <Link href="/templates" className={btnClass}>Browse</Link>
      <Link href="/about" className={btnClass}>About</Link>
    </div>
  );
}

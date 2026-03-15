"use client";

import { templates } from "@/lib/templates";
import type { Diagram } from "@/lib/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onLoad: (diagram: Diagram) => void;
}

export default function TemplateModal({ open, onClose, onLoad }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-[#0d0d14] border border-white/10 rounded-xl p-6 w-[500px] max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-[#FAF5F0] mb-4">Load Template</h2>
        <div className="space-y-2">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => { onLoad(t.diagram); onClose(); }}
              className="w-full text-left p-4 rounded-lg border border-white/10 hover:border-[#F97316]/50 hover:bg-[#F97316]/5 transition-colors"
            >
              <p className="text-sm font-semibold text-[#FAF5F0]">{t.name}</p>
              <p className="text-xs text-[#6B7280] mt-1">{t.description}</p>
            </button>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 w-full py-2 rounded bg-white/10 text-[#FAF5F0] text-xs hover:bg-white/15 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

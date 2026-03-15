"use client";

import Link from "next/link";
import { templates } from "@/lib/templates";
import { COLORS } from "@/lib/constants";

export default function TemplatesPage() {
  const handleLoad = (id: string) => {
    const template = templates.find((t) => t.id === id);
    if (template) {
      localStorage.setItem("wolfsight-diagram", JSON.stringify(template.diagram));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#FAF5F0]">
      <nav className="h-14 flex items-center px-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🐺</span>
          <span className="text-base font-bold text-[#F97316]">WolfSight</span>
        </Link>
        <div className="flex-1" />
        <Link href="/" className="text-xs text-[#FAF5F0]/60 hover:text-[#F97316]">← Back to Editor</Link>
      </nav>

      <main className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-2">Templates</h1>
        <p className="text-sm text-[#6B7280] mb-10">Pre-built architecture diagrams following the WolfSight standard.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {templates.map((t) => (
            <Link
              key={t.id}
              href="/"
              onClick={() => handleLoad(t.id)}
              className="block p-6 rounded-xl border border-white/10 hover:border-[#F97316]/50 hover:bg-[#F97316]/5 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold">{t.name}</h3>
                  <p className="text-xs text-[#6B7280] mt-1">{t.description}</p>
                </div>
                <div className="text-xs text-[#F97316]">
                  {t.diagram.nodes.length} nodes · {t.diagram.edges.length} edges
                </div>
              </div>
              <div className="mt-4 flex gap-1.5 flex-wrap">
                {t.diagram.nodes.slice(0, 5).map((n) => (
                  <span
                    key={n.id}
                    className="text-[10px] px-2 py-0.5 rounded-full border"
                    style={{ borderColor: `${COLORS.alpha}40`, color: COLORS.alpha }}
                  >
                    {n.data.label}
                  </span>
                ))}
                {t.diagram.nodes.length > 5 && (
                  <span className="text-[10px] px-2 py-0.5 text-[#6B7280]">
                    +{t.diagram.nodes.length - 5} more
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

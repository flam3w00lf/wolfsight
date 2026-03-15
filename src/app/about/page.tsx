import Link from "next/link";
import { COLORS } from "@/lib/constants";

const colorEntries = [
  { name: "Alpha (Ember Orange)", hex: COLORS.alpha, usage: "Our services, main flows" },
  { name: "Den (Charcoal)", hex: COLORS.den, usage: "Backgrounds, boundaries" },
  { name: "Bone (Warm White)", hex: COLORS.bone, usage: "Labels, text" },
  { name: "Ironclad (Steel Gray)", hex: COLORS.ironclad, usage: "Infrastructure, utilities" },
  { name: "Prey (Amber Gold)", hex: COLORS.prey, usage: "External services" },
  { name: "Fang (Crimson)", hex: COLORS.fang, usage: "Auth, security, danger" },
  { name: "Moss (Forest Green)", hex: COLORS.moss, usage: "Data stores, databases" },
  { name: "Howl (Deep Purple)", hex: COLORS.howl, usage: "AI/ML, agents, LLMs" },
  { name: "Frost (Ice Blue)", hex: COLORS.frost, usage: "User-facing, frontend" },
  { name: "Mist (Light Gray)", hex: COLORS.mist, usage: "Annotations, notes" },
];

export default function AboutPage() {
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

      <main className="max-w-2xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-2">What is WolfSight?</h1>
        <p className="text-lg text-[#F97316] italic mb-8">&quot;See the territory before you run it.&quot;</p>

        <section className="space-y-6 text-sm text-[#FAF5F0]/80 leading-relaxed">
          <p>
            WolfSight is the WolfPack visual architecture standard. It provides a consistent, brand-aligned system
            for diagramming software architecture — from high-level territory maps down to component-level detail.
          </p>

          <h2 className="text-xl font-bold text-[#FAF5F0] pt-4">Philosophy</h2>
          <p>
            Diagrams are code. They live in the repo. They get reviewed in PRs. They tell the truth or they get deleted.
          </p>

          <h2 className="text-xl font-bold text-[#FAF5F0] pt-4">The Territory (Layers)</h2>
          <div className="space-y-2">
            {[
              { name: "THE SURFACE", color: COLORS.frost, desc: "Users, browsers, mobile apps, CLI tools" },
              { name: "THE GATES", color: COLORS.alpha, desc: "API gateways, load balancers, auth middleware" },
              { name: "THE PACK", color: COLORS.alpha, desc: "Core services, business logic, workers" },
              { name: "THE BURROW", color: COLORS.moss, desc: "Databases, caches, queues, file storage" },
              { name: "THE WILD", color: COLORS.prey, desc: "External APIs, third-party services, SaaS" },
            ].map((layer) => (
              <div
                key={layer.name}
                className="flex items-center gap-3 p-3 rounded-lg border border-white/10"
                style={{ borderLeftColor: layer.color, borderLeftWidth: 3 }}
              >
                <span className="text-xs font-bold tracking-wider" style={{ color: layer.color }}>{layer.name}</span>
                <span className="text-xs text-[#6B7280]">{layer.desc}</span>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-[#FAF5F0] pt-4">Pack Colors</h2>
          <div className="grid grid-cols-2 gap-2">
            {colorEntries.map((c) => (
              <div key={c.hex} className="flex items-center gap-2 p-2 rounded border border-white/10">
                <div className="w-5 h-5 rounded-sm flex-shrink-0" style={{ background: c.hex }} />
                <div>
                  <p className="text-xs font-medium">{c.name}</p>
                  <p className="text-[10px] text-[#6B7280]">{c.hex} — {c.usage}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-[#FAF5F0] pt-4">Based On</h2>
          <p>
            WolfSight adapts the <strong>C4 Model</strong> by Simon Brown — Context, Container, Component, Code — with
            wolf-themed naming and the WolfPack brand color palette.
          </p>

          <h2 className="text-xl font-bold text-[#FAF5F0] pt-4">This App</h2>
          <p>
            This diagram builder lets you visually create WolfSight-compliant architecture diagrams with drag-and-drop
            nodes, typed arrows, layered territories, and export to PNG or JSON. Built with Next.js, React Flow, and Tailwind CSS.
          </p>
        </section>
      </main>
    </div>
  );
}

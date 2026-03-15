"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { Diagram } from "@/lib/types";

const DiagramEditor = dynamic(() => import("@/components/DiagramEditor"), { ssr: false });

const HOWL = "#7C3AED";
const ALPHA = "#F97316";
const IRONCLAD = "#6B7280";
const FROST = "#3B82F6";
const MOSS = "#16A34A";
const PREY = "#F59E0B";

const wolfpackOrgDiagram: Diagram = {
  title: "WolfPack Business Org",
  description: "Full organizational chart for WolfPack Solutions — AI-native company structure",
  nodes: [
    // ═══════════════════════════════════════════
    // LAYER 1 — THE SURFACE (Leadership)
    // ═══════════════════════════════════════════
    { id: "flame", type: "wolf", position: { x: 340, y: 60 }, data: { label: "Flame (James)", description: "Human Operator, CEO", layer: "surface", wolfNodeType: "person", customColor: HOWL } },
    { id: "assistant", type: "wolf", position: { x: 700, y: 60 }, data: { label: "Assistant", description: "Gemini Flash — daily triage, scheduling", layer: "surface", wolfNodeType: "hexagon" } },
    { id: "wolf", type: "wolf", position: { x: 1060, y: 60 }, data: { label: "Wolf", description: "Opus — Pack Leader, orchestrator", layer: "surface", wolfNodeType: "hexagon" } },
    { id: "external", type: "wolf", position: { x: 1420, y: 60 }, data: { label: "External Services", description: "APIs, SaaS, third-party", layer: "surface", wolfNodeType: "cloud", customColor: PREY } },

    // ═══════════════════════════════════════════
    // LAYER 2 — Core Ops (Department Heads)
    // ═══════════════════════════════════════════

    // --- STRATEGY & OPS ---
    { id: "strategy", type: "wolf", position: { x: 160, y: 320 }, data: { label: "🧠 Strategy & Ops", description: "Agent: Wolf (Opus)", layer: "gates", wolfNodeType: "rectangle", customColor: ALPHA } },
    { id: "strat-boundary", type: "wolf", position: { x: -40, y: 460 }, data: { label: "Strategy Sub-Departments", description: "", layer: "pack", wolfNodeType: "systemBoundary" } },
    { id: "strat-1", type: "wolf", position: { x: 0, y: 500 }, data: { label: "Business Direction & OKRs", description: "", layer: "pack", wolfNodeType: "rectangle", customColor: ALPHA } },
    { id: "strat-2", type: "wolf", position: { x: 220, y: 500 }, data: { label: "Resource Allocation & Budget", description: "", layer: "pack", wolfNodeType: "rectangle", customColor: ALPHA } },
    { id: "strat-3", type: "wolf", position: { x: 0, y: 580 }, data: { label: "Partnership & Deal Eval", description: "", layer: "pack", wolfNodeType: "rectangle", customColor: ALPHA } },
    { id: "strat-4", type: "wolf", position: { x: 220, y: 580 }, data: { label: "Roadmap Planning", description: "", layer: "pack", wolfNodeType: "rectangle", customColor: ALPHA } },

    // --- PRODUCT ---
    { id: "product", type: "wolf", position: { x: 660, y: 320 }, data: { label: "📦 Product", description: "Agent: Atlas (Sonnet)", layer: "gates", wolfNodeType: "rectangle", customColor: ALPHA } },
    { id: "prod-boundary", type: "wolf", position: { x: 460, y: 460 }, data: { label: "Product Sub-Departments", description: "", layer: "pack", wolfNodeType: "systemBoundary" } },
    { id: "prod-1", type: "wolf", position: { x: 500, y: 500 }, data: { label: "Feature Prioritization & Research", description: "", layer: "pack", wolfNodeType: "rectangle", customColor: ALPHA } },
    { id: "prod-2", type: "wolf", position: { x: 720, y: 500 }, data: { label: "UX/UI Design", description: "", layer: "pack", wolfNodeType: "rectangle", customColor: ALPHA } },
    { id: "prod-3", type: "wolf", position: { x: 500, y: 580 }, data: { label: "Product Analytics & Iteration", description: "", layer: "pack", wolfNodeType: "rectangle", customColor: ALPHA } },
    { id: "prod-4", type: "wolf", position: { x: 720, y: 580 }, data: { label: "User Feedback Loop", description: "", layer: "pack", wolfNodeType: "rectangle", customColor: ALPHA } },

    // --- ENGINEERING ---
    { id: "engineering", type: "wolf", position: { x: 1160, y: 320 }, data: { label: "🛠️ Engineering", description: "Agent: Spark (Sonnet)", layer: "gates", wolfNodeType: "rectangle", customColor: ALPHA } },
    { id: "eng-boundary", type: "wolf", position: { x: 960, y: 460 }, data: { label: "Engineering Sub-Departments", description: "", layer: "pack", wolfNodeType: "systemBoundary" } },
    { id: "eng-1", type: "wolf", position: { x: 1000, y: 500 }, data: { label: "Product Development", description: "VibeSniffer, Howl, CRM, WolfSight", layer: "pack", wolfNodeType: "rectangle", customColor: ALPHA } },
    { id: "eng-2", type: "wolf", position: { x: 1260, y: 500 }, data: { label: "Infrastructure & DevOps", description: "CI/CD, Vercel, Cloudflare", layer: "pack", wolfNodeType: "rectangle", customColor: ALPHA } },
    { id: "eng-3", type: "wolf", position: { x: 1000, y: 580 }, data: { label: "Agent Architecture", description: "OpenClaw configs, Howl workflows", layer: "pack", wolfNodeType: "rectangle", customColor: ALPHA } },
    { id: "eng-4", type: "wolf", position: { x: 1260, y: 580 }, data: { label: "API Development", description: "REST, webhooks, integrations", layer: "pack", wolfNodeType: "rectangle", customColor: ALPHA } },

    // ═══════════════════════════════════════════
    // LAYER 3 — Support Ops
    // ═══════════════════════════════════════════

    // --- SECURITY ---
    { id: "security", type: "wolf", position: { x: 160, y: 740 }, data: { label: "🔒 Security", description: "Agent: Cipher (Sonnet)", layer: "burrow", wolfNodeType: "rectangle", customColor: IRONCLAD } },
    { id: "sec-boundary", type: "wolf", position: { x: -40, y: 880 }, data: { label: "Security Sub-Departments", description: "", layer: "wild", wolfNodeType: "systemBoundary" } },
    { id: "sec-1", type: "wolf", position: { x: 0, y: 920 }, data: { label: "Code Audits & Vuln Scanning", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: IRONCLAD } },
    { id: "sec-2", type: "wolf", position: { x: 220, y: 920 }, data: { label: "Access Control & Secrets", description: "1Password", layer: "wild", wolfNodeType: "rectangle", customColor: IRONCLAD } },
    { id: "sec-3", type: "wolf", position: { x: 0, y: 1000 }, data: { label: "Compliance & Risk", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: IRONCLAD } },
    { id: "sec-4", type: "wolf", position: { x: 220, y: 1000 }, data: { label: "Dependency Monitoring", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: IRONCLAD } },

    // --- QA & TESTING ---
    { id: "qa", type: "wolf", position: { x: 660, y: 740 }, data: { label: "🧪 QA & Testing", description: "Agent: Forge (Gemini Flash)", layer: "burrow", wolfNodeType: "rectangle", customColor: IRONCLAD } },
    { id: "qa-boundary", type: "wolf", position: { x: 460, y: 880 }, data: { label: "QA Sub-Departments", description: "", layer: "wild", wolfNodeType: "systemBoundary" } },
    { id: "qa-1", type: "wolf", position: { x: 500, y: 920 }, data: { label: "Product Testing & Bug Tracking", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: IRONCLAD } },
    { id: "qa-2", type: "wolf", position: { x: 720, y: 920 }, data: { label: "User Acceptance Testing", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: IRONCLAD } },
    { id: "qa-3", type: "wolf", position: { x: 500, y: 1000 }, data: { label: "Performance Monitoring", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: IRONCLAD } },
    { id: "qa-4", type: "wolf", position: { x: 720, y: 1000 }, data: { label: "Regression Testing", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: IRONCLAD } },

    // --- RESEARCH & INTELLIGENCE ---
    { id: "research", type: "wolf", position: { x: 1160, y: 740 }, data: { label: "🔍 Research & Intelligence", description: "Agent: Scout (Gemini Pro)", layer: "burrow", wolfNodeType: "rectangle", customColor: IRONCLAD } },
    { id: "res-boundary", type: "wolf", position: { x: 960, y: 880 }, data: { label: "Research Sub-Departments", description: "", layer: "wild", wolfNodeType: "systemBoundary" } },
    { id: "res-1", type: "wolf", position: { x: 1000, y: 920 }, data: { label: "Market Analysis & Competitors", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: IRONCLAD } },
    { id: "res-2", type: "wolf", position: { x: 1260, y: 920 }, data: { label: "Tech Scouting", description: "New tools, frameworks, trends", layer: "wild", wolfNodeType: "rectangle", customColor: IRONCLAD } },
    { id: "res-3", type: "wolf", position: { x: 1000, y: 1000 }, data: { label: "User Feedback Synthesis", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: IRONCLAD } },
    { id: "res-4", type: "wolf", position: { x: 1260, y: 1000 }, data: { label: "Trend Monitoring", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: IRONCLAD } },

    // ═══════════════════════════════════════════
    // LAYER 4 — Growth + Admin
    // ═══════════════════════════════════════════

    // --- MARKETING & GROWTH ---
    { id: "marketing", type: "wolf", position: { x: 60, y: 1160 }, data: { label: "📈 Marketing & Growth", description: "Agent: Scout (Gemini Pro)", layer: "wild", wolfNodeType: "rectangle", customColor: FROST } },
    { id: "mkt-boundary", type: "wolf", position: { x: -120, y: 1300 }, data: { label: "Marketing Sub-Departments", description: "", layer: "wild", wolfNodeType: "systemBoundary" } },
    { id: "mkt-1", type: "wolf", position: { x: -100, y: 1340 }, data: { label: "Content Creation", description: "Bluesky, blog, newsletter", layer: "wild", wolfNodeType: "rectangle", customColor: FROST } },
    { id: "mkt-2", type: "wolf", position: { x: 120, y: 1340 }, data: { label: "SEO & Organic Traffic", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: FROST } },
    { id: "mkt-3", type: "wolf", position: { x: -100, y: 1420 }, data: { label: "Social Media Management", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: FROST } },
    { id: "mkt-4", type: "wolf", position: { x: 120, y: 1420 }, data: { label: "Community Building", description: "Discord", layer: "wild", wolfNodeType: "rectangle", customColor: FROST } },
    { id: "mkt-5", type: "wolf", position: { x: 20, y: 1500 }, data: { label: "Paid Advertising", description: "Future", layer: "wild", wolfNodeType: "rectangle", customColor: FROST } },

    // --- REVENUE & SALES ---
    { id: "revenue", type: "wolf", position: { x: 460, y: 1160 }, data: { label: "💰 Revenue & Sales", description: "Agent: Scout (Gemini Pro)", layer: "wild", wolfNodeType: "rectangle", customColor: FROST } },
    { id: "rev-boundary", type: "wolf", position: { x: 280, y: 1300 }, data: { label: "Revenue Sub-Departments", description: "", layer: "wild", wolfNodeType: "systemBoundary" } },
    { id: "rev-1", type: "wolf", position: { x: 300, y: 1340 }, data: { label: "Gumroad Listings & Optimization", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: FROST } },
    { id: "rev-2", type: "wolf", position: { x: 520, y: 1340 }, data: { label: "Pricing Strategy", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: FROST } },
    { id: "rev-3", type: "wolf", position: { x: 300, y: 1420 }, data: { label: "Conversion Funnels", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: FROST } },
    { id: "rev-4", type: "wolf", position: { x: 520, y: 1420 }, data: { label: "Email Sequences", description: "Buttondown", layer: "wild", wolfNodeType: "rectangle", customColor: FROST } },
    { id: "rev-5", type: "wolf", position: { x: 420, y: 1500 }, data: { label: "Affiliate Program", description: "Future", layer: "wild", wolfNodeType: "rectangle", customColor: FROST } },

    // --- FINANCE & ADMIN ---
    { id: "finance", type: "wolf", position: { x: 860, y: 1160 }, data: { label: "📊 Finance & Admin", description: "Agent: Wolf (Opus)", layer: "wild", wolfNodeType: "rectangle", customColor: MOSS } },
    { id: "fin-boundary", type: "wolf", position: { x: 680, y: 1300 }, data: { label: "Finance Sub-Departments", description: "", layer: "wild", wolfNodeType: "systemBoundary" } },
    { id: "fin-1", type: "wolf", position: { x: 700, y: 1340 }, data: { label: "Revenue Tracking", description: "Gumroad API", layer: "wild", wolfNodeType: "rectangle", customColor: MOSS } },
    { id: "fin-2", type: "wolf", position: { x: 920, y: 1340 }, data: { label: "Expense Management", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: MOSS } },
    { id: "fin-3", type: "wolf", position: { x: 700, y: 1420 }, data: { label: "Stripe/Gumroad Accounting", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: MOSS } },
    { id: "fin-4", type: "wolf", position: { x: 920, y: 1420 }, data: { label: "Legal", description: "Terms, Privacy, Licensing", layer: "wild", wolfNodeType: "rectangle", customColor: MOSS } },

    // --- KNOWLEDGE & DOCS ---
    { id: "knowledge", type: "wolf", position: { x: 1260, y: 1160 }, data: { label: "📚 Knowledge & Docs", description: "Agent: Scout (Gemini Pro)", layer: "wild", wolfNodeType: "rectangle", customColor: MOSS } },
    { id: "kno-boundary", type: "wolf", position: { x: 1080, y: 1300 }, data: { label: "Knowledge Sub-Departments", description: "", layer: "wild", wolfNodeType: "systemBoundary" } },
    { id: "kno-1", type: "wolf", position: { x: 1100, y: 1340 }, data: { label: "Internal Docs & Playbooks", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: MOSS } },
    { id: "kno-2", type: "wolf", position: { x: 1320, y: 1340 }, data: { label: "Customer-Facing Guides", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: MOSS } },
    { id: "kno-3", type: "wolf", position: { x: 1100, y: 1420 }, data: { label: "Onboarding Materials", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: MOSS } },
    { id: "kno-4", type: "wolf", position: { x: 1320, y: 1420 }, data: { label: "SOPs & Process Docs", description: "", layer: "wild", wolfNodeType: "rectangle", customColor: MOSS } },
  ],
  edges: [
    // ═══════════════════════════════════════════
    // Leadership connections
    // ═══════════════════════════════════════════
    { id: "e-flame-assistant", source: "flame", target: "assistant", label: "daily comms", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-flame-wolf", source: "flame", target: "wolf", label: "strategic direction", data: { arrowType: "purple", direction: "forward", routing: "smoothstep" } },
    { id: "e-assistant-wolf", source: "assistant", target: "wolf", label: "triage routing", data: { arrowType: "dashed", direction: "forward", routing: "smoothstep" } },

    // ═══════════════════════════════════════════
    // Wolf → All department heads (orchestration)
    // ═══════════════════════════════════════════
    { id: "e-wolf-strategy", source: "wolf", target: "strategy", label: "", data: { arrowType: "purple", direction: "forward", routing: "smoothstep" } },
    { id: "e-wolf-product", source: "wolf", target: "product", label: "", data: { arrowType: "purple", direction: "forward", routing: "smoothstep" } },
    { id: "e-wolf-engineering", source: "wolf", target: "engineering", label: "", data: { arrowType: "purple", direction: "forward", routing: "smoothstep" } },
    { id: "e-wolf-security", source: "wolf", target: "security", label: "", data: { arrowType: "purple", direction: "forward", routing: "smoothstep" } },
    { id: "e-wolf-qa", source: "wolf", target: "qa", label: "", data: { arrowType: "purple", direction: "forward", routing: "smoothstep" } },
    { id: "e-wolf-research", source: "wolf", target: "research", label: "", data: { arrowType: "purple", direction: "forward", routing: "smoothstep" } },
    { id: "e-wolf-marketing", source: "wolf", target: "marketing", label: "", data: { arrowType: "purple", direction: "forward", routing: "smoothstep" } },
    { id: "e-wolf-revenue", source: "wolf", target: "revenue", label: "", data: { arrowType: "purple", direction: "forward", routing: "smoothstep" } },
    { id: "e-wolf-finance", source: "wolf", target: "finance", label: "", data: { arrowType: "purple", direction: "forward", routing: "smoothstep" } },
    { id: "e-wolf-knowledge", source: "wolf", target: "knowledge", label: "", data: { arrowType: "purple", direction: "forward", routing: "smoothstep" } },

    // ═══════════════════════════════════════════
    // Department head → sub-departments
    // ═══════════════════════════════════════════
    { id: "e-strat-1", source: "strategy", target: "strat-1", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-strat-2", source: "strategy", target: "strat-2", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-strat-3", source: "strategy", target: "strat-3", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-strat-4", source: "strategy", target: "strat-4", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },

    { id: "e-prod-1", source: "product", target: "prod-1", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-prod-2", source: "product", target: "prod-2", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-prod-3", source: "product", target: "prod-3", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-prod-4", source: "product", target: "prod-4", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },

    { id: "e-eng-1", source: "engineering", target: "eng-1", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-eng-2", source: "engineering", target: "eng-2", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-eng-3", source: "engineering", target: "eng-3", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-eng-4", source: "engineering", target: "eng-4", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },

    { id: "e-sec-1", source: "security", target: "sec-1", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-sec-2", source: "security", target: "sec-2", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-sec-3", source: "security", target: "sec-3", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-sec-4", source: "security", target: "sec-4", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },

    { id: "e-qa-1", source: "qa", target: "qa-1", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-qa-2", source: "qa", target: "qa-2", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-qa-3", source: "qa", target: "qa-3", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-qa-4", source: "qa", target: "qa-4", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },

    { id: "e-res-1", source: "research", target: "res-1", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-res-2", source: "research", target: "res-2", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-res-3", source: "research", target: "res-3", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-res-4", source: "research", target: "res-4", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },

    { id: "e-mkt-1", source: "marketing", target: "mkt-1", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-mkt-2", source: "marketing", target: "mkt-2", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-mkt-3", source: "marketing", target: "mkt-3", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-mkt-4", source: "marketing", target: "mkt-4", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-mkt-5", source: "marketing", target: "mkt-5", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },

    { id: "e-rev-1", source: "revenue", target: "rev-1", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-rev-2", source: "revenue", target: "rev-2", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-rev-3", source: "revenue", target: "rev-3", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-rev-4", source: "revenue", target: "rev-4", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-rev-5", source: "revenue", target: "rev-5", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },

    { id: "e-fin-1", source: "finance", target: "fin-1", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-fin-2", source: "finance", target: "fin-2", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-fin-3", source: "finance", target: "fin-3", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-fin-4", source: "finance", target: "fin-4", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },

    { id: "e-kno-1", source: "knowledge", target: "kno-1", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-kno-2", source: "knowledge", target: "kno-2", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-kno-3", source: "knowledge", target: "kno-3", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },
    { id: "e-kno-4", source: "knowledge", target: "kno-4", data: { arrowType: "solid", direction: "forward", routing: "smoothstep" } },

    // ═══════════════════════════════════════════
    // Cross-department connections
    // ═══════════════════════════════════════════
    { id: "e-eng-sec", source: "engineering", target: "security", label: "code review loop", data: { arrowType: "dashed", direction: "bidirectional", routing: "smoothstep" } },
    { id: "e-eng-qa", source: "engineering", target: "qa", label: "test loop", data: { arrowType: "dashed", direction: "bidirectional", routing: "smoothstep" } },
    { id: "e-prod-eng", source: "product", target: "engineering", label: "build loop", data: { arrowType: "solid", direction: "bidirectional", routing: "smoothstep" } },
    { id: "e-mkt-rev", source: "marketing", target: "revenue", label: "funnel loop", data: { arrowType: "solid", direction: "bidirectional", routing: "smoothstep" } },
    { id: "e-res-strat", source: "research", target: "strategy", label: "intel feeds strategy", data: { arrowType: "dashed", direction: "forward", routing: "bezier" } },
    { id: "e-res-prod", source: "research", target: "product", label: "insights feed product", data: { arrowType: "dashed", direction: "forward", routing: "bezier" } },
    { id: "e-fin-strat", source: "finance", target: "strategy", label: "budget feeds planning", data: { arrowType: "dashed", direction: "forward", routing: "bezier" } },
  ],
};

export default function WolfpackOrgPage() {
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      localStorage.setItem("wolfsight-diagram", JSON.stringify(wolfpackOrgDiagram));
      loaded.current = true;
    }
  }, []);

  return <DiagramEditor />;
}

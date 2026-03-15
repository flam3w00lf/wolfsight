import type { Template } from "./types";
import { COLORS } from "./constants";

export const templates: Template[] = [
  {
    id: "empty",
    name: "Empty",
    description: "Start with a blank canvas",
    diagram: { title: "Untitled Diagram", description: "", nodes: [], edges: [] },
  },
  {
    id: "howl-workflow",
    name: "Howl Workflow",
    description: "AI agent workflow with LLM orchestration",
    diagram: {
      title: "Howl Workflow",
      description: "AI agent processing pipeline",
      nodes: [
        { id: "user", type: "wolf", position: { x: 400, y: 40 }, data: { label: "User", description: "End user", layer: "surface", wolfNodeType: "person" } },
        { id: "gateway", type: "wolf", position: { x: 400, y: 240 }, data: { label: "API Gateway", description: "Request router", layer: "gates", wolfNodeType: "roundedRectangle" } },
        { id: "orchestrator", type: "wolf", position: { x: 250, y: 440 }, data: { label: "Orchestrator", description: "Agent coordinator", layer: "pack", wolfNodeType: "rectangle" } },
        { id: "scout", type: "wolf", position: { x: 500, y: 440 }, data: { label: "Scout Agent", description: "AI reasoning agent", layer: "pack", wolfNodeType: "hexagon" } },
        { id: "db", type: "wolf", position: { x: 250, y: 640 }, data: { label: "vector_db", description: "Embeddings store", layer: "burrow", wolfNodeType: "cylinder" } },
        { id: "openai", type: "wolf", position: { x: 500, y: 840 }, data: { label: "OpenAI API", description: "GPT-4 inference", layer: "wild", wolfNodeType: "cloud" } },
      ],
      edges: [
        { id: "e1", source: "user", target: "gateway", label: "HTTPS", data: { arrowType: "solid" } },
        { id: "e2", source: "gateway", target: "orchestrator", label: "gRPC", data: { arrowType: "solid" } },
        { id: "e3", source: "orchestrator", target: "scout", label: "dispatch", data: { arrowType: "purple" } },
        { id: "e4", source: "orchestrator", target: "db", label: "query", data: { arrowType: "solid" } },
        { id: "e5", source: "scout", target: "openai", label: "inference", data: { arrowType: "purple" } },
      ],
    },
  },
  {
    id: "nextjs-supabase",
    name: "Web App (Next.js + Supabase)",
    description: "Full-stack web application architecture",
    diagram: {
      title: "Next.js + Supabase",
      description: "Full-stack web application",
      nodes: [
        { id: "browser", type: "wolf", position: { x: 400, y: 40 }, data: { label: "Browser", description: "Web client", layer: "surface", wolfNodeType: "person" } },
        { id: "nextjs", type: "wolf", position: { x: 400, y: 240 }, data: { label: "Next.js App", description: "SSR + API routes", layer: "gates", wolfNodeType: "roundedRectangle" } },
        { id: "auth", type: "wolf", position: { x: 200, y: 440 }, data: { label: "Auth Service", description: "Supabase Auth", layer: "pack", wolfNodeType: "rectangle" } },
        { id: "api", type: "wolf", position: { x: 600, y: 440 }, data: { label: "API Layer", description: "Business logic", layer: "pack", wolfNodeType: "rectangle" } },
        { id: "postgres", type: "wolf", position: { x: 300, y: 640 }, data: { label: "postgres_db", description: "Supabase PostgreSQL", layer: "burrow", wolfNodeType: "cylinder" } },
        { id: "storage", type: "wolf", position: { x: 550, y: 640 }, data: { label: "file_storage", description: "Supabase Storage", layer: "burrow", wolfNodeType: "cylinder" } },
        { id: "stripe", type: "wolf", position: { x: 400, y: 840 }, data: { label: "Stripe API", description: "Payment processing", layer: "wild", wolfNodeType: "cloud" } },
      ],
      edges: [
        { id: "e1", source: "browser", target: "nextjs", label: "HTTPS", data: { arrowType: "solid" } },
        { id: "e2", source: "nextjs", target: "auth", label: "JWT", data: { arrowType: "double" } },
        { id: "e3", source: "nextjs", target: "api", label: "REST", data: { arrowType: "solid" } },
        { id: "e4", source: "api", target: "postgres", label: "SQL", data: { arrowType: "solid" } },
        { id: "e5", source: "api", target: "storage", label: "S3", data: { arrowType: "dashed" } },
        { id: "e6", source: "api", target: "stripe", label: "REST", data: { arrowType: "dashed" } },
      ],
    },
  },
  {
    id: "microservices",
    name: "Microservices",
    description: "Distributed microservices with message queue",
    diagram: {
      title: "Microservices Architecture",
      description: "Event-driven microservices",
      nodes: [
        { id: "mobile", type: "wolf", position: { x: 200, y: 40 }, data: { label: "Mobile App", description: "iOS/Android", layer: "surface", wolfNodeType: "person" } },
        { id: "web", type: "wolf", position: { x: 500, y: 40 }, data: { label: "Web App", description: "React SPA", layer: "surface", wolfNodeType: "person" } },
        { id: "apigw", type: "wolf", position: { x: 350, y: 240 }, data: { label: "API Gateway", description: "Kong / Nginx", layer: "gates", wolfNodeType: "roundedRectangle" } },
        { id: "users", type: "wolf", position: { x: 150, y: 440 }, data: { label: "User Service", description: "Auth & profiles", layer: "pack", wolfNodeType: "rectangle" } },
        { id: "orders", type: "wolf", position: { x: 350, y: 440 }, data: { label: "Order Service", description: "Order management", layer: "pack", wolfNodeType: "rectangle" } },
        { id: "notify", type: "wolf", position: { x: 550, y: 440 }, data: { label: "Notification Svc", description: "Email & push", layer: "pack", wolfNodeType: "rectangle" } },
        { id: "userdb", type: "wolf", position: { x: 150, y: 640 }, data: { label: "users_db", description: "PostgreSQL", layer: "burrow", wolfNodeType: "cylinder" } },
        { id: "orderdb", type: "wolf", position: { x: 350, y: 640 }, data: { label: "orders_db", description: "PostgreSQL", layer: "burrow", wolfNodeType: "cylinder" } },
        { id: "redis", type: "wolf", position: { x: 550, y: 640 }, data: { label: "cache", description: "Redis", layer: "burrow", wolfNodeType: "cylinder" } },
        { id: "sendgrid", type: "wolf", position: { x: 550, y: 840 }, data: { label: "SendGrid", description: "Email delivery", layer: "wild", wolfNodeType: "cloud" } },
      ],
      edges: [
        { id: "e1", source: "mobile", target: "apigw", label: "HTTPS", data: { arrowType: "solid" } },
        { id: "e2", source: "web", target: "apigw", label: "HTTPS", data: { arrowType: "solid" } },
        { id: "e3", source: "apigw", target: "users", label: "REST", data: { arrowType: "solid" } },
        { id: "e4", source: "apigw", target: "orders", label: "REST", data: { arrowType: "solid" } },
        { id: "e5", source: "orders", target: "notify", label: "event", data: { arrowType: "dashed" } },
        { id: "e6", source: "users", target: "userdb", label: "SQL", data: { arrowType: "solid" } },
        { id: "e7", source: "orders", target: "orderdb", label: "SQL", data: { arrowType: "solid" } },
        { id: "e8", source: "notify", target: "redis", label: "cache", data: { arrowType: "solid" } },
        { id: "e9", source: "notify", target: "sendgrid", label: "REST", data: { arrowType: "dashed" } },
      ],
    },
  },
];

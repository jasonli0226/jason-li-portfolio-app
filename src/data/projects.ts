export type ProjectCategory = 'agentic' | 'aiot' | 'mlops' | 'devtools'

export type Project = {
  title: string
  category: ProjectCategory
  bullets: string[]
  badges: string[]
  github?: string
  award?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title:
      'Clawix: Open-Source Self-Hosted Multi-Agent AI Orchestration Platform',
    category: 'agentic',
    featured: true,
    github: 'https://github.com/ClawixAI/clawix',
    badges: ['TypeScript', 'Docker', 'Multi-Agent', 'RBAC', 'LLM', 'MCP'],
    bullets: [
      'Designed and developed Clawix, an open-source self-hosted multi-agent AI orchestration platform that enables secure execution of agent swarms in isolated Docker containers.',
      'Architected enterprise-grade features including swarm coordination, RBAC, token governance, immutable audit logging, multi-channel integration (Telegram + web dashboard), and pluggable skill registry with approval workflows.',
      'Built core reasoning engine with multi-turn context retention, tool calling, and multi-LLM provider support, delivering a governed, scalable, zero-trust environment for GenAI and Agentic AI use cases.',
    ],
  },
  {
    title:
      'EAI-Powered Psychological Analysis Platform for Video Consultation Sessions',
    category: 'agentic',
    badges: [
      'Next.js',
      'FastAPI',
      'PostgreSQL',
      'MinIO',
      'Whisper',
      'Computer Vision',
      'Health-Tech',
    ],
    bullets: [
      'Architected end-to-end multi-modal AI data pipeline and Agentic AI orchestration platform for healthcare/psychological mentoring: integrated Whisper transcription, computer vision (posture analysis), LLM psychological assessment, speaker diarization, and automated PDF report generation.',
      'Built secure, role-based full-stack architecture (Next.js + FastAPI + PostgreSQL + MinIO + Docker) with governed data flows, supporting healthcare providers and AI-generated insights.',
    ],
  },
  {
    title: 'Sales Data Chatbot for Restaurant Using Catering LLM on Telegram',
    category: 'agentic',
    badges: ['Python', 'LLM', 'Telegram'],
    bullets: [
      'Developed LLM-powered chatbot architecture with real-time sales data ingestion, visualization, and decision-support capabilities via Telegram integration.',
    ],
  },
  {
    title: 'SkillBench: Deterministic Benchmark for AI Agent Error Recovery',
    category: 'agentic',
    badges: ['Go', 'LLM', 'MCP', 'Benchmarking', 'Evaluation'],
    bullets: [
      'Designed the first deterministic benchmark for AI agent error recovery — composite Error Recovery Score (ERS) quantifying fault detection, recovery quality, success, and cascade prevention across multi-step MCP tool interactions.',
      'Added Phase 2 metrics for Strategic Tool Evaluation (STEV) and Cost-Normalized Accuracy (CNA), exposing up to 50x cost variation between LLMs at equivalent task accuracy to drive governance-led model selection for enterprise Agentic AI.',
    ],
  },
  {
    title: 'ctx: AI Context Builder for LLM Coding Assistants',
    category: 'agentic',
    badges: ['Go', 'LLM', 'Static Analysis', 'Developer Tooling'],
    bullets: [
      'Built a CLI that assembles the most relevant codebase context for LLM coding assistants via import analysis, call-graph traversal, and relevance scoring — improving agent output quality while reducing token cost.',
      'Integrated Git diff mode for PR review workflows and multi-format output (text, JSON, tree) for both human and programmatic consumption.',
    ],
  },
  {
    title:
      'Analysis of Industrial Machine Vibration Using Multi-Modal Data Fusion and Transformer',
    category: 'aiot',
    award: 'Best Paper Award – Euro Academic Conference',
    badges: ['PyTorch', 'Transformer', 'EMD', 'GAF', 'IoT'],
    bullets: [
      'Designed and implemented multi-modal data ingestion and fusion architecture using Transformers, Empirical Mode Decomposition, and Gramian Angular Field for predictive maintenance in industrial IoT environments.',
    ],
  },
  {
    title:
      'LUCID: Resolving Attribution Diffusion in Explainable AI for PCA-Reduced Feature Spaces',
    category: 'aiot',
    award: 'HKIE Paper 2026',
    badges: ['XAI', 'SHAP', 'PCA', 'Explainability'],
    bullets: [
      'Developed novel post-hoc XAI method (LUCID) to improve diagnostic precision by 18% in PCA-reduced industrial vibration data, enhancing model governance and explainability.',
    ],
  },
  {
    title: 'logstats-cli: High-Performance Log Analysis for IoT & Edge',
    category: 'aiot',
    badges: ['Go', 'IoT', 'Edge Computing', 'Observability'],
    bullets: [
      'Built a lightweight, low-resource log analysis CLI tailored for IoT devices and edge deployments — multi-format parsing (JSON/Lines/Syslog/CLF), real-time statistics, anomaly detection, and live alerting via webhook, Slack, and Telegram.',
      'Optimized for Raspberry Pi and Mini-PC targets with a minimal-memory mode and IoT-specific presets for device health patterns (battery, temperature, connectivity).',
    ],
  },
  {
    title: 'MLOps Template: Production-Ready ML Lifecycle Reference Architecture',
    category: 'mlops',
    github: 'https://github.com/jasonli0226/mlops-template',
    badges: [
      'MLflow',
      'FastAPI',
      'Great Expectations',
      'Prometheus',
      'Grafana',
      'MinIO',
      'PostgreSQL',
      'GitHub Actions',
    ],
    bullets: [
      'Designed a production-ready MLOps reference architecture implementing the full ML lifecycle: experiment tracking, model registry with staging/production promotion, data validation (Great Expectations, 20+ checks), serving, and monitoring.',
      'Integrated MLflow, FastAPI, Prometheus/Grafana, MinIO, and PostgreSQL into a single Docker Compose stack with GitHub Actions CI/CD — demonstrating enterprise-grade MLOps practices for AI/ML teams.',
    ],
  },
  {
    title: 'ml-pipeline: End-to-End ML CI/CD Orchestration CLI',
    category: 'mlops',
    badges: ['Go', 'MLflow', 'Docker', 'Kubernetes', 'AWS SageMaker', 'CI/CD'],
    bullets: [
      'Built a Go CLI for orchestrating end-to-end ML pipelines with sequential, parallel, and dependency-based execution; multi-framework support (TensorFlow, PyTorch, scikit-learn); and semantic model versioning with Git integration.',
      'Implemented automated deployment to Docker, Kubernetes, AWS SageMaker, and Lambda with MLflow model-registry integration, safe rollback, and YAML-configured reproducible workflows.',
    ],
  },
  {
    title: 'db-weave: Visual PostgreSQL Schema Designer with AI-Assisted DSL',
    category: 'mlops',
    github: 'https://github.com/jasonli0226/db-weave',
    badges: [
      'React 19',
      'NestJS',
      'Prisma',
      'Peggy Parser',
      'ERD',
      'OpenAI',
    ],
    bullets: [
      'Designed a visual PostgreSQL schema design tool with a custom DSL (Peggy parser), interactive ERDs via ELK/Dagre auto-layout, and multi-format export (SQL, JSON, PNG, PDF).',
      'Added AI-assisted schema generation via OpenAI for natural-language design and code generation for Prisma, TypeORM, Sequelize, and GraphQL — accelerating data-architecture iteration.',
    ],
  },
  {
    title: 'depscan: Supply-Chain Vulnerability Scanner',
    category: 'devtools',
    github: 'https://github.com/jasonli0226/depscan',
    badges: ['Go', 'OSV.dev', 'Security', 'Supply Chain'],
    bullets: [
      'Built a Go CLI that scans Go modules, NPM/PNPM packages, and Python (uv.lock) dependencies against the OSV.dev vulnerability database with 0-100 risk scoring and JSON export for CI integration.',
    ],
  },
  {
    title: 'SecretSieve: Git Secret Detection CLI',
    category: 'devtools',
    badges: ['Go', 'Security', 'Supply Chain', 'Pre-commit'],
    bullets: [
      'Built a focused CLI that detects exposed secrets (AWS keys, GitHub tokens, database URLs, API keys) in Git repositories — supports pre-commit, full-history, and commit-range scans, scanning 10k files in under 5 seconds.',
      'Designed for CI with JSON output and configurable exit codes, addressing credential leakage as the #1 entry point for modern supply-chain attacks.',
    ],
  },
  {
    title: 'MarkForge: Web-Based Markdown File Manager for Developers',
    category: 'devtools',
    badges: [
      'React 19',
      'TypeScript',
      'NestJS',
      'Prisma',
      'TipTap',
      'Clerk',
      'AWS S3',
    ],
    bullets: [
      'Built a full-stack Markdown file manager and editor with live preview, syntax highlighting (code blocks, KaTeX, Mermaid), drag-and-drop import/export, auto-save, and explicit versioning with restore.',
      'Architected with React 19 + TanStack Router + Zustand + NestJS + Prisma + Clerk auth + S3 storage — tailored for programmer and data-scientist workflows.',
    ],
  },
]

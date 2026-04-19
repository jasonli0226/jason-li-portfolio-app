export type ProjectCategory = 'agentic' | 'aiot'

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
]

import type { LucideIcon } from 'lucide-react'
import { Cloud, Code2, Shield, Sparkles } from 'lucide-react'

export type SkillCategory = {
  title: string
  icon: LucideIcon
  items: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'AI Data Architecture & GenAI',
    icon: Sparkles,
    items: [
      'Agentic AI & Multi-Agent Orchestration',
      'Autonomous Agents & Reasoning',
      'Tool Integration & MCPs',
      'LLM Applications (RAG, Prompt Engineering)',
      'Chatbots & Model Governance',
      'Generative AI & Transformers',
      'Explainable AI (SHAP, LUCID)',
      'Multi-Modal Data Fusion',
      'Data Ingestion & Preprocessing',
    ],
  },
  {
    title: 'MLOps & Cloud Infrastructure',
    icon: Cloud,
    items: [
      'AWS SageMaker',
      'AWS S3',
      'AWS Lambda',
      'Azure (transferable)',
      'CI/CD Pipelines',
      'Model Deployment & Monitoring',
      'Cost Optimization',
      'Docker',
      'ETL / Data Pipelines',
    ],
  },
  {
    title: 'Data Governance & Enterprise',
    icon: Shield,
    items: [
      'AI Model Governance',
      'RBAC',
      'Token Budgeting',
      'Audit Logging & Compliance',
      'Data Strategy & Roadmaps',
      'Enterprise Architecture Frameworks',
    ],
  },
  {
    title: 'Programming & Tools',
    icon: Code2,
    items: [
      'Python',
      'SQL',
      'TypeScript',
      'Go',
      'PyTorch',
      'TensorFlow',
      'Keras',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Tableau',
      'Power BI',
      'React',
      'Next.js',
      'FastAPI',
    ],
  },
]

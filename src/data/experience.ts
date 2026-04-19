export type Experience = {
  role: string
  company: string
  period: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    role: 'Data Team Lead, Data Scientist',
    company: 'XTRA Sensing Limited',
    period: 'Jan 2024 – Present',
    bullets: [
      'Architected enterprise AI data architecture strategies and scalable MLOps pipelines on AWS for GenAI/AI workloads, processing millions of sensor readings daily; achieved 40% reduction in operational costs while meeting performance SLAs, data quality monitoring, and production scalability requirements.',
      'Designed multi-modal data ingestion and fusion architecture using Transformer-based models for vibration analysis of 16+ high-capacity industrial pumps, collaborating with international teams to enable real-time predictive maintenance for government stakeholders.',
      'Led development of audio-based machine health monitoring solution as a cost-effective alternative to traditional vibration sensors (Gold Medal – International Exhibition of Inventions of Geneva), delivering end-to-end data pipelines in collaboration with overseas teams.',
    ],
  },
  {
    role: 'Deputy General Manager, Data Scientist',
    company: 'Tecky Academy',
    period: 'Jul 2019 – Dec 2023',
    bullets: [
      'Led data team in delivering enterprise AI projects while establishing standardized architecture practices and reporting frameworks, reducing cross-team hand-off time by 30% and improving project delivery efficiency.',
      'Designed and managed AI training programs and course architectures supporting 1,000+ students transitioning into data science and AI roles.',
    ],
  },
  {
    role: 'Business Intelligence Analyst, Programmer',
    company: 'Myndar Co.',
    period: 'Jul 2015 – Jul 2019',
    bullets: [
      'Designed and built data pipelines and visualization architectures for Cold Chain/Healthcare systems, delivering dashboards tracking 50K+ daily readings to support real-time operational decisions in healthcare logistics.',
    ],
  },
]

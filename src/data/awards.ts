export type Award = {
  title: string
  year?: string
}

export type Publication = {
  title: string
  venue: string
  doi?: string
  doiUrl?: string
  note?: string
}

export const awards: Award[] = [
  { title: 'Best Paper Award at NCTA Conference', year: '2024' },
  { title: 'Gold Medal – International Exhibition of Inventions of Geneva', year: '2024' },
  { title: 'Presenter at FCNDT Conference', year: '2024' },
  { title: 'Certified Instructor, NVIDIA Deep Learning Institute (DLI)' },
  { title: 'Recipient of the Academic Performance Award at CUHK', year: '2022' },
  { title: 'Finalist in the Cathay Pacific Hackathon', year: '2017' },
]

export const publications: Publication[] = [
  {
    title:
      'META: Deep Learning Pipeline for Detecting Anomalies on Multimodal Vibration Sewage Treatment Plant Data',
    venue: 'NCTA 2024',
    doi: '10.5220/0013031600003837',
    doiUrl: 'https://doi.org/10.5220/0013031600003837',
    note: 'Best Paper Award',
  },
  {
    title:
      'LUCID: Resolving Attribution Diffusion in Explainable AI for PCA-Reduced Feature Spaces',
    venue: 'HKIE',
  },
]

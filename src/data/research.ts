export type ResearchProject = {
  title: string
  context: string
  description: string
}

export const research: ResearchProject[] = [
  {
    title:
      'Multivariate Time Series Vibration Analysis Using Deep Learning Approaches',
    context: 'Research Project with WPI University, USA',
    description:
      'Led development of LSTM and Transformer architectures for multivariate time series vibration data analysis, improving predictive maintenance and anomaly detection.',
  },
  {
    title: 'Data In-painting for LiDAR Sensing using Deep Learning Approach',
    context: 'MSc, Grade: 3.7/4.0',
    description:
      'Implemented GAN + U-Net architecture for multi-modal sensor data in-painting to enhance LiDAR data quality.',
  },
  {
    title: 'Image Captioning with Deep Learning Approach',
    context: "Bachelor's Final Year Project, Grade: 3.7/4.0",
    description:
      'Developed CNN + RNN/LSTM model with attention mechanism for automated image captioning.',
  },
]

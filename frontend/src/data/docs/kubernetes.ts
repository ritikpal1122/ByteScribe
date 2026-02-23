import type { LanguageConfig } from './types';
import { K8S_PART1_CATEGORIES } from './_kubernetes_part1';
import { K8S_PART2_CATEGORIES } from './_kubernetes_part2';
import { K8S_PART3_CATEGORIES } from './_kubernetes_part3';
import { K8S_PART4_CATEGORIES } from './_kubernetes_part4';
import { K8S_PART5_CATEGORIES } from './_kubernetes_part5';

export const kubernetes: LanguageConfig = {
  id: 'kubernetes',
  label: 'Kubernetes',
  icon: '\u2638\uFE0F',
  color: '#326CE5',
  officialUrl: 'https://kubernetes.io/docs/',
  tagline: 'Production-grade container orchestration',
  categories: [
    ...K8S_PART1_CATEGORIES,   // Getting Started, Core Resources
    ...K8S_PART2_CATEGORIES,   // Configuration, Storage
    ...K8S_PART3_CATEGORIES,   // Networking, Workloads
    ...K8S_PART4_CATEGORIES,   // Scaling & Scheduling, Security
    ...K8S_PART5_CATEGORIES,   // Helm & Package Mgmt, Troubleshooting
  ],
};

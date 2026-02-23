import type { LanguageConfig } from './types';
import { DOCKER_PART1_CATEGORIES } from './_docker_part1';
import { DOCKER_PART2_CATEGORIES } from './_docker_part2';
import { DOCKER_PART3_CATEGORIES } from './_docker_part3';
import { DOCKER_PART4A_CATEGORIES } from './_docker_part4_a';
import { DOCKER_PART4B_CATEGORIES } from './_docker_part4_b';
import { DOCKER_PART4C_CATEGORIES } from './_docker_part4_c';

export const docker: LanguageConfig = {
  id: 'docker',
  label: 'Docker',
  icon: '\u{1F433}',
  color: '#2496ED',
  officialUrl: 'https://docs.docker.com/',
  tagline: 'Build, ship, and run any application anywhere',
  categories: [
    ...DOCKER_PART1_CATEGORIES,   // Getting Started, Images & Dockerfile
    ...DOCKER_PART2_CATEGORIES,   // Container Operations, Networking
    ...DOCKER_PART3_CATEGORIES,   // Storage & Volumes, Docker Compose
    ...DOCKER_PART4A_CATEGORIES,  // Registry & Distribution
    ...DOCKER_PART4B_CATEGORIES,  // Security & Best Practices
    ...DOCKER_PART4C_CATEGORIES,  // Production Patterns
  ],
};

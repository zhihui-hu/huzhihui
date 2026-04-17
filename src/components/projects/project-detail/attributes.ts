import type { Project, ProjectHero } from '@/lib/projects';

export function buildHeroPanel(project: Project): ProjectHero {
  return project.detail.hero;
}

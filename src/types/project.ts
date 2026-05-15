export type ProjectStatus = 'live' | 'in-progress' | 'case-study' | 'archived';

export interface ProjectLinks {
  live: string | null;
  github: string | null;
  caseStudy: string | null;
}

export interface Project {
  id: string;
  title: string;
  category: string[];
  status: ProjectStatus;
  featured: boolean;
  year: number;
  shortDescription: string;
  tags: string[];
  links: ProjectLinks;
  thumbnail: string;
  accentColor: string;
}

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  'live':        '#00FFB3',
  'in-progress': '#FFB347',
  'case-study':  '#A78BFA',
  'archived':    '#6B7280',
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  'live':        '● LIVE',
  'in-progress': '◐ IN PROGRESS',
  'case-study':  '◆ CASE STUDY',
  'archived':    '○ ARCHIVED',
};


export interface Skill {
  title: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  glowColor: string;
  link?: string;
}

export interface Certification {
  title: string;
  provider: string;
  date: string;
  id: string;
}

export interface CertificationCategory {
  category: string;
  items: Certification[];
}

export interface LifeStyle {
  title: string;
  description: string;
  icon: string;
}

export interface ResumeItem {
  title: string;
  subtitle: string;
  location?: string;
  dateRange: string;
  status?: string;
  isRemote?: boolean;
  isCurrent?: boolean;
  bullets: string[];
}

export interface ResumeSection {
  title: string;
  icon: string;
  items: ResumeItem[];
}

// Blog / Newsletter Types
export type BlogTag = 'AI' | 'ML' | 'Data Science' | 'Engineering' | 'Trends' | 'Research' | 'Agents';

export interface BlogResource {
  title: string;
  url: string;
}

export interface BlogQuestion {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
  image: string;
  tags: BlogTag[];
  content: string;
  resources?: BlogResource[];
  questions?: BlogQuestion[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

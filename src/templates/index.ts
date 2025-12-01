import React from 'react';
import type { Portfolio } from '../types';
import MinimalTemplate from './MinimalTemplate';
import ModernTemplate from './ModernTemplate';
import DeveloperTemplate from './DeveloperTemplate';

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'premium';
  component: React.ComponentType<{ portfolio: Portfolio; isPreview?: boolean }>;
  preview: {
    name: string;
    title: string;
    location: string;
    email: string;
    summary: string;
    skills: string[];
    experience: Array<{
      title: string;
      company: string;
      duration: string;
      description: string;
    }>;
  };
}

export const TEMPLATES: Record<string, TemplateConfig> = {
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, text-focused layout',
    category: 'basic',
    component: MinimalTemplate,
    preview: {
      name: 'John Doe',
      title: 'Full Stack Developer',
      location: 'Remote',
      email: 'john@example.com',
      summary: 'Building scalable web applications with modern technologies. Passionate about clean code and user experience.',
      skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
      experience: [
        {
          title: 'Senior Developer',
          company: 'TechCorp',
          duration: '2022 - Present',
          description: 'Lead development of microservices architecture serving 100k+ users.'
        }
      ]
    }
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Bold design with visual hierarchy',
    category: 'basic',
    component: ModernTemplate,
    preview: {
      name: 'Sarah Chen',
      title: 'Product Designer',
      location: 'San Francisco, CA',
      email: 'sarah@example.com',
      summary: 'Creating intuitive user experiences for digital products. Expertise in design systems and user research.',
      skills: ['Figma', 'React', 'TypeScript', 'Design Systems', 'User Research'],
      experience: [
        {
          title: 'Product Designer',
          company: 'StartupXYZ',
          duration: '2021 - Present',
          description: 'Design and prototype user interfaces for mobile and web applications.'
        }
      ]
    }
  },
  developer: {
    id: 'developer',
    name: 'Developer',
    description: 'Code-first terminal aesthetic',
    category: 'basic',
    component: DeveloperTemplate,
    preview: {
      name: 'Alex Kumar',
      title: 'DevOps Engineer',
      location: 'Austin, TX',
      email: 'alex@example.com',
      summary: 'Automating infrastructure and improving deployment pipelines. Love working with cloud technologies.',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'Python', 'CI/CD'],
      experience: [
        {
          title: 'DevOps Engineer',
          company: 'CloudFirst',
          duration: '2020 - Present',
          description: 'Manage cloud infrastructure and deployment pipelines serving 1M+ users.'
        }
      ]
    }
  }
};

export const getTemplate = (templateId: string): TemplateConfig | null => {
  return TEMPLATES[templateId] || null;
};

export const getTemplateComponent = (templateId: string) => {
  const template = getTemplate(templateId);
  return template?.component || MinimalTemplate; // Default to minimal
};

export const getAllTemplates = (): TemplateConfig[] => {
  return Object.values(TEMPLATES);
};

export const getBasicTemplates = (): TemplateConfig[] => {
  return Object.values(TEMPLATES).filter(template => template.category === 'basic');
};

export const getPremiumTemplates = (): TemplateConfig[] => {
  return Object.values(TEMPLATES).filter(template => template.category === 'premium');
};

// Sample portfolio data for previews
export const createSamplePortfolio = (preview: TemplateConfig['preview']): Portfolio => ({
  id: 0,
  userId: 0,
  title: `${preview.name}'s Portfolio`,
  slug: preview.name.toLowerCase().replace(/\s+/g, ''),
  personalInfo: {
    name: preview.name,
    title: preview.title,
    email: preview.email,
    phone: '+1 (555) 123-4567',
    location: preview.location,
    website: `https://${preview.name.toLowerCase().replace(/\s+/g, '')}.dev`,
    github: `github.com/${preview.name.toLowerCase().replace(/\s+/g, '')}`,
    linkedin: `linkedin.com/in/${preview.name.toLowerCase().replace(/\s+/g, '')}`,
    summary: preview.summary
  },
  experience: preview.experience.map(exp => ({
    id: 1,
    title: exp.title,
    company: exp.company,
    duration: exp.duration,
    description: [exp.description]
  })),
  education: [
    {
      id: 1,
      degree: 'Computer Science, B.S.',
      institution: 'Tech University',
      year: '2018'
    }
  ],
  skills: preview.skills,
  projects: [
    {
      id: 1,
      title: 'Project Alpha',
      description: 'A full-stack web application with real-time features and modern architecture.',
      technologies: preview.skills.slice(0, 3),
      link: 'https://github.com/example/project-alpha'
    },
    {
      id: 2,
      title: 'Mobile App Beta',
      description: 'Cross-platform mobile application built with React Native and Node.js backend.',
      technologies: preview.skills.slice(1, 4),
      link: 'https://github.com/example/mobile-beta'
    }
  ],
  isPublic: true,
  viewCount: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export default TEMPLATES;
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
    tagline: string;
    location: string;
    email: string;
    bio: string;
    skills: string[];
    experience: Array<{
      position: string;
      company: string;
      startDate: string;
      endDate: string | null;
      current: boolean;
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
      title: 'John Doe - Full Stack Developer',
      tagline: 'Building the future, one line at a time',
      location: 'Remote',
      email: 'john@example.com',
      bio: 'Building scalable web applications with modern technologies. Passionate about clean code and user experience.',
      skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
      experience: [
        {
          position: 'Senior Developer',
          company: 'TechCorp',
          startDate: '2022-01-01',
          endDate: null,
          current: true,
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
      title: 'Sarah Chen - Product Designer',
      tagline: 'Creating intuitive experiences',
      location: 'San Francisco, CA',
      email: 'sarah@example.com',
      bio: 'Creating intuitive user experiences for digital products. Expertise in design systems and user research.',
      skills: ['Figma', 'React', 'TypeScript', 'Design Systems', 'User Research'],
      experience: [
        {
          position: 'Product Designer',
          company: 'StartupXYZ',
          startDate: '2021-01-01',
          endDate: null,
          current: true,
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
      title: 'Alex Kumar - DevOps Engineer',
      tagline: 'Automating everything',
      location: 'Austin, TX',
      email: 'alex@example.com',
      bio: 'Automating infrastructure and improving deployment pipelines. Love working with cloud technologies.',
      skills: ['AWS', 'Kubernetes', 'Terraform', 'Python', 'CI/CD'],
      experience: [
        {
          position: 'DevOps Engineer',
          company: 'CloudFirst',
          startDate: '2020-01-01',
          endDate: null,
          current: true,
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
  id: 'sample-id',
  userId: 'sample-user-id',
  title: preview.title,
  bio: preview.bio,
  tagline: preview.tagline,
  template: 'minimal',
  contactEmail: preview.email,
  contactPhone: '+1 (555) 123-4567',
  location: preview.location,
  websiteUrl: `https://${preview.name.toLowerCase().replace(/\s+/g, '')}.dev`,
  githubUrl: `https://github.com/${preview.name.toLowerCase().replace(/\s+/g, '')}`,
  linkedinUrl: `https://linkedin.com/in/${preview.name.toLowerCase().replace(/\s+/g, '')}`,
  twitterUrl: null,
  skills: preview.skills,
  isPublished: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  experiences: preview.experience.map((exp, index) => ({
    id: `exp-${index}`,
    portfolioId: 'sample-id',
    company: exp.company,
    position: exp.position,
    description: exp.description,
    location: null,
    current: exp.current,
    order: index,
    startDate: exp.startDate,
    endDate: exp.endDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })),
  education: [
    {
      id: 'edu-1',
      portfolioId: 'sample-id',
      institution: 'Tech University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      description: null,
      order: 0,
      startDate: '2014-09-01',
      endDate: '2018-06-01',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  projects: [
    {
      id: 'proj-1',
      portfolioId: 'sample-id',
      title: 'Project Alpha',
      description: 'A full-stack web application with real-time features and modern architecture.',
      imageUrl: null,
      projectUrl: 'https://project-alpha.example.com',
      githubUrl: 'https://github.com/example/project-alpha',
      technologies: preview.skills.slice(0, 3),
      featured: true,
      order: 0,
      startDate: null,
      endDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'proj-2',
      portfolioId: 'sample-id',
      title: 'Mobile App Beta',
      description: 'Cross-platform mobile application built with React Native and Node.js backend.',
      imageUrl: null,
      projectUrl: 'https://mobile-beta.example.com',
      githubUrl: 'https://github.com/example/mobile-beta',
      technologies: preview.skills.slice(1, 4),
      featured: false,
      order: 1,
      startDate: null,
      endDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
});

export default TEMPLATES;

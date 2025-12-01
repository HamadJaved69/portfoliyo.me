import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, Twitter } from 'lucide-react';
import type { Portfolio } from '../types';

interface TemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

const formatDate = (dateString: string | null): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const MinimalTemplate: React.FC<TemplateProps> = ({ portfolio, isPreview = false }) => {
  const { experiences, education, skills, projects } = portfolio;

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Header */}
      <header className="border-b border-black py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            {portfolio.title || 'My Portfolio'}
          </h1>
          {portfolio.tagline && (
            <p className="text-xl text-gray-700 mb-4">{portfolio.tagline}</p>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 text-sm">
            {portfolio.contactEmail && (
              <a href={`mailto:${portfolio.contactEmail}`} className="flex items-center hover:underline">
                <Mail className="w-4 h-4 mr-2" />
                {portfolio.contactEmail}
              </a>
            )}
            {portfolio.contactPhone && (
              <a href={`tel:${portfolio.contactPhone}`} className="flex items-center hover:underline">
                <Phone className="w-4 h-4 mr-2" />
                {portfolio.contactPhone}
              </a>
            )}
            {portfolio.location && (
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {portfolio.location}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            {portfolio.websiteUrl && (
              <a
                href={portfolio.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <Globe className="w-4 h-4 mr-2" />
                {portfolio.websiteUrl.replace(/^https?:\/\//, '')}
              </a>
            )}
            {portfolio.githubUrl && (
              <a
                href={portfolio.githubUrl.startsWith('http') ? portfolio.githubUrl : `https://${portfolio.githubUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            )}
            {portfolio.linkedinUrl && (
              <a
                href={portfolio.linkedinUrl.startsWith('http') ? portfolio.linkedinUrl : `https://${portfolio.linkedinUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            )}
            {portfolio.twitterUrl && (
              <a
                href={portfolio.twitterUrl.startsWith('http') ? portfolio.twitterUrl : `https://${portfolio.twitterUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* About */}
        {portfolio.bio && (
          <section className="mb-16">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">About</h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl whitespace-pre-line">
              {portfolio.bio}
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 border-black pl-6">
                  <h3 className="text-lg font-bold">{exp.position}</h3>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    {exp.location && ` • ${exp.location}`}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-gray-300 pl-6">
                  <h3 className="font-bold">{edu.degree}{edu.field && ` in ${edu.field}`}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate) || 'Present'}
                  </p>
                  {edu.description && (
                    <p className="text-gray-600 text-sm mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="border border-black px-3 py-1 text-sm bg-white hover:bg-gray-50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="border border-black p-6 bg-white">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:text-gray-600 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:text-gray-600 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 border border-gray-300 px-2 py-1 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-black py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {portfolio.title}
          </p>
          {!isPreview && (
            <p className="text-xs text-gray-400 mt-2">
              Built with <a href="https://portfoliyo.me" className="hover:underline">PortfoliYo</a>
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

export default MinimalTemplate;

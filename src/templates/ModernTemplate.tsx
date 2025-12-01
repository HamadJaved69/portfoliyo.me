import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, ChevronRight, Twitter } from 'lucide-react';
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

const ModernTemplate: React.FC<TemplateProps> = ({ portfolio, isPreview = false }) => {
  const { experiences, education, skills, projects } = portfolio;

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Hero Section */}
      <header className="bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                {portfolio.title || 'My Portfolio'}
              </h1>
              {portfolio.tagline && (
                <p className="text-2xl text-gray-300 mb-6">{portfolio.tagline}</p>
              )}
              {portfolio.bio && (
                <p className="text-lg text-gray-400 leading-relaxed max-w-2xl whitespace-pre-line">
                  {portfolio.bio}
                </p>
              )}
            </div>

            {/* Contact Card */}
            <div className="bg-white bg-opacity-10 border border-white border-opacity-20 p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-300">CONTACT</h3>
              <div className="space-y-3 text-sm">
                {portfolio.contactEmail && (
                  <a href={`mailto:${portfolio.contactEmail}`} className="flex items-center hover:text-gray-300 transition-colors">
                    <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                    {portfolio.contactEmail}
                  </a>
                )}
                {portfolio.contactPhone && (
                  <a href={`tel:${portfolio.contactPhone}`} className="flex items-center hover:text-gray-300 transition-colors">
                    <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                    {portfolio.contactPhone}
                  </a>
                )}
                {portfolio.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                    {portfolio.location}
                  </div>
                )}
                {portfolio.websiteUrl && (
                  <a
                    href={portfolio.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-gray-300 transition-colors"
                  >
                    <Globe className="w-4 h-4 mr-3 flex-shrink-0" />
                    Website
                  </a>
                )}
                {portfolio.githubUrl && (
                  <a
                    href={portfolio.githubUrl.startsWith('http') ? portfolio.githubUrl : `https://${portfolio.githubUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-gray-300 transition-colors"
                  >
                    <Github className="w-4 h-4 mr-3 flex-shrink-0" />
                    GitHub
                  </a>
                )}
                {portfolio.linkedinUrl && (
                  <a
                    href={portfolio.linkedinUrl.startsWith('http') ? portfolio.linkedinUrl : `https://${portfolio.linkedinUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-gray-300 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 mr-3 flex-shrink-0" />
                    LinkedIn
                  </a>
                )}
                {portfolio.twitterUrl && (
                  <a
                    href={portfolio.twitterUrl.startsWith('http') ? portfolio.twitterUrl : `https://${portfolio.twitterUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-gray-300 transition-colors"
                  >
                    <Twitter className="w-4 h-4 mr-3 flex-shrink-0" />
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6">
        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <section className="py-20 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold uppercase tracking-wider sticky top-8">
                  Experience
                </h2>
              </div>
              <div className="lg:col-span-3 space-y-12">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="flex items-start">
                      <ChevronRight className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{exp.position}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <p className="text-lg text-gray-700 font-medium">{exp.company}</p>
                          <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 border border-black inline-block sm:ml-4">
                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                          </p>
                        </div>
                        {exp.description && (
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="py-20 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold uppercase tracking-wider sticky top-8">
                  Skills
                </h2>
              </div>
              <div className="lg:col-span-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-black text-white p-4 text-center font-bold hover:bg-gray-800 transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="py-20 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold uppercase tracking-wider sticky top-8">
                  Projects
                </h2>
              </div>
              <div className="lg:col-span-3 space-y-12">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gray-50 border-l-4 border-black p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white p-2 hover:bg-gray-800 transition-colors"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white p-2 hover:bg-gray-800 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {project.description}
                      </p>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="bg-white border border-black px-3 py-1 text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="py-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold uppercase tracking-wider sticky top-8">
                  Education
                </h2>
              </div>
              <div className="lg:col-span-3 space-y-8">
                {education.map((edu) => (
                  <div key={edu.id} className="border border-black p-6 bg-white">
                    <h3 className="text-xl font-bold mb-2">
                      {edu.degree}{edu.field && ` in ${edu.field}`}
                    </h3>
                    <p className="text-gray-700 text-lg">{edu.institution}</p>
                    <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 inline-block mt-2 border border-gray-300">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate) || 'Present'}
                    </p>
                    {edu.description && (
                      <p className="text-gray-600 mt-3">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg font-bold mb-2">{portfolio.title}</p>
          <p className="text-gray-400">
            © {new Date().getFullYear()} All rights reserved
          </p>
          {!isPreview && (
            <p className="text-xs text-gray-500 mt-4">
              Built with <a href="https://portfoliyo.me" className="hover:text-gray-300">PortfoliYo</a>
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

export default ModernTemplate;

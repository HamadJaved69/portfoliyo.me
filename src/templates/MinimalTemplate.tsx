import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink } from 'lucide-react';
import type { Portfolio } from '../types';

interface TemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

const MinimalTemplate: React.FC<TemplateProps> = ({ portfolio, isPreview = false }) => {
  const { personalInfo, experience, education, skills, projects } = portfolio;

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Header */}
      <header className="border-b border-black py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            {personalInfo.name}
          </h1>
          <p className="text-xl text-gray-700 mb-4">{personalInfo.title}</p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 text-sm">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:underline">
                <Mail className="w-4 h-4 mr-2" />
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <a href={`tel:${personalInfo.phone}`} className="flex items-center hover:underline">
                <Phone className="w-4 h-4 mr-2" />
                {personalInfo.phone}
              </a>
            )}
            {personalInfo.location && (
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {personalInfo.location}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            {personalInfo.website && (
              <a
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <Globe className="w-4 h-4 mr-2" />
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </a>
            )}
            {personalInfo.github && (
              <a
                href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <Github className="w-4 h-4 mr-2" />
                {personalInfo.github.replace(/^https?:\/\//, '')}
              </a>
            )}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                {personalInfo.linkedin.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* About */}
        {personalInfo.summary && (
          <section className="mb-16">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">About</h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-black pl-6">
                  <h3 className="text-lg font-bold">{exp.title}</h3>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-3">{exp.duration}</p>
                  {exp.description && exp.description.length > 0 && (
                    <div className="space-y-2">
                      {exp.description.map((desc, i) => (
                        <p key={i} className="text-gray-700 text-sm leading-relaxed">
                          • {desc}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-gray-300 pl-6">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
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
        {projects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="border border-black p-6 bg-white">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-gray-600 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  {project.technologies.length > 0 && (
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
            © {new Date().getFullYear()} {personalInfo.name}
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
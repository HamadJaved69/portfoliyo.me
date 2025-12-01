import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, ChevronRight } from 'lucide-react';
import type { Portfolio } from '../types';

interface TemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

const ModernTemplate: React.FC<TemplateProps> = ({ portfolio, isPreview = false }) => {
  const { personalInfo, experience, education, skills, projects } = portfolio;

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Hero Section */}
      <header className="bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                {personalInfo.name}
              </h1>
              <p className="text-2xl text-gray-300 mb-6">{personalInfo.title}</p>
              {personalInfo.summary && (
                <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                  {personalInfo.summary}
                </p>
              )}
            </div>

            {/* Contact Card */}
            <div className="bg-white bg-opacity-10 border border-white border-opacity-20 p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-300">CONTACT</h3>
              <div className="space-y-3 text-sm">
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center hover:text-gray-300 transition-colors">
                    <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                    {personalInfo.email}
                  </a>
                )}
                {personalInfo.phone && (
                  <a href={`tel:${personalInfo.phone}`} className="flex items-center hover:text-gray-300 transition-colors">
                    <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                    {personalInfo.phone}
                  </a>
                )}
                {personalInfo.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                    {personalInfo.location}
                  </div>
                )}
                {personalInfo.website && (
                  <a
                    href={personalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-gray-300 transition-colors"
                  >
                    <Globe className="w-4 h-4 mr-3 flex-shrink-0" />
                    {personalInfo.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {personalInfo.github && (
                  <a
                    href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-gray-300 transition-colors"
                  >
                    <Github className="w-4 h-4 mr-3 flex-shrink-0" />
                    {personalInfo.github.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-gray-300 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 mr-3 flex-shrink-0" />
                    {personalInfo.linkedin.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6">
        {/* Experience */}
        {experience.length > 0 && (
          <section className="py-20 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold uppercase tracking-wider sticky top-8">
                  Experience
                </h2>
              </div>
              <div className="lg:col-span-3 space-y-12">
                {experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start">
                      <ChevronRight className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <p className="text-lg text-gray-700 font-medium">{exp.company}</p>
                          <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 border border-black inline-block sm:ml-4">
                            {exp.duration}
                          </p>
                        </div>
                        {exp.description && exp.description.length > 0 && (
                          <div className="space-y-3">
                            {exp.description.map((desc, i) => (
                              <p key={i} className="text-gray-700 leading-relaxed flex items-start">
                                <span className="w-2 h-2 bg-black flex-shrink-0 mt-2 mr-3"></span>
                                {desc}
                              </p>
                            ))}
                          </div>
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
        {skills.length > 0 && (
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
        {projects.length > 0 && (
          <section className="py-20 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold uppercase tracking-wider sticky top-8">
                  Projects
                </h2>
              </div>
              <div className="lg:col-span-3 space-y-12">
                {projects.map((project, index) => (
                  <div key={index} className="bg-gray-50 border-l-4 border-black p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black text-white p-2 hover:bg-gray-800 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {project.description}
                    </p>
                    {project.technologies.length > 0 && (
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
        {education.length > 0 && (
          <section className="py-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold uppercase tracking-wider sticky top-8">
                  Education
                </h2>
              </div>
              <div className="lg:col-span-3 space-y-8">
                {education.map((edu, index) => (
                  <div key={index} className="border border-black p-6 bg-white">
                    <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                    <p className="text-gray-700 text-lg">{edu.institution}</p>
                    <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 inline-block mt-2 border border-gray-300">
                      {edu.year}
                    </p>
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
          <p className="text-lg font-bold mb-2">{personalInfo.name}</p>
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
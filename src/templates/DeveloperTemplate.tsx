import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, Terminal, Code, Folder } from 'lucide-react';
import type { Portfolio } from '../types';

interface TemplateProps {
  portfolio: Portfolio;
  isPreview?: boolean;
}

const DeveloperTemplate: React.FC<TemplateProps> = ({ portfolio, isPreview = false }) => {
  const { personalInfo, experience, education, skills, projects } = portfolio;

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Terminal Header */}
      <div className="bg-gray-900 border-b border-green-400">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-green-300 text-sm">
              {personalInfo.name.toLowerCase().replace(/\s+/g, '')}@portfoliyo:~$
            </span>
          </div>
        </div>
      </div>

      {/* Main Terminal Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Intro */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Terminal className="w-4 h-4 mr-2" />
            <span className="text-green-300">cat about.txt</span>
          </div>
          <div className="ml-6 space-y-2 text-green-400">
            <p className="text-2xl font-bold">{personalInfo.name}</p>
            <p className="text-lg">{personalInfo.title}</p>
            {personalInfo.location && <p>📍 {personalInfo.location}</p>}
            {personalInfo.summary && (
              <p className="text-green-300 mt-4 max-w-3xl leading-relaxed">
                {personalInfo.summary}
              </p>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Terminal className="w-4 h-4 mr-2" />
            <span className="text-green-300">ls -la contact/</span>
          </div>
          <div className="ml-6 space-y-1 text-sm">
            {personalInfo.email && (
              <div className="flex items-center">
                <span className="text-green-600 mr-4">-rw-r--r--</span>
                <Mail className="w-4 h-4 mr-2" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-green-300">
                  {personalInfo.email}
                </a>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <span className="text-green-600 mr-4">-rw-r--r--</span>
                <Phone className="w-4 h-4 mr-2" />
                <a href={`tel:${personalInfo.phone}`} className="hover:text-green-300">
                  {personalInfo.phone}
                </a>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center">
                <span className="text-green-600 mr-4">-rw-r--r--</span>
                <Globe className="w-4 h-4 mr-2" />
                <a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-300"
                >
                  {personalInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center">
                <span className="text-green-600 mr-4">-rw-r--r--</span>
                <Github className="w-4 h-4 mr-2" />
                <a
                  href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-300"
                >
                  {personalInfo.github.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <span className="text-green-600 mr-4">-rw-r--r--</span>
                <Linkedin className="w-4 h-4 mr-2" />
                <a
                  href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-300"
                >
                  {personalInfo.linkedin.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <Terminal className="w-4 h-4 mr-2" />
              <span className="text-green-300">cat skills.json</span>
            </div>
            <div className="ml-6 bg-gray-900 p-4 border border-green-400 rounded">
              <div className="text-green-400">
                <span className="text-green-300">{'{'}</span>
                <div className="ml-4">
                  <span className="text-blue-400">"technologies"</span>
                  <span className="text-green-300">: [</span>
                  <div className="ml-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="text-yellow-400">
                        "{skill}"{index < skills.length - 1 && ','}
                      </span>
                    ))}
                  </div>
                  <span className="text-green-300">]</span>
                </div>
                <span className="text-green-300">{'}'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <Terminal className="w-4 h-4 mr-2" />
              <span className="text-green-300">git log --oneline experience/</span>
            </div>
            <div className="ml-6 space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-green-400 pl-4">
                  <div className="flex items-center mb-2">
                    <Code className="w-4 h-4 mr-2 text-green-300" />
                    <span className="text-yellow-400 text-sm">[{exp.duration}]</span>
                    <span className="text-green-400 font-bold ml-2">{exp.title}</span>
                  </div>
                  <p className="text-green-300 mb-2"># {exp.company}</p>
                  {exp.description && exp.description.length > 0 && (
                    <div className="space-y-1 text-sm">
                      {exp.description.map((desc, i) => (
                        <p key={i} className="text-green-400">
                          + {desc}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <Terminal className="w-4 h-4 mr-2" />
              <span className="text-green-300">ls -la projects/</span>
            </div>
            <div className="ml-6 space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-900 border border-green-400 p-4 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Folder className="w-4 h-4 mr-2 text-blue-400" />
                      <span className="text-green-400 font-bold">{project.title}/</span>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-300 hover:text-green-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="mb-3">
                    <span className="text-green-300"># </span>
                    <span className="text-green-400">{project.description}</span>
                  </div>

                  {project.technologies.length > 0 && (
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-green-300">Dependencies:</span>
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-black border border-green-400 px-2 py-1 text-xs text-yellow-400"
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
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <Terminal className="w-4 h-4 mr-2" />
              <span className="text-green-300">cat education.log</span>
            </div>
            <div className="ml-6 space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-600 mr-4 text-sm">[{edu.year}]</span>
                  <div>
                    <p className="text-green-400 font-bold">{edu.degree}</p>
                    <p className="text-green-300 text-sm">{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-green-400">
          <div className="flex items-center mb-2">
            <Terminal className="w-4 h-4 mr-2" />
            <span className="text-green-300">echo "Thanks for visiting!"</span>
          </div>
          <div className="ml-6">
            <p className="text-green-400">
              © {new Date().getFullYear()} {personalInfo.name} - Built with terminal love
            </p>
            {!isPreview && (
              <p className="text-green-600 text-xs mt-2">
                Powered by <a href="https://portfoliyo.me" className="hover:text-green-400">PortfoliYo</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperTemplate;
import React from 'react';
import { Mail, Phone, Globe, Github, Linkedin, ExternalLink, Terminal, Code, Folder, Twitter } from 'lucide-react';
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

const DeveloperTemplate: React.FC<TemplateProps> = ({ portfolio, isPreview = false }) => {
  const { experiences, education, skills, projects } = portfolio;
  const displayName = portfolio.title?.split(' - ')[0] || portfolio.title || 'Developer';

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
              {displayName.toLowerCase().replace(/\s+/g, '')}@portfoliyo:~$
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
            <p className="text-2xl font-bold">{portfolio.title || 'My Portfolio'}</p>
            {portfolio.tagline && <p className="text-lg">{portfolio.tagline}</p>}
            {portfolio.location && <p>📍 {portfolio.location}</p>}
            {portfolio.bio && (
              <p className="text-green-300 mt-4 max-w-3xl leading-relaxed whitespace-pre-line">
                {portfolio.bio}
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
            {portfolio.contactEmail && (
              <div className="flex items-center">
                <span className="text-green-600 mr-4">-rw-r--r--</span>
                <Mail className="w-4 h-4 mr-2" />
                <a href={`mailto:${portfolio.contactEmail}`} className="hover:text-green-300">
                  {portfolio.contactEmail}
                </a>
              </div>
            )}
            {portfolio.contactPhone && (
              <div className="flex items-center">
                <span className="text-green-600 mr-4">-rw-r--r--</span>
                <Phone className="w-4 h-4 mr-2" />
                <a href={`tel:${portfolio.contactPhone}`} className="hover:text-green-300">
                  {portfolio.contactPhone}
                </a>
              </div>
            )}
            {portfolio.websiteUrl && (
              <div className="flex items-center">
                <span className="text-green-600 mr-4">-rw-r--r--</span>
                <Globe className="w-4 h-4 mr-2" />
                <a
                  href={portfolio.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-300"
                >
                  {portfolio.websiteUrl.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {portfolio.githubUrl && (
              <div className="flex items-center">
                <span className="text-green-600 mr-4">-rw-r--r--</span>
                <Github className="w-4 h-4 mr-2" />
                <a
                  href={portfolio.githubUrl.startsWith('http') ? portfolio.githubUrl : `https://${portfolio.githubUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-300"
                >
                  GitHub
                </a>
              </div>
            )}
            {portfolio.linkedinUrl && (
              <div className="flex items-center">
                <span className="text-green-600 mr-4">-rw-r--r--</span>
                <Linkedin className="w-4 h-4 mr-2" />
                <a
                  href={portfolio.linkedinUrl.startsWith('http') ? portfolio.linkedinUrl : `https://${portfolio.linkedinUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-300"
                >
                  LinkedIn
                </a>
              </div>
            )}
            {portfolio.twitterUrl && (
              <div className="flex items-center">
                <span className="text-green-600 mr-4">-rw-r--r--</span>
                <Twitter className="w-4 h-4 mr-2" />
                <a
                  href={portfolio.twitterUrl.startsWith('http') ? portfolio.twitterUrl : `https://${portfolio.twitterUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-300"
                >
                  Twitter
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <Terminal className="w-4 h-4 mr-2" />
              <span className="text-green-300">cat skills.json</span>
            </div>
            <div className="ml-6 bg-gray-900 p-4 border border-green-400 rounded">
              <pre className="text-green-400">
                <span className="text-green-300">{'{'}</span>{'\n'}
                <span className="text-blue-400">  "technologies"</span>
                <span className="text-green-300">: [</span>{'\n'}
                {skills.map((skill, index) => (
                  <span key={index}>
                    <span className="text-yellow-400">    "{skill}"</span>
                    {index < skills.length - 1 && <span className="text-green-300">,</span>}
                    {'\n'}
                  </span>
                ))}
                <span className="text-green-300">  ]</span>{'\n'}
                <span className="text-green-300">{'}'}</span>
              </pre>
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <Terminal className="w-4 h-4 mr-2" />
              <span className="text-green-300">git log --oneline experience/</span>
            </div>
            <div className="ml-6 space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 border-green-400 pl-4">
                  <div className="flex items-center mb-2">
                    <Code className="w-4 h-4 mr-2 text-green-300" />
                    <span className="text-yellow-400 text-sm">
                      [{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}]
                    </span>
                    <span className="text-green-400 font-bold ml-2">{exp.position}</span>
                  </div>
                  <p className="text-green-300 mb-2"># {exp.company}{exp.location && ` • ${exp.location}`}</p>
                  {exp.description && (
                    <p className="text-green-400 text-sm whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <Terminal className="w-4 h-4 mr-2" />
              <span className="text-green-300">ls -la projects/</span>
            </div>
            <div className="ml-6 space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-900 border border-green-400 p-4 rounded">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Folder className="w-4 h-4 mr-2 text-blue-400" />
                      <span className="text-green-400 font-bold">{project.title}/</span>
                      {project.featured && (
                        <span className="ml-2 text-yellow-400 text-xs">★ featured</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-300 hover:text-green-400 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-300 hover:text-green-400 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {project.description && (
                    <div className="mb-3">
                      <span className="text-green-300"># </span>
                      <span className="text-green-400">{project.description}</span>
                    </div>
                  )}

                  {project.technologies && project.technologies.length > 0 && (
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
        {education && education.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <Terminal className="w-4 h-4 mr-2" />
              <span className="text-green-300">cat education.log</span>
            </div>
            <div className="ml-6 space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-start">
                  <span className="text-green-600 mr-4 text-sm">
                    [{formatDate(edu.startDate)} - {formatDate(edu.endDate) || 'Present'}]
                  </span>
                  <div>
                    <p className="text-green-400 font-bold">
                      {edu.degree}{edu.field && ` in ${edu.field}`}
                    </p>
                    <p className="text-green-300 text-sm">{edu.institution}</p>
                    {edu.description && (
                      <p className="text-green-500 text-sm mt-1">{edu.description}</p>
                    )}
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
              © {new Date().getFullYear()} {portfolio.title} - Built with terminal love
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

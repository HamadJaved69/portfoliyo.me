import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, User, Eye, Share2, ExternalLink, Twitter } from 'lucide-react';
import type { Portfolio } from '../../types';

interface PortfolioTemplateProps {
  data: Portfolio;
  username: string;
}

const formatDate = (dateString: string | null): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const PortfolioTemplate = ({ data, username }: PortfolioTemplateProps) => {
  const { experiences, education, skills, projects } = data;

  const handleShare = async () => {
    const url = `${window.location.origin}/@${username}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.title} - Portfolio`,
          text: data.bio || '',
          url: url,
        });
      } catch {
        navigator.clipboard.writeText(url);
      }
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PortfoliYo</span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center text-sm text-gray-500">
                <Eye className="w-4 h-4 mr-1" />
                <span className="font-mono">portfoliyo.me/@{username}</span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
            {/* Profile Image/Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Personal Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold mb-3">{data.title || 'My Portfolio'}</h1>
              {data.tagline && (
                <h2 className="text-2xl text-blue-100 mb-4">{data.tagline}</h2>
              )}

              {data.location && (
                <div className="flex items-center justify-center md:justify-start space-x-2 text-blue-100 mb-6">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{data.location}</span>
                </div>
              )}

              {data.bio && (
                <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl whitespace-pre-line">
                  {data.bio}
                </p>
              )}

              {/* Contact Links */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {data.contactEmail && (
                  <a
                    href={`mailto:${data.contactEmail}`}
                    className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{data.contactEmail}</span>
                  </a>
                )}

                {data.contactPhone && (
                  <a
                    href={`tel:${data.contactPhone}`}
                    className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{data.contactPhone}</span>
                  </a>
                )}

                {data.websiteUrl && (
                  <a
                    href={data.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                    <span>Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {data.linkedinUrl && (
                  <a
                    href={data.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {data.githubUrl && (
                  <a
                    href={data.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {data.twitterUrl && (
                  <a
                    href={data.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    <span>Twitter</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Experience & Education */}
          <div className="lg:col-span-2 space-y-12">
            {/* Experience */}
            {experiences && experiences.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-blue-100">
                  Experience
                </h2>
                <div className="space-y-8">
                  {experiences.map((job, index) => (
                    <div key={job.id} className="relative pl-8 pb-8">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                      {/* Timeline line */}
                      {index < experiences.length - 1 && (
                        <div className="absolute left-2 top-4 w-0.5 h-16 bg-blue-200"></div>
                      )}

                      <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{job.position}</h3>
                        <p className="text-lg text-blue-600 font-semibold mb-2">{job.company}</p>
                        <p className="text-gray-500 mb-4">
                          {formatDate(job.startDate)} - {job.current ? 'Present' : formatDate(job.endDate)}
                          {job.location && ` • ${job.location}`}
                        </p>
                        {job.description && (
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {job.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-blue-100">
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-white p-6 rounded-lg shadow-sm border">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {edu.degree}{edu.field && ` in ${edu.field}`}
                      </h3>
                      <p className="text-lg text-blue-600 font-semibold mb-1">{edu.institution}</p>
                      <p className="text-gray-500">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate) || 'Present'}
                      </p>
                      {edu.description && (
                        <p className="text-gray-600 mt-2">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Skills & Projects */}
          <div className="space-y-12">
            {/* Skills */}
            {skills && skills.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-blue-100">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-blue-100">
                  Projects
                </h2>
                <div className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 ml-2"
                            >
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                          {project.projectUrl && (
                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 ml-2"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {project.description && (
                        <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                      )}

                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
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
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              This portfolio was created with{' '}
              <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
                PortfoliYo
              </Link>
            </p>
            <p className="text-sm text-gray-500">
              Want to create your own portfolio?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up for free →
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioTemplate;

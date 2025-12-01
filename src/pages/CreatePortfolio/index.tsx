import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Plus, Trash2, Save, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { apiClient } from '../../lib/api';
import { API_ENDPOINTS } from '../../config/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { TEMPLATES } from '../../templates';
import type {
  Portfolio,
  CreatePortfolioData,
  CreateProjectData,
  CreateExperienceData,
  CreateEducationData,
  TemplateId,
} from '../../types';

interface LocalExperience {
  id?: string;
  company: string;
  position: string;
  description: string;
  location: string;
  current: boolean;
  startDate: string;
  endDate: string;
}

interface LocalEducation {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface LocalProject {
  id?: string;
  title: string;
  description: string;
  projectUrl: string;
  githubUrl: string;
  technologies: string[];
  featured: boolean;
}

const CreatePortfolio = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Portfolio basic info
  const [portfolioData, setPortfolioData] = useState<CreatePortfolioData>({
    title: '',
    bio: '',
    tagline: '',
    template: 'minimal',
    contactEmail: user?.email || '',
    contactPhone: '',
    location: '',
    websiteUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    twitterUrl: '',
    skills: [],
  });

  // Local state for nested items (to be saved separately)
  const [experiences, setExperiences] = useState<LocalExperience[]>([]);
  const [education, setEducation] = useState<LocalEducation[]>([]);
  const [projects, setProjects] = useState<LocalProject[]>([]);

  const [newSkill, setNewSkill] = useState('');

  // Load existing portfolio if it exists
  useEffect(() => {
    loadExistingPortfolio();
  }, []);

  const loadExistingPortfolio = async () => {
    try {
      const response = await apiClient.get<{ portfolio: Portfolio }>(
        API_ENDPOINTS.PORTFOLIO.ME
      );
      if (response.success && response.data?.portfolio) {
        const p = response.data.portfolio;
        setIsEditing(true);
        setPortfolioData({
          title: p.title || '',
          bio: p.bio || '',
          tagline: p.tagline || '',
          template: p.template || 'minimal',
          contactEmail: p.contactEmail || '',
          contactPhone: p.contactPhone || '',
          location: p.location || '',
          websiteUrl: p.websiteUrl || '',
          linkedinUrl: p.linkedinUrl || '',
          githubUrl: p.githubUrl || '',
          twitterUrl: p.twitterUrl || '',
          skills: p.skills || [],
        });

        // Map experiences
        setExperiences(
          (p.experiences || []).map((exp) => ({
            id: exp.id,
            company: exp.company,
            position: exp.position,
            description: exp.description || '',
            location: exp.location || '',
            current: exp.current,
            startDate: exp.startDate ? exp.startDate.split('T')[0] : '',
            endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
          }))
        );

        // Map education
        setEducation(
          (p.education || []).map((edu) => ({
            id: edu.id,
            institution: edu.institution,
            degree: edu.degree,
            field: edu.field || '',
            description: edu.description || '',
            startDate: edu.startDate ? edu.startDate.split('T')[0] : '',
            endDate: edu.endDate ? edu.endDate.split('T')[0] : '',
          }))
        );

        // Map projects
        setProjects(
          (p.projects || []).map((proj) => ({
            id: proj.id,
            title: proj.title,
            description: proj.description || '',
            projectUrl: proj.projectUrl || '',
            githubUrl: proj.githubUrl || '',
            technologies: proj.technologies || [],
            featured: proj.featured,
          }))
        );
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const updatePortfolioField = (field: keyof CreatePortfolioData, value: string | string[]) => {
    setPortfolioData((prev) => ({ ...prev, [field]: value }));
  };

  // Experience handlers
  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        company: '',
        position: '',
        description: '',
        location: '',
        current: false,
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const updateExperience = (index: number, field: keyof LocalExperience, value: string | boolean) => {
    setExperiences((prev) =>
      prev.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp))
    );
  };

  const removeExperience = async (index: number) => {
    const exp = experiences[index];
    if (exp.id) {
      try {
        await apiClient.delete(API_ENDPOINTS.EXPERIENCES.DELETE(exp.id));
      } catch (error) {
        console.error('Failed to delete experience:', error);
      }
    }
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  // Education handlers
  const addEducation = () => {
    setEducation((prev) => [
      ...prev,
      {
        institution: '',
        degree: '',
        field: '',
        description: '',
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const updateEducation = (index: number, field: keyof LocalEducation, value: string) => {
    setEducation((prev) =>
      prev.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = async (index: number) => {
    const edu = education[index];
    if (edu.id) {
      try {
        await apiClient.delete(API_ENDPOINTS.EDUCATION.DELETE(edu.id));
      } catch (error) {
        console.error('Failed to delete education:', error);
      }
    }
    setEducation((prev) => prev.filter((_, i) => i !== index));
  };

  // Project handlers
  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        title: '',
        description: '',
        projectUrl: '',
        githubUrl: '',
        technologies: [],
        featured: false,
      },
    ]);
  };

  const updateProject = (index: number, field: keyof LocalProject, value: string | string[] | boolean) => {
    setProjects((prev) =>
      prev.map((proj, i) => (i === index ? { ...proj, [field]: value } : proj))
    );
  };

  const updateProjectTechnologies = (index: number, techString: string) => {
    const technologies = techString
      .split(',')
      .map((tech) => tech.trim())
      .filter((tech) => tech);
    updateProject(index, 'technologies', technologies);
  };

  const removeProject = async (index: number) => {
    const proj = projects[index];
    if (proj.id) {
      try {
        await apiClient.delete(API_ENDPOINTS.PROJECTS.DELETE(proj.id));
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  // Skills handlers
  const addSkill = () => {
    if (newSkill.trim() && !portfolioData.skills?.includes(newSkill.trim())) {
      setPortfolioData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!portfolioData.title?.trim()) {
      showError('Validation Error', 'Portfolio title is required');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create or update portfolio
      let portfolioResponse;
      if (isEditing) {
        portfolioResponse = await apiClient.put<{ portfolio: Portfolio }>(
          API_ENDPOINTS.PORTFOLIO.UPDATE,
          portfolioData
        );
      } else {
        portfolioResponse = await apiClient.post<{ portfolio: Portfolio }>(
          API_ENDPOINTS.PORTFOLIO.CREATE,
          portfolioData
        );
      }

      if (!portfolioResponse.success) {
        throw new Error(portfolioResponse.error || 'Failed to save portfolio');
      }

      // Step 2: Save experiences
      for (const exp of experiences) {
        if (!exp.company || !exp.position || !exp.startDate) continue;

        const expData: CreateExperienceData = {
          company: exp.company,
          position: exp.position,
          description: exp.description || undefined,
          location: exp.location || undefined,
          current: exp.current,
          startDate: exp.startDate,
          endDate: exp.current ? undefined : exp.endDate || undefined,
        };

        if (exp.id) {
          await apiClient.put(API_ENDPOINTS.EXPERIENCES.UPDATE(exp.id), expData);
        } else {
          await apiClient.post(API_ENDPOINTS.EXPERIENCES.CREATE, expData);
        }
      }

      // Step 3: Save education
      for (const edu of education) {
        if (!edu.institution || !edu.degree || !edu.startDate) continue;

        const eduData: CreateEducationData = {
          institution: edu.institution,
          degree: edu.degree,
          field: edu.field || undefined,
          description: edu.description || undefined,
          startDate: edu.startDate,
          endDate: edu.endDate || undefined,
        };

        if (edu.id) {
          await apiClient.put(API_ENDPOINTS.EDUCATION.UPDATE(edu.id), eduData);
        } else {
          await apiClient.post(API_ENDPOINTS.EDUCATION.CREATE, eduData);
        }
      }

      // Step 4: Save projects
      for (const proj of projects) {
        if (!proj.title) continue;

        const projData: CreateProjectData = {
          title: proj.title,
          description: proj.description || undefined,
          projectUrl: proj.projectUrl || undefined,
          githubUrl: proj.githubUrl || undefined,
          technologies: proj.technologies,
          featured: proj.featured,
        };

        if (proj.id) {
          await apiClient.put(API_ENDPOINTS.PROJECTS.UPDATE(proj.id), projData);
        } else {
          await apiClient.post(API_ENDPOINTS.PROJECTS.CREATE, projData);
        }
      }

      showSuccess(
        isEditing ? 'Portfolio Updated!' : 'Portfolio Created!',
        'Your portfolio has been saved successfully.'
      );
      navigate('/dashboard');
    } catch (error) {
      console.error('Save portfolio error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save portfolio';
      showError('Save Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-mono">
      {/* Header */}
      <div className="border-b border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-black border border-black flex items-center justify-center">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {isEditing ? 'EDIT PORTFOLIO' : 'CREATE PORTFOLIO'}
                </h1>
                <p className="text-sm text-gray-600">Fill in your information below</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="border-black hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                loading={loading}
                className="bg-black text-white hover:bg-gray-800"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? 'UPDATE' : 'SAVE'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Template Selection */}
        <section className="border border-black p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">CHOOSE TEMPLATE</h2>
          <p className="text-sm text-gray-600 mb-6">Select how your portfolio will look</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(TEMPLATES).map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => updatePortfolioField('template', template.id as TemplateId)}
                className={`text-left p-4 border-2 transition-all ${
                  portfolioData.template === template.id
                    ? 'border-black bg-gray-50'
                    : 'border-gray-300 hover:border-black'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold">{template.name.toUpperCase()}</h3>
                  {portfolioData.template === template.id && (
                    <Check className="w-5 h-5 text-black" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{template.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Basic Information */}
        <section className="border border-black p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">BASIC INFORMATION</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="PORTFOLIO TITLE *"
              value={portfolioData.title || ''}
              onChange={(e) => updatePortfolioField('title', e.target.value)}
              placeholder="e.g., John Doe - Full Stack Developer"
              required
            />

            <Input
              label="TAGLINE"
              value={portfolioData.tagline || ''}
              onChange={(e) => updatePortfolioField('tagline', e.target.value)}
              placeholder="Building the future, one line at a time"
            />

            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-2">BIO</label>
              <textarea
                value={portfolioData.bio || ''}
                onChange={(e) => updatePortfolioField('bio', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-black focus:ring-2 focus:ring-black focus:border-black font-mono"
                placeholder="Tell your story - your background, passion, and what drives you"
              />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="border border-black p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">CONTACT INFORMATION</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="email"
              label="CONTACT EMAIL"
              value={portfolioData.contactEmail || ''}
              onChange={(e) => updatePortfolioField('contactEmail', e.target.value)}
              placeholder="your.email@example.com"
            />

            <Input
              type="tel"
              label="PHONE"
              value={portfolioData.contactPhone || ''}
              onChange={(e) => updatePortfolioField('contactPhone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />

            <Input
              label="LOCATION"
              value={portfolioData.location || ''}
              onChange={(e) => updatePortfolioField('location', e.target.value)}
              placeholder="San Francisco, CA"
            />

            <Input
              type="url"
              label="WEBSITE"
              value={portfolioData.websiteUrl || ''}
              onChange={(e) => updatePortfolioField('websiteUrl', e.target.value)}
              placeholder="https://yourwebsite.com"
            />

            <Input
              type="url"
              label="GITHUB"
              value={portfolioData.githubUrl || ''}
              onChange={(e) => updatePortfolioField('githubUrl', e.target.value)}
              placeholder="https://github.com/username"
            />

            <Input
              type="url"
              label="LINKEDIN"
              value={portfolioData.linkedinUrl || ''}
              onChange={(e) => updatePortfolioField('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />

            <Input
              type="url"
              label="TWITTER"
              value={portfolioData.twitterUrl || ''}
              onChange={(e) => updatePortfolioField('twitterUrl', e.target.value)}
              placeholder="https://twitter.com/username"
            />
          </div>
        </section>

        {/* Skills */}
        <section className="border border-black p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">SKILLS</h2>

          <div className="flex space-x-2 mb-4">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              placeholder="Add a skill (press Enter)"
              className="flex-1"
            />
            <Button
              onClick={addSkill}
              disabled={!newSkill.trim()}
              className="bg-black text-white hover:bg-gray-800"
            >
              ADD
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {(portfolioData.skills || []).map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-gray-100 border border-black text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="ml-2 hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
            {(portfolioData.skills || []).length === 0 && (
              <p className="text-gray-500 text-sm">No skills added yet.</p>
            )}
          </div>
        </section>

        {/* Experience */}
        <section className="border border-black p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">EXPERIENCE</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={addExperience}
              className="border-black hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              ADD EXPERIENCE
            </Button>
          </div>

          {experiences.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No experience added yet. Click "ADD EXPERIENCE" to get started.</p>
            </div>
          ) : (
            experiences.map((exp, index) => (
              <div key={index} className="border border-black p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold">EXPERIENCE {index + 1}</h3>
                  <button
                    onClick={() => removeExperience(index)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="COMPANY *"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    placeholder="Company name"
                  />

                  <Input
                    label="POSITION *"
                    value={exp.position}
                    onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    placeholder="e.g., Senior Developer"
                  />

                  <Input
                    label="LOCATION"
                    value={exp.location}
                    onChange={(e) => updateExperience(index, 'location', e.target.value)}
                    placeholder="City, State"
                  />

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`current-${index}`}
                      checked={exp.current}
                      onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                      className="h-4 w-4 border-black"
                    />
                    <label htmlFor={`current-${index}`} className="ml-2 text-sm font-bold">
                      CURRENT POSITION
                    </label>
                  </div>

                  <Input
                    type="date"
                    label="START DATE *"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                  />

                  {!exp.current && (
                    <Input
                      type="date"
                      label="END DATE"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">DESCRIPTION</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-black focus:ring-2 focus:ring-black focus:border-black font-mono"
                    placeholder="Describe your role and achievements"
                  />
                </div>
              </div>
            ))
          )}
        </section>

        {/* Education */}
        <section className="border border-black p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">EDUCATION</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={addEducation}
              className="border-black hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              ADD EDUCATION
            </Button>
          </div>

          {education.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No education added yet.</p>
            </div>
          ) : (
            education.map((edu, index) => (
              <div key={index} className="border border-black p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold">EDUCATION {index + 1}</h3>
                  <button
                    onClick={() => removeEducation(index)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="INSTITUTION *"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    placeholder="University name"
                  />

                  <Input
                    label="DEGREE *"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    placeholder="e.g., Bachelor of Science"
                  />

                  <Input
                    label="FIELD OF STUDY"
                    value={edu.field}
                    onChange={(e) => updateEducation(index, 'field', e.target.value)}
                    placeholder="e.g., Computer Science"
                  />

                  <Input
                    type="date"
                    label="START DATE *"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                  />

                  <Input
                    type="date"
                    label="END DATE"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-bold mb-2">DESCRIPTION</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-black focus:ring-2 focus:ring-black focus:border-black font-mono"
                    placeholder="Additional details about your education"
                  />
                </div>
              </div>
            ))
          )}
        </section>

        {/* Projects */}
        <section className="border border-black p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">PROJECTS</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={addProject}
              className="border-black hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              ADD PROJECT
            </Button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No projects added yet. Showcase your best work!</p>
            </div>
          ) : (
            projects.map((project, index) => (
              <div key={index} className="border border-black p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold">PROJECT {index + 1}</h3>
                  <button
                    onClick={() => removeProject(index)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="PROJECT TITLE *"
                      value={project.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                      placeholder="Project name"
                    />

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`featured-${index}`}
                        checked={project.featured}
                        onChange={(e) => updateProject(index, 'featured', e.target.checked)}
                        className="h-4 w-4 border-black"
                      />
                      <label htmlFor={`featured-${index}`} className="ml-2 text-sm font-bold">
                        FEATURED PROJECT
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">DESCRIPTION</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-black focus:ring-2 focus:ring-black focus:border-black font-mono"
                      placeholder="Describe what this project does"
                    />
                  </div>

                  <Input
                    label="TECHNOLOGIES"
                    value={project.technologies.join(', ')}
                    onChange={(e) => updateProjectTechnologies(index, e.target.value)}
                    placeholder="React, Node.js, PostgreSQL (comma separated)"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="url"
                      label="PROJECT URL"
                      value={project.projectUrl}
                      onChange={(e) => updateProject(index, 'projectUrl', e.target.value)}
                      placeholder="https://myproject.com"
                    />

                    <Input
                      type="url"
                      label="GITHUB URL"
                      value={project.githubUrl}
                      onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                      placeholder="https://github.com/user/repo"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="border-black hover:bg-gray-50"
          >
            CANCEL
          </Button>
          <Button
            size="lg"
            onClick={handleSave}
            loading={loading}
            className="bg-black text-white hover:bg-gray-800"
          >
            <Save className="w-5 h-5 mr-2" />
            {isEditing ? 'UPDATE PORTFOLIO' : 'SAVE PORTFOLIO'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePortfolio;

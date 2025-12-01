import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, Plus, Trash2, Eye, Save, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { apiClient } from '../../lib/api';
import { API_ENDPOINTS } from '../../config/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import TemplateSelector from '../../components/portfolio/TemplateSelector';
import { getTemplateComponent, createSamplePortfolio, TEMPLATES } from '../../templates';
import type { Portfolio, CreatePortfolioData } from '../../types';

const CreatePortfolio = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();

  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [portfolioId, setPortfolioId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');

  const [portfolioData, setPortfolioData] = useState<CreatePortfolioData>({
    title: 'My Portfolio',
    templateId: 'minimal',
    personalInfo: {
      name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username || '',
      title: '',
      email: user?.email || '',
      phone: '',
      location: '',
      website: '',
      github: '',
      linkedin: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    isPublic: true
  });

  const [newSkill, setNewSkill] = useState('');

  // Load existing portfolio if it exists
  useEffect(() => {
    loadExistingPortfolio();
  }, []);

  const loadExistingPortfolio = async () => {
    try {
      const response = await apiClient.get<Portfolio>(API_ENDPOINTS.PORTFOLIOS.MY_PORTFOLIO);
      if (response.success && response.data) {
        const portfolio = response.data;
        setIsEditing(true);
        setPortfolioId(portfolio.id!);
        setPortfolioData({
          title: portfolio.title,
          templateId: portfolio.templateId || 'minimal',
          personalInfo: portfolio.personalInfo,
          experience: portfolio.experience,
          education: portfolio.education,
          skills: portfolio.skills,
          projects: portfolio.projects,
          isPublic: portfolio.isPublic,
        });
        setSelectedTemplate(portfolio.templateId || 'minimal');
        setCurrentStep(2); // Skip template selection if editing
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
      // It's okay if no portfolio exists yet
    } finally {
      setInitialLoading(false);
    }
  };

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setPortfolioData(prev => ({ ...prev, templateId }));
  };

  const handleNextStep = () => {
    setCurrentStep(2);
  };

  const handleBackToTemplates = () => {
    setCurrentStep(1);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    setPortfolioData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        title: '',
        company: '',
        duration: '',
        description: ['']
      }]
    }));
  };

  const updateExperience = (index: number, field: string, value: string | string[]) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (index: number) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addExperienceDescription = (expIndex: number) => {
    const updatedExperience = [...portfolioData.experience];
    updatedExperience[expIndex].description.push('');
    setPortfolioData(prev => ({
      ...prev,
      experience: updatedExperience
    }));
  };

  const updateExperienceDescription = (expIndex: number, descIndex: number, value: string) => {
    const updatedExperience = [...portfolioData.experience];
    updatedExperience[expIndex].description[descIndex] = value;
    setPortfolioData(prev => ({
      ...prev,
      experience: updatedExperience
    }));
  };

  const removeExperienceDescription = (expIndex: number, descIndex: number) => {
    const updatedExperience = [...portfolioData.experience];
    updatedExperience[expIndex].description = updatedExperience[expIndex].description.filter((_, i) => i !== descIndex);
    setPortfolioData(prev => ({
      ...prev,
      experience: updatedExperience
    }));
  };

  const addEducation = () => {
    setPortfolioData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: '',
        institution: '',
        year: ''
      }]
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index: number) => {
    setPortfolioData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !portfolioData.skills.includes(newSkill.trim())) {
      setPortfolioData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        title: '',
        description: '',
        technologies: [],
        link: ''
      }]
    }));
  };

  const updateProject = (index: number, field: string, value: string | string[]) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) =>
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (index: number) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const updateProjectTechnologies = (projectIndex: number, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech);
    updateProject(projectIndex, 'technologies', technologies);
  };

  const handleSave = async () => {
    // Basic validation
    if (!portfolioData.personalInfo.name.trim()) {
      showError('Validation Error', 'Name is required');
      return;
    }
    if (!portfolioData.personalInfo.title.trim()) {
      showError('Validation Error', 'Professional title is required');
      return;
    }
    if (!portfolioData.personalInfo.email.trim()) {
      showError('Validation Error', 'Email is required');
      return;
    }

    setLoading(true);

    try {
      let response;
      if (isEditing && portfolioId) {
        response = await apiClient.put<Portfolio>(
          API_ENDPOINTS.PORTFOLIOS.UPDATE(portfolioId),
          portfolioData
        );
      } else {
        response = await apiClient.post<Portfolio>(
          API_ENDPOINTS.PORTFOLIOS.CREATE,
          portfolioData
        );
      }

      if (response.success) {
        showSuccess(
          isEditing ? 'Portfolio Updated!' : 'Portfolio Created!',
          'Your portfolio has been saved successfully.'
        );
        navigate('/dashboard');
      } else {
        throw new Error(response.error || 'Failed to save portfolio');
      }
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

  if (showPreview) {
    const TemplateComponent = getTemplateComponent(portfolioData.templateId || 'minimal');
    const previewPortfolio: Portfolio = {
      id: 0,
      userId: 0,
      title: portfolioData.title,
      slug: portfolioData.personalInfo.name.toLowerCase().replace(/\s+/g, ''),
      templateId: portfolioData.templateId,
      personalInfo: portfolioData.personalInfo,
      experience: portfolioData.experience,
      education: portfolioData.education,
      skills: portfolioData.skills,
      projects: portfolioData.projects,
      isPublic: portfolioData.isPublic,
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return (
      <div className="min-h-screen bg-white font-mono">
        <div className="bg-black text-white border-b border-black p-4 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreview(false)}
                className="hover:text-gray-300 transition-colors"
              >
                ← Back to Edit
              </button>
              <span className="text-gray-300">|</span>
              <span className="font-bold">PORTFOLIO PREVIEW</span>
            </div>
            <Button
              onClick={handleSave}
              loading={loading}
              className="bg-white text-black hover:bg-gray-100"
            >
              {isEditing ? 'UPDATE PORTFOLIO' : 'SAVE PORTFOLIO'}
            </Button>
          </div>
        </div>
        <TemplateComponent portfolio={previewPortfolio} isPreview={true} />
      </div>
    );
  }

  // Step 1: Template Selection
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-white font-mono">
        {/* Navigation */}
        <nav className="border-b border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/dashboard" className="font-bold text-lg tracking-tight">
                PORTFOLIYO
              </Link>
              <div className="flex items-center space-x-6">
                <Link
                  to="/dashboard"
                  className="hover:underline"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              CREATE<br />
              <span className="text-gray-600">PORTFOLIO</span>
            </h1>
            <p className="text-lg text-gray-700 mb-2">
              Step 1 of 2: Choose your template
            </p>
            <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          </div>

          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
            className="mb-12"
          />

          <div className="flex justify-center">
            <Button
              onClick={handleNextStep}
              className="bg-black text-white px-8 py-4 hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              Continue with {TEMPLATES[selectedTemplate]?.name.toUpperCase()}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Portfolio Content
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
                <p className="text-sm text-gray-600">
                  Step 2 of 2: Add your content • Template: {TEMPLATES[selectedTemplate]?.name.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!isEditing && (
                <Button
                  variant="outline"
                  onClick={handleBackToTemplates}
                  className="border-black hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Templates
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="border-black hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPreview(true)}
                className="border-black hover:bg-gray-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
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
        {/* Personal Information */}
        <section className="border border-black p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">PERSONAL INFORMATION</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="FULL NAME *"
              value={portfolioData.personalInfo.name}
              onChange={(e) => updatePersonalInfo('name', e.target.value)}
              placeholder="Your full name"
              required
            />

            <Input
              label="PROFESSIONAL TITLE *"
              value={portfolioData.personalInfo.title}
              onChange={(e) => updatePersonalInfo('title', e.target.value)}
              placeholder="e.g., Full Stack Developer"
              required
            />

            <Input
              type="email"
              label="EMAIL *"
              value={portfolioData.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              placeholder="your.email@example.com"
              required
            />

            <Input
              type="tel"
              label="PHONE"
              value={portfolioData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />

            <Input
              label="LOCATION"
              value={portfolioData.personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              placeholder="City, State"
            />

            <Input
              type="url"
              label="WEBSITE"
              value={portfolioData.personalInfo.website}
              onChange={(e) => updatePersonalInfo('website', e.target.value)}
              placeholder="https://yourwebsite.com"
            />

            <Input
              type="url"
              label="GITHUB"
              value={portfolioData.personalInfo.github}
              onChange={(e) => updatePersonalInfo('github', e.target.value)}
              placeholder="https://github.com/yourusername"
            />

            <Input
              type="url"
              label="LINKEDIN"
              value={portfolioData.personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-bold mb-2">PROFESSIONAL SUMMARY</label>
            <textarea
              value={portfolioData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-black focus:ring-2 focus:ring-black focus:border-black font-mono"
              placeholder="Brief description of your professional background and goals"
            />
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

          {portfolioData.experience.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No experience added yet. Click "ADD EXPERIENCE" to get started.</p>
            </div>
          ) : (
            portfolioData.experience.map((exp, index) => (
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
                    label="JOB TITLE"
                    value={exp.title}
                    onChange={(e) => updateExperience(index, 'title', e.target.value)}
                    placeholder="e.g., Senior Developer"
                  />

                  <Input
                    label="COMPANY"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    placeholder="Company name"
                  />

                  <div className="md:col-span-2">
                    <Input
                      label="DURATION"
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                      placeholder="e.g., 2020 - Present"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold">JOB DESCRIPTIONS</label>
                    <button
                      type="button"
                      onClick={() => addExperienceDescription(index)}
                      className="text-sm hover:underline"
                    >
                      + ADD DESCRIPTION
                    </button>
                  </div>
                  {exp.description.map((desc, descIndex) => (
                    <div key={descIndex} className="flex items-start space-x-2 mb-2">
                      <input
                        type="text"
                        value={desc}
                        onChange={(e) => updateExperienceDescription(index, descIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-black focus:ring-2 focus:ring-black focus:border-black font-mono"
                        placeholder="Describe your achievement or responsibility"
                      />
                      {exp.description.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExperienceDescription(index, descIndex)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>

        {/* Skills */}
        <section className="border border-black p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">SKILLS</h2>

          <div className="flex space-x-2 mb-4">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
              placeholder="Add a skill (press Enter to add)"
              fullWidth={false}
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
            {portfolioData.skills.map((skill, index) => (
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
            {portfolioData.skills.length === 0 && (
              <p className="text-gray-500 text-sm">No skills added yet. Add your technical and soft skills above.</p>
            )}
          </div>
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

          {portfolioData.projects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No projects added yet. Showcase your best work by adding projects.</p>
            </div>
          ) : (
            portfolioData.projects.map((project, index) => (
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
                  <Input
                    label="PROJECT TITLE"
                    value={project.title}
                    onChange={(e) => updateProject(index, 'title', e.target.value)}
                    placeholder="Project name"
                  />

                  <div>
                    <label className="block text-sm font-bold mb-2">DESCRIPTION</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-black focus:ring-2 focus:ring-black focus:border-black font-mono"
                      placeholder="Describe what this project does and your role in it"
                    />
                  </div>

                  <Input
                    label="TECHNOLOGIES"
                    value={project.technologies.join(', ')}
                    onChange={(e) => updateProjectTechnologies(index, e.target.value)}
                    placeholder="React, Node.js, MongoDB (comma separated)"
                  />

                  <Input
                    type="url"
                    label="PROJECT LINK"
                    value={project.link || ''}
                    onChange={(e) => updateProject(index, 'link', e.target.value)}
                    placeholder="https://github.com/username/project"
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

          {portfolioData.education.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No education added yet. Add your educational background.</p>
            </div>
          ) : (
            portfolioData.education.map((edu, index) => (
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
                    label="DEGREE"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    placeholder="e.g., Bachelor of Science in Computer Science"
                  />

                  <Input
                    label="INSTITUTION"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    placeholder="University name"
                  />

                  <div className="md:col-span-2">
                    <Input
                      label="YEAR"
                      value={edu.year}
                      onChange={(e) => updateEducation(index, 'year', e.target.value)}
                      placeholder="e.g., 2019 or 2015-2019"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Portfolio Settings */}
        <section className="border border-black p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">PORTFOLIO SETTINGS</h2>

          <div className="space-y-4">
            <Input
              label="PORTFOLIO TITLE"
              value={portfolioData.title}
              onChange={(e) => setPortfolioData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="My Portfolio"
            />

            <div className="flex items-center">
              <input
                id="is-public"
                type="checkbox"
                checked={portfolioData.isPublic}
                onChange={(e) => setPortfolioData(prev => ({ ...prev, isPublic: e.target.checked }))}
                className="h-4 w-4 focus:ring-black border-black"
              />
              <label htmlFor="is-public" className="ml-2 block text-sm font-bold">
                MAKE PORTFOLIO PUBLIC (VISIBLE TO EVERYONE)
              </label>
            </div>

            {user?.username && (
              <div className="p-4 border border-black bg-gray-50">
                <p className="text-sm">
                  <strong>YOUR PORTFOLIO URL:</strong> portfoliyo.me/@{user.username}
                </p>
              </div>
            )}
          </div>
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
            variant="outline"
            size="lg"
            onClick={() => setShowPreview(true)}
            className="border-black hover:bg-gray-50"
          >
            <Eye className="w-5 h-5 mr-2" />
            PREVIEW
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
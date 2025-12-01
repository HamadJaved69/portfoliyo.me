import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Eye } from 'lucide-react';
import { TEMPLATES, createSamplePortfolio } from '../../templates';

const Examples = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [isFullPreview, setIsFullPreview] = useState(false);

  const templates = Object.values(TEMPLATES);
  const currentTemplate = TEMPLATES[selectedTemplate];
  const samplePortfolio = createSamplePortfolio(currentTemplate.preview);

  const TemplateComponent = currentTemplate.component;

  const renderTemplateCard = (template: typeof TEMPLATES[string], isSelected: boolean) => (
    <button
      key={template.id}
      onClick={() => setSelectedTemplate(template.id)}
      className={`text-left w-full border transition-all ${
        isSelected
          ? 'border-2 border-black bg-gray-50'
          : 'border border-gray-300 hover:border-black hover:bg-gray-50'
      }`}
    >
      <div className="p-4 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{template.name.toUpperCase()}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
          <span className="text-xs bg-gray-100 border border-black px-2 py-1">
            {template.category === 'premium' ? 'PREMIUM' : 'FREE'}
          </span>
        </div>
      </div>

      {/* Mini preview */}
      <div className="p-4 bg-white">
        <div className="text-xs space-y-2">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-black mr-2"></div>
            <span>{template.preview.name}</span>
          </div>
          <div className="text-gray-600">{template.preview.title}</div>
          <div className="flex flex-wrap gap-1">
            {template.preview.skills.slice(0, 3).map((skill, i) => (
              <span key={i} className="bg-gray-100 px-1 py-0.5 text-xs border">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );

  if (isFullPreview) {
    return (
      <div className="min-h-screen bg-white">
        {/* Full Preview Header */}
        <div className="bg-black text-white py-4 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFullPreview(false)}
                className="hover:text-gray-300 transition-colors"
              >
                ← Back to Examples
              </button>
              <span className="text-gray-300">|</span>
              <span className="font-bold">{currentTemplate.name.toUpperCase()} TEMPLATE</span>
            </div>
            <Link
              to="/signup"
              className="bg-white text-black px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              Use This Template
            </Link>
          </div>
        </div>

        {/* Full Template Preview */}
        <TemplateComponent portfolio={samplePortfolio} isPreview={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-mono">
      {/* Navigation */}
      <nav className="border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="font-bold text-lg tracking-tight">
              PORTFOLIYO
            </Link>

            <div className="flex items-center space-x-6">
              <Link to="/login" className="hover:underline">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              PORTFOLIO<br />
              <span className="text-gray-600">EXAMPLES</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Three clean templates. Pick one, add your content, publish.
              No design skills required.
            </p>
            <Link
              to="/signup"
              className="bg-black text-white px-8 py-4 hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              Start Building
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Template Selector */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-6">TEMPLATES</h2>
            <div className="space-y-4">
              {templates.map((template) =>
                renderTemplateCard(template, selectedTemplate === template.id)
              )}
            </div>

            <div className="mt-8 p-4 border border-black bg-gray-50">
              <h3 className="font-bold mb-2">ABOUT {currentTemplate.name.toUpperCase()}</h3>
              <p className="text-sm text-gray-700 mb-4">{currentTemplate.description}</p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center">
                  <ChevronRight className="w-3 h-3 mr-2" />
                  <span>Responsive design</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-3 h-3 mr-2" />
                  <span>Fast loading</span>
                </div>
                <div className="flex items-center">
                  <ChevronRight className="w-3 h-3 mr-2" />
                  <span>Built-in analytics</span>
                </div>
                {currentTemplate.category === 'premium' && (
                  <div className="flex items-center text-orange-600">
                    <ChevronRight className="w-3 h-3 mr-2" />
                    <span>Premium features</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">LIVE PREVIEW</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsFullPreview(true)}
                  className="flex items-center text-sm border border-black px-3 py-2 hover:bg-gray-50 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Full Preview
                </button>
                <Link
                  to="/signup"
                  className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
                >
                  Use Template
                </Link>
              </div>
            </div>

            {/* Preview Container */}
            <div className="border border-black bg-white">
              {/* Browser Chrome */}
              <div className="bg-gray-100 border-b border-black px-4 py-3 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1 text-center text-sm text-gray-600">
                  portfoliyo.me/@{currentTemplate.preview.name.toLowerCase().replace(/\s+/g, '')}
                </div>
                <Eye className="w-4 h-4 text-gray-400" />
              </div>

              {/* Scaled Template Preview */}
              <div className="relative bg-white" style={{ height: '600px' }}>
                <div
                  className="absolute inset-0 overflow-hidden cursor-pointer"
                  onClick={() => setIsFullPreview(true)}
                >
                  <div className="transform scale-50 origin-top-left w-[200%] h-[200%]">
                    <TemplateComponent portfolio={samplePortfolio} isPreview={true} />
                  </div>
                </div>

                {/* Click overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 transition-all cursor-pointer flex items-center justify-center group">
                  <div className="bg-black text-white px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to view full size
                  </div>
                </div>
              </div>
            </div>

            {/* Template Actions */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Template: {currentTemplate.name}</span>
                <span>•</span>
                <span>Category: {currentTemplate.category}</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsFullPreview(true)}
                  className="text-sm hover:underline"
                >
                  View Full Size →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="border-t border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">WHAT YOU GET</h2>
            <p className="text-gray-600">Every portfolio includes these features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border border-black p-6">
              <ChevronRight className="w-6 h-6 mb-4" />
              <h3 className="font-bold mb-2">Responsive</h3>
              <p className="text-sm text-gray-600">Works on all devices</p>
            </div>
            <div className="border border-black p-6">
              <ChevronRight className="w-6 h-6 mb-4" />
              <h3 className="font-bold mb-2">Fast Loading</h3>
              <p className="text-sm text-gray-600">Optimized for speed</p>
            </div>
            <div className="border border-black p-6">
              <ChevronRight className="w-6 h-6 mb-4" />
              <h3 className="font-bold mb-2">Analytics</h3>
              <p className="text-sm text-gray-600">Track your views</p>
            </div>
            <div className="border border-black p-6">
              <ChevronRight className="w-6 h-6 mb-4" />
              <h3 className="font-bold mb-2">Custom URL</h3>
              <p className="text-sm text-gray-600">portfoliyo.me/@you</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="border-t border-black bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">HOW IT WORKS</h2>
          </div>

          <div className="space-y-8">
            <div className="flex items-start">
              <span className="text-2xl font-bold mr-6 mt-1">01</span>
              <div>
                <h3 className="font-bold mb-2">Choose Template</h3>
                <p className="text-gray-700">Pick from three clean designs.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl font-bold mr-6 mt-1">02</span>
              <div>
                <h3 className="font-bold mb-2">Add Content</h3>
                <p className="text-gray-700">Fill in your work experience and projects.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl font-bold mr-6 mt-1">03</span>
              <div>
                <h3 className="font-bold mb-2">Publish</h3>
                <p className="text-gray-700">Get your custom URL and start sharing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-black bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            READY TO BUILD?
          </h2>
          <p className="text-gray-300 mb-8">
            Join developers who showcase their work the simple way.
          </p>
          <Link
            to="/signup"
            className="bg-white text-black px-8 py-4 hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Create Your Portfolio
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <p className="text-gray-400 mt-4 text-sm">
            Free forever • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
};

export default Examples;
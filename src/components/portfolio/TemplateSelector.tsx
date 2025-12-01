import React from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { TEMPLATES, createSamplePortfolio, type TemplateConfig } from '../../templates';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  className?: string;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect,
  className = ''
}) => {
  const templates = Object.values(TEMPLATES);

  const renderTemplatePreview = (template: TemplateConfig) => {
    const samplePortfolio = createSamplePortfolio(template.preview);
    const TemplateComponent = template.component;

    return (
      <div className="bg-white border border-black overflow-hidden">
        {/* Template Header */}
        <div className="border-b border-black p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">{template.name.toUpperCase()}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
            {selectedTemplate === template.id && (
              <div className="flex items-center text-green-600">
                <Check className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">SELECTED</span>
              </div>
            )}
          </div>
        </div>

        {/* Preview Container */}
        <div className="relative" style={{ height: '400px' }}>
          <div className="absolute inset-0 overflow-hidden">
            <div className="transform scale-[0.3] origin-top-left w-[333%] h-[333%]">
              <TemplateComponent portfolio={samplePortfolio} isPreview={true} />
            </div>
          </div>

          {/* Overlay for click interaction */}
          <div className="absolute inset-0 bg-transparent cursor-pointer" />
        </div>

        {/* Footer */}
        <div className="border-t border-black p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                {template.category === 'premium' ? 'PREMIUM' : 'FREE'}
              </span>
            </div>
            <button
              onClick={() => onTemplateSelect(template.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedTemplate === template.id
                  ? 'bg-black text-white'
                  : 'border border-black hover:bg-gray-50'
              }`}
            >
              {selectedTemplate === template.id ? 'SELECTED' : 'SELECT'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`font-mono ${className}`}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">CHOOSE TEMPLATE</h2>
        <p className="text-gray-600">
          Pick a design that matches your style. You can change this later.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'ring-2 ring-black ring-offset-4'
                : 'hover:ring-1 hover:ring-gray-400 hover:ring-offset-2'
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            {renderTemplatePreview(template)}
          </div>
        ))}
      </div>

      {/* Template Details */}
      {selectedTemplate && (
        <div className="mt-8 p-6 border border-black bg-gray-50">
          <h3 className="font-bold mb-2">
            {TEMPLATES[selectedTemplate]?.name.toUpperCase()} TEMPLATE
          </h3>
          <p className="text-gray-700 mb-4">
            {TEMPLATES[selectedTemplate]?.description}
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mr-2" />
              <span>Responsive design for all devices</span>
            </div>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mr-2" />
              <span>Professional typography and layout</span>
            </div>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mr-2" />
              <span>Optimized for readability and performance</span>
            </div>
            {TEMPLATES[selectedTemplate]?.category === 'premium' && (
              <div className="flex items-center text-orange-600">
                <ChevronRight className="w-4 h-4 mr-2" />
                <span>Premium template - requires paid plan</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
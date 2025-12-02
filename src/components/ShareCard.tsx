import React, { useRef } from 'react';
import { Terminal, Download, X, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/Button';

interface ShareCardProps {
  username: string;
  title: string;
  tagline?: string | null;
  template: string;
  onClose: () => void;
}

const ShareCard: React.FC<ShareCardProps> = ({ username, title, tagline, template, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const portfolioUrl = `${window.location.origin}/@${username}`;

  const getTemplateColors = () => {
    switch (template) {
      case 'developer':
        return {
          bg: 'bg-black',
          text: 'text-green-400',
          accent: 'text-green-300',
          border: 'border-green-400',
        };
      case 'modern':
        return {
          bg: 'bg-gradient-to-br from-purple-600 to-blue-600',
          text: 'text-white',
          accent: 'text-purple-200',
          border: 'border-white/30',
        };
      default: // minimal
        return {
          bg: 'bg-white',
          text: 'text-black',
          accent: 'text-gray-600',
          border: 'border-black',
        };
    }
  };

  const colors = getTemplateColors();

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      // Dynamic import of html2canvas
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `${username}-portfolio-card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to download card:', error);
      // Fallback: show alert
      alert('Unable to download. Try taking a screenshot instead!');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Check out my new portfolio! Built with @portfoliyo_me\n\n${portfolioUrl}`;

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-black max-w-lg w-full font-mono">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-black">
          <h2 className="text-lg font-bold">SHARE YOUR PORTFOLIO</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Preview */}
        <div className="p-6">
          <div
            ref={cardRef}
            className={`${colors.bg} ${colors.border} border-2 p-8 aspect-[1.91/1] flex flex-col justify-between`}
          >
            {/* Top Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Terminal className={`w-6 h-6 ${colors.text} mr-2`} />
                <span className={`${colors.text} font-bold text-sm`}>PORTFOLIYO</span>
              </div>
              <span className={`${colors.accent} text-xs`}>@{username}</span>
            </div>

            {/* Middle Section */}
            <div className="text-center">
              <h3 className={`${colors.text} text-2xl font-bold mb-2`}>
                {title || `${username}'s Portfolio`}
              </h3>
              {tagline && (
                <p className={`${colors.accent} text-sm`}>{tagline}</p>
              )}
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between">
              <span className={`${colors.accent} text-xs`}>
                portfoliyo.me/@{username}
              </span>
              <div className={`${colors.text} text-xs px-2 py-1 border ${colors.border}`}>
                View Portfolio →
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-4">
            {/* Download Button */}
            <Button
              onClick={handleDownload}
              className="w-full bg-black text-white hover:bg-gray-800"
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download Card
            </Button>

            {/* Social Share Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleTwitterShare}
                leftIcon={<Twitter className="w-4 h-4" />}
                className="border-black"
              >
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={handleLinkedInShare}
                leftIcon={<Linkedin className="w-4 h-4" />}
                className="border-black"
              >
                LinkedIn
              </Button>
            </div>

            {/* Copy Link */}
            <div className="flex items-center border border-black">
              <input
                type="text"
                value={portfolioUrl}
                readOnly
                className="flex-1 px-3 py-2 text-sm bg-gray-50 font-mono"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-black text-white hover:bg-gray-800 flex items-center"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;

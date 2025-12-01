import { BarChart3 } from 'lucide-react';

interface PortfolioAnalyticsProps {
  portfolioId: string;
  username?: string;
}

const PortfolioAnalytics = ({ portfolioId }: PortfolioAnalyticsProps) => {
  // Analytics not available in current backend
  return (
    <div className="bg-white border border-black p-8 text-center font-mono">
      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600">Analytics coming soon</p>
      <p className="text-sm text-gray-500 mt-2">Portfolio: {portfolioId}</p>
    </div>
  );
};

export default PortfolioAnalytics;

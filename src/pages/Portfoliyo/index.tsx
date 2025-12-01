import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Terminal, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { isReservedRoute } from '../../constants/routes';
import { apiClient } from '../../lib/api';
import { API_ENDPOINTS } from '../../config/api';
import { getTemplateComponent } from '../../templates';
import type { Portfolio } from '../../types';

const Portfoliyo = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Clean username (remove @ if present)
  const cleanUsername = username?.replace('@', '') || '';

  // If the username matches a reserved route, show 404
  if (cleanUsername && isReservedRoute(cleanUsername)) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!cleanUsername) {
        setError('No username provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch portfolio data by user ID (username is the userId in this backend)
        const response = await apiClient.get<{ portfolio: Portfolio }>(
          API_ENDPOINTS.PORTFOLIO.PUBLIC(cleanUsername)
        );

        if (response.success && response.data?.portfolio) {
          const portfolioData = response.data.portfolio;
          // Only show published portfolios
          if (!portfolioData.isPublished) {
            setError('This portfolio is private');
            return;
          }
          setPortfolio(portfolioData);
        } else {
          setError('Portfolio not found');
        }
      } catch (err) {
        console.error('Failed to fetch portfolio:', err);
        if (err instanceof Error && err.message.includes('404')) {
          setError('Portfolio not found');
        } else {
          setError('Failed to load portfolio');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [cleanUsername]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-mono">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  // Error states
  if (error) {
    return (
      <div className="min-h-screen bg-white font-mono">
        {/* Simple Header */}
        <div className="border-b border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/" className="inline-flex items-center font-bold text-lg tracking-tight hover:underline">
              <Terminal className="w-6 h-6 mr-2" />
              PORTFOLIYO
            </Link>
          </div>
        </div>

        {/* Error Content */}
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gray-100 border border-black flex items-center justify-center mx-auto mb-6">
              <Terminal className="w-10 h-10 text-gray-400" />
            </div>

            <h1 className="text-2xl font-bold mb-4">
              {error === 'Portfolio not found' ? 'PORTFOLIO NOT FOUND' :
               error === 'This portfolio is private' ? 'PRIVATE PORTFOLIO' :
               'ERROR'}
            </h1>

            <p className="text-gray-700 mb-8 leading-relaxed">
              {error === 'Portfolio not found' ?
                `No portfolio found for @${cleanUsername}. It may not exist or may have been removed.` :
               error === 'This portfolio is private' ?
                'This portfolio is set to private and cannot be viewed publicly.' :
                'There was an error loading this portfolio. Please try again later.'}
            </p>

            <div className="space-y-4">
              <Link
                to="/"
                className="inline-flex items-center bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>

              {error === 'Portfolio not found' && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Want to create your own portfolio?</p>
                  <Link
                    to="/signup"
                    className="font-medium hover:underline"
                  >
                    Sign up for free →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show 404 if no username provided
  if (!cleanUsername) {
    return <Navigate to="/" replace />;
  }

  // Success - render portfolio with selected template (default to minimal)
  if (portfolio) {
    const TemplateComponent = getTemplateComponent(portfolio.template || 'minimal');
    return <TemplateComponent portfolio={portfolio} />;
  }

  // Fallback
  return <Navigate to="/" replace />;
};

export default Portfoliyo;
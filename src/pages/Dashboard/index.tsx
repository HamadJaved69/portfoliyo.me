import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Terminal,
  FileText,
  Eye,
  Settings,
  BarChart3,
  Edit3,
  Plus,
  Share2,
  LogOut,
  Globe,
  EyeOff,
  AlertCircle,
  ImageIcon
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { apiClient } from '../../lib/api';
import { API_ENDPOINTS } from '../../config/api';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ShareCard from '../../components/ShareCard';
import type { Portfolio } from '../../types';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showError, showSuccess } = useToast();

  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load user's portfolio
      const portfolioResponse = await apiClient.get<{ portfolio: Portfolio }>(
        API_ENDPOINTS.PORTFOLIO.ME
      );
      if (portfolioResponse.success && portfolioResponse.data?.portfolio) {
        setPortfolio(portfolioResponse.data.portfolio);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      // Don't show error for 404 (no portfolio yet)
      if (!(error instanceof Error && error.message.includes('404'))) {
        showError('Load Error', 'Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const handlePublishToggle = async () => {
    if (!portfolio) return;

    try {
      setPublishing(true);
      const newPublishState = !portfolio.isPublished;

      await apiClient.patch(API_ENDPOINTS.PORTFOLIO.PUBLISH, {
        isPublished: newPublishState
      });

      setPortfolio({ ...portfolio, isPublished: newPublishState });
      if (newPublishState) {
        if (user?.username) {
          showSuccess('Portfolio Published!', `Your portfolio is now live at /@${user.username}`);
        } else {
          showSuccess('Portfolio Published!', 'Set a username in your profile to get a shareable link');
        }
      } else {
        showSuccess('Portfolio Unpublished', 'Your portfolio is now private');
      }
    } catch (error) {
      console.error('Failed to toggle publish state:', error);
      showError('Error', 'Failed to update portfolio visibility');
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const renderHeader = () => (
    <div className="bg-white border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Terminal className="w-8 h-8 mr-4" />
            <div>
              <h1 className="text-2xl font-bold font-mono">DASHBOARD</h1>
              <p className="text-gray-600 font-mono text-sm">Welcome back, {user?.firstName || user?.username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 font-mono">
            <Link
              to="/profile"
              className="flex items-center hover:underline"
            >
              <Settings className="w-4 h-4 mr-2" />
              Profile
            </Link>
            {user?.email === 'admin@portfoliyo.me' && (
              <Link
                to="/admin"
                className="flex items-center text-red-600 hover:underline"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Admin
              </Link>
            )}
            <Button
              variant="ghost"
              onClick={handleLogout}
              leftIcon={<LogOut className="w-4 h-4" />}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 border border-black">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 border border-black flex items-center justify-center mr-4">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Portfolio</p>
              <p className="text-2xl font-bold">{portfolio ? '1' : '0'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 border border-black">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 border border-black flex items-center justify-center mr-4">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Projects</p>
              <p className="text-2xl font-bold">{portfolio?.projects?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 border border-black">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 border border-black flex items-center justify-center mr-4">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Experience</p>
              <p className="text-2xl font-bold">{portfolio?.experiences?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 border border-black">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 border border-black flex items-center justify-center mr-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Skills</p>
              <p className="text-2xl font-bold">{portfolio?.skills?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="bg-white border border-black">
        <div className="p-6 border-b border-black">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">YOUR PORTFOLIO</h3>
            {portfolio ? (
              <div className="flex space-x-3">
                <Button
                  variant={portfolio.isPublished ? 'outline' : 'primary'}
                  size="sm"
                  leftIcon={portfolio.isPublished ? <EyeOff className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                  onClick={handlePublishToggle}
                  loading={publishing}
                >
                  {portfolio.isPublished ? 'Unpublish' : 'Publish'}
                </Button>
                {portfolio.isPublished && user?.username && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Eye className="w-4 h-4" />}
                      onClick={() => window.open(`/@${user.username}`, '_blank')}
                    >
                      View Live
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Share2 className="w-4 h-4" />}
                      onClick={() => setShowShareCard(true)}
                    >
                      Share
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Edit3 className="w-4 h-4" />}
                  onClick={() => navigate('/start')}
                >
                  Edit
                </Button>
              </div>
            ) : (
              <Button
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => navigate('/start')}
              >
                Create Portfolio
              </Button>
            )}
          </div>
        </div>

        <div className="p-6">
          {portfolio ? (
            <>
              {/* Warning if published but no username */}
              {portfolio.isPublished && !user?.username && (
                <div className="flex items-center p-3 mb-4 bg-yellow-50 border border-yellow-600 text-yellow-800">
                  <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Username required for public link</p>
                    <p className="text-xs">
                      <Link to="/profile" className="underline hover:no-underline">
                        Set a username in your profile
                      </Link>
                      {' '}to get a shareable portfolio URL.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-gray-50 border border-black">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white border border-black flex items-center justify-center mr-4">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">{portfolio.title || 'My Portfolio'}</h4>
                    <p className="text-sm text-gray-600">{portfolio.tagline || 'No tagline set'}</p>
                    <p className="text-xs text-gray-500">
                      Last updated: {new Date(portfolio.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs border ${
                    portfolio.isPublished
                      ? 'border-green-600 bg-green-50 text-green-800'
                      : 'border-gray-600 bg-gray-50 text-gray-800'
                  }`}>
                    {portfolio.isPublished ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold mb-2">NO PORTFOLIO YET</h4>
              <p className="text-gray-600 mb-6">
                Create your first portfolio to showcase your work.
              </p>
              <Button
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => navigate('/start')}
              >
                Create Your Portfolio
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-black p-6">
        <h3 className="text-lg font-bold mb-4">QUICK ACTIONS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-auto p-4 text-left"
            onClick={() => navigate('/start')}
          >
            <div className="flex items-center">
              <Edit3 className="w-5 h-5 mr-3" />
              <div>
                <p className="font-medium">Edit Portfolio</p>
                <p className="text-sm text-gray-600">Update your information</p>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 text-left"
            disabled={!user?.username || !portfolio}
            onClick={() => setShowShareCard(true)}
          >
            <div className="flex items-center">
              <ImageIcon className="w-5 h-5 mr-3" />
              <div>
                <p className="font-medium">Share Card</p>
                <p className="text-sm text-gray-600">
                  {user?.username ? 'Create shareable card' : 'Set username first'}
                </p>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 text-left"
            onClick={() => navigate('/profile')}
          >
            <div className="flex items-center">
              <Settings className="w-5 h-5 mr-3" />
              <div>
                <p className="font-medium">Account Settings</p>
                <p className="text-sm text-gray-600">Manage your account</p>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-mono">
      {renderHeader()}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderOverview()}
      </main>

      {/* Share Card Modal */}
      {showShareCard && portfolio && user?.username && (
        <ShareCard
          username={user.username}
          title={portfolio.title || ''}
          tagline={portfolio.tagline}
          template={portfolio.template}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
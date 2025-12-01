import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Terminal,
  FileText,
  Eye,
  Settings,
  BarChart3,
  ExternalLink,
  Edit3,
  Plus,
  Download,
  Share2,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { apiClient } from '../../lib/api';
import { API_ENDPOINTS } from '../../config/api';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import PortfolioAnalytics from '../../components/analytics/PortfolioAnalytics';
import type { Portfolio, PortfolioStats } from '../../types';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showError } = useToast();

  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [stats, setStats] = useState<PortfolioStats | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load user's portfolio
      const portfolioResponse = await apiClient.get<Portfolio>(API_ENDPOINTS.PORTFOLIOS.MY_PORTFOLIO);
      if (portfolioResponse.success && portfolioResponse.data) {
        setPortfolio(portfolioResponse.data);

        // Load portfolio stats
        const statsResponse = await apiClient.get<PortfolioStats>(
          API_ENDPOINTS.ANALYTICS.PORTFOLIO_STATS(portfolioResponse.data.id)
        );
        if (statsResponse.success && statsResponse.data) {
          setStats(statsResponse.data);
        }
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
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold">{stats?.totalViews || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 border border-black">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 border border-black flex items-center justify-center mr-4">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Profile Views</p>
              <p className="text-2xl font-bold">{stats?.profileViews || 0}</p>
            </div>
          </div>
        </div>

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
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completion</p>
              <p className="text-2xl font-bold">{stats?.completionRate || 0}%</p>
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
                  variant="outline"
                  size="sm"
                  leftIcon={<Eye className="w-4 h-4" />}
                  onClick={() => window.open(`/@${user?.username}`, '_blank')}
                >
                  View Live
                </Button>
                <Button
                  size="sm"
                  leftIcon={<Edit3 className="w-4 h-4" />}
                  onClick={() => navigate('/start')}
                >
                  Edit Portfolio
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
            <div className="flex items-center justify-between p-4 bg-gray-50 border border-black">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white border border-black flex items-center justify-center mr-4">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">{portfolio.personalInfo.name}</h4>
                  <p className="text-sm text-gray-600">{portfolio.personalInfo.title}</p>
                  <p className="text-xs text-gray-500">
                    Last updated: {new Date(portfolio.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Eye className="w-4 h-4 mr-1" />
                  {stats?.totalViews || 0} views
                </div>
                <span className={`px-2 py-1 text-xs border ${
                  portfolio.isPublic
                    ? 'border-green-600 bg-green-50 text-green-800'
                    : 'border-gray-600 bg-gray-50 text-gray-800'
                }`}>
                  {portfolio.isPublic ? 'PUBLIC' : 'PRIVATE'}
                </span>
              </div>
            </div>
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

      {/* Portfolio Analytics */}
      {portfolio && (
        <PortfolioAnalytics
          portfolioId={portfolio.id}
          username={user?.username}
        />
      )}

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
            onClick={() => navigator.clipboard.writeText(`${window.location.origin}/@${user?.username}`)}
          >
            <div className="flex items-center">
              <Share2 className="w-5 h-5 mr-3" />
              <div>
                <p className="font-medium">Share Portfolio</p>
                <p className="text-sm text-gray-600">Copy portfolio link</p>
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
    </div>
  );
};

export default Dashboard;
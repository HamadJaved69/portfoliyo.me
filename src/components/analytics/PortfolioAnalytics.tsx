import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Calendar,
  Download,
  ExternalLink
} from 'lucide-react';
import { apiClient } from '../../lib/api';
import { API_ENDPOINTS } from '../../config/api';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';
import type { PortfolioStats, ViewHistoryItem } from '../../types';

interface PortfolioAnalyticsProps {
  portfolioId: number;
  username?: string;
}

const PortfolioAnalytics = ({ portfolioId, username }: PortfolioAnalyticsProps) => {
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    loadStats();
  }, [portfolioId, timeRange]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<PortfolioStats>(
        API_ENDPOINTS.ANALYTICS.PORTFOLIO_STATS(portfolioId),
        { params: { timeRange } }
      );
      
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Failed to load portfolio stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getViewsForTimeRange = () => {
    if (!stats) return 0;
    switch (timeRange) {
      case 'week': return stats.weekViews;
      case 'month': return stats.monthViews;
      case 'all': return stats.totalViews;
      default: return stats.totalViews;
    }
  };

  const exportData = () => {
    if (!stats) return;
    
    const data = {
      totalViews: stats.totalViews,
      profileViews: stats.profileViews,
      completionRate: stats.completionRate,
      viewHistory: stats.viewHistory,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Analytics</h2>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="all">All Time</option>
          </select>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={exportData}
          >
            Export Data
          </Button>
          {username && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ExternalLink className="w-4 h-4" />}
              onClick={() => window.open(`/@${username}`, '_blank')}
            >
              View Live
            </Button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">
                {timeRange === 'all' ? 'Total Views' : `Views (${timeRange})`}
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatNumber(getViewsForTimeRange())}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Today's Views</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatNumber(stats.todayViews)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Profile Completion</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.completionRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Profile Views</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatNumber(stats.profileViews)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* View History Chart */}
      {stats.viewHistory && stats.viewHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">View History</h3>
          
          <div className="space-y-4">
            {stats.viewHistory.slice(0, 10).map((item: ViewHistoryItem, index) => {
              const maxViews = Math.max(...stats.viewHistory.map(h => h.views));
              const percentage = maxViews > 0 ? (item.views / maxViews) * 100 : 0;
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-24 text-sm text-gray-600">
                    {new Date(item.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-12 text-sm text-gray-900 text-right">
                    {item.views}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="font-medium text-blue-900">Growth Trend</h4>
            </div>
            <p className="text-sm text-blue-700">
              {stats.weekViews > stats.monthViews / 4 
                ? 'Your portfolio is gaining momentum! Views are up this week.' 
                : 'Consider updating your portfolio to boost visibility.'}
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="font-medium text-green-900">Completion Rate</h4>
            </div>
            <p className="text-sm text-green-700">
              {stats.completionRate >= 90 
                ? 'Excellent! Your portfolio is well-detailed and complete.' 
                : stats.completionRate >= 70
                ? 'Good progress! Consider adding more details to reach 90%.'
                : 'Your portfolio could benefit from more information and details.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalytics;
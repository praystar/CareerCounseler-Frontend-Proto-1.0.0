import React, { useState } from 'react';
import Background from '../ui/Background';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { 
  Users, 
  TrendingUp, 
  FileText, 
  Settings, 
  BarChart3,
  DollarSign,
  Shield,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const mockStats = {
    totalUsers: 1247,
    reportsGenerated: 892,
    successfulAnalyses: 856,
    averageRating: 4.7
  };

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2024-01-15', status: 'completed' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2024-01-14', status: 'processing' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', date: '2024-01-13', status: 'completed' }
  ];

  const mockTrends = [
    { id: 1, trend: 'AI/ML jobs growing 35% by 2030', category: 'Technology', status: 'active' },
    { id: 2, trend: 'Renewable energy sector expansion', category: 'Environment', status: 'active' },
    { id: 3, trend: 'Healthcare digitization increasing', category: 'Healthcare', status: 'active' }
  ];

  const tabs = [
    { id: 0, label: 'Dashboard', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 1, label: 'User Management', icon: <Users className="h-4 w-4" /> },
    { id: 2, label: 'Market Trends', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 3, label: 'Reports', icon: <FileText className="h-4 w-4" /> },
    { id: 4, label: 'Settings', icon: <Settings className="h-4 w-4" /> }
  ];

  return (
    <Background variant="pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, market trends, and system settings</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 0 && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card variant="elevated" padding="lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
                    </div>
                  </div>
                </Card>

                <Card variant="elevated" padding="lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FileText className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Reports Generated</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.reportsGenerated.toLocaleString()}</p>
                    </div>
                  </div>
                </Card>

                <Card variant="elevated" padding="lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <TrendingUp className="h-8 w-8 text-purple-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Success Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round((mockStats.successfulAnalyses / mockStats.reportsGenerated) * 100)}%
                      </p>
                    </div>
                  </div>
                </Card>

                <Card variant="elevated" padding="lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <DollarSign className="h-8 w-8 text-yellow-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.averageRating}/5</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card variant="elevated" padding="xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New user registered: jane@example.com</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Career report generated for john@example.com</p>
                      <p className="text-xs text-gray-500">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Market trend updated: AI/ML growth projections</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeTab === 1 && (
            <Card variant="elevated" padding="xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                <Button variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === 2 && (
            <Card variant="elevated" padding="xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Market Trends Management</h2>
                <Button variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Trend
                </Button>
              </div>

              <div className="space-y-4">
                {mockTrends.map((trend) => (
                  <div key={trend.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 mb-1">{trend.trend}</h3>
                        <p className="text-xs text-gray-500">Category: {trend.category}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {trend.status}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">How Market Trends Work:</h3>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• Market trends are fed into the AI's context window for more accurate recommendations</li>
                  <li>• Trends should be updated regularly to reflect current market conditions</li>
                  <li>• Include growth percentages, salary ranges, and industry insights</li>
                  <li>• Categorize trends by industry for better organization</li>
                </ul>
              </div>
            </Card>
          )}

          {activeTab === 3 && (
            <Card variant="elevated" padding="xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Generated Reports</h2>
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Reports Dashboard</h3>
                <p className="text-gray-500 mb-6">View and manage all generated career reports</p>
                <Button variant="outline">
                  Coming Soon
                </Button>
              </div>
            </Card>
          )}

          {activeTab === 4 && (
            <Card variant="elevated" padding="xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">System Settings</h2>
              
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-yellow-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-yellow-900 mb-2">Data Privacy & Compliance</h3>
                      <p className="text-yellow-800 text-sm mb-4">
                        Ensure all user data handling complies with DPDP Act and GDPR regulations.
                      </p>
                      <Button variant="outline" size="sm">
                        View Compliance Logs
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">AI Configuration</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        AI Model Temperature
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        defaultValue="0.7"
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">Controls creativity vs. accuracy</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">System Limits</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max File Upload Size (MB)
                      </label>
                      <input
                        type="number"
                        defaultValue="10"
                        min="1"
                        max="50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Background>
  );
};

export default AdminPanel;
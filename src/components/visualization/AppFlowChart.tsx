import React from 'react'
import Card from '../ui/Card'
import { 
  Compass, 
  LogIn, 
  Users, 
  Settings, 
  Upload, 
  FileText, 
  BarChart3, 
  Brain,
  ArrowRight,
  ArrowDown
} from 'lucide-react'

const AppFlowChart: React.FC = () => {
  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">NAVIRITI Application Flow</h2>
      
      {/* Main Flow */}
      <div className="space-y-8">
        {/* Landing Page */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <Compass className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">NAVIRITI</h3>
          <p className="text-gray-600 mb-4">Caption About the Product</p>
          <div className="bg-gray-100 p-3 rounded-lg inline-block">
            <LogIn className="h-6 w-6 text-gray-600 mx-auto" />
            <p className="text-sm text-gray-600 mt-1">Login</p>
          </div>
        </div>

        {/* Arrows to Admin and User */}
        <div className="flex justify-center space-x-16">
          <div className="text-center">
            <ArrowRight className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <div className="bg-emerald-100 p-4 rounded-lg">
              <Settings className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-semibold text-emerald-800">Admin Side</p>
            </div>
          </div>
          
          <div className="text-center">
            <ArrowRight className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="bg-blue-100 p-4 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-blue-800">User Side</p>
            </div>
          </div>
        </div>

        {/* User Flow Steps */}
        <div className="bg-blue-50 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-blue-800 mb-6 text-center">User Journey Flow</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Upload Page */}
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <Upload className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Uploading Page</h4>
                <div className="mt-2 space-y-1">
                  <div className="bg-gray-100 h-2 rounded"></div>
                  <div className="bg-gray-100 h-2 rounded"></div>
                  <div className="bg-gray-100 h-2 rounded"></div>
                </div>
              </div>
              <ArrowRight className="h-6 w-6 text-blue-500 mx-auto" />
            </div>

            {/* Forms Page */}
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Forms Page</h4>
                <div className="mt-2 space-y-1">
                  <div className="bg-gray-100 h-2 rounded"></div>
                  <div className="bg-gray-100 h-2 rounded"></div>
                  <div className="bg-gray-100 h-2 rounded"></div>
                  <div className="bg-gray-100 h-2 rounded"></div>
                  <div className="bg-gray-100 h-2 rounded"></div>
                </div>
              </div>
              <ArrowRight className="h-6 w-6 text-blue-500 mx-auto" />
            </div>

            {/* Visualization Page */}
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Visualization Page</h4>
                <div className="mt-2 bg-gray-100 p-2 rounded">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    <div className="w-8 h-1 bg-gray-300 rounded"></div>
                    <div className="w-4 h-4 bg-blue-400 rounded"></div>
                    <div className="w-1 h-4 bg-gray-300 rounded"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <ArrowRight className="h-6 w-6 text-blue-500 mx-auto" />
            </div>

            {/* LLM Generated Content */}
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">LLM Generated Content</h4>
                <div className="mt-2 space-y-1">
                  <div className="bg-gray-100 h-2 rounded"></div>
                  <div className="bg-gray-100 h-2 rounded"></div>
                  <div className="bg-gray-100 h-2 rounded"></div>
                  <div className="bg-gray-100 h-2 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Features */}
        <div className="bg-emerald-50 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-emerald-800 mb-4 text-center">Admin Dashboard Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <Users className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">User Management</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <BarChart3 className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Analytics Dashboard</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <Settings className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">System Settings</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AppFlowChart

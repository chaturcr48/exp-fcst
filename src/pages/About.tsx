import React from 'react';
import { Brain, Database, Shield, Zap } from 'lucide-react';

const About: React.FC = () => {
  const methodologies = [
    {
      icon: Brain,
      title: 'Machine Learning Models',
      description: 'Advanced time series forecasting using statistical models and machine learning algorithms'
    },
    {
      icon: Database,
      title: 'Historical Analysis',
      description: 'Comprehensive analysis of past expense patterns to identify trends and seasonality'
    },
    {
      icon: Shield,
      title: 'Confidence Intervals',
      description: 'Statistical confidence bands provide uncertainty estimates for reliable decision making'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Dynamic forecasts that update automatically as new expense data becomes available'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Expense Forecasting</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Learn how our intelligent forecasting system predicts future expenses
            with statistical accuracy and confidence intervals.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Our expense forecasting system combines historical data analysis with advanced statistical 
            modeling to predict future spending patterns across different categories. The system analyzes 
            trends, seasonality, and other patterns in your expense data to generate accurate forecasts.
          </p>
          
          <p className="text-gray-700 mb-8 leading-relaxed">
            Each forecast includes confidence intervals that represent the range of possible values, 
            helping you understand the uncertainty in predictions and make more informed financial decisions.
          </p>
        </div>

        {/* Methodologies Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {methodologies.map(({ icon: Icon, title, description }, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Details */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Sources</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Historical expense transactions</li>
                <li>• Category-based spending patterns</li>
                <li>• Seasonal trend analysis</li>
                <li>• Market and economic indicators</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Forecast Accuracy</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• 95% confidence intervals</li>
                <li>• Monthly prediction accuracy</li>
                <li>• Category-specific modeling</li>
                <li>• Continuous model improvement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
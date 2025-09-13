import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Calendar, Filter } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Intelligent Forecasting',
      description: 'Advanced algorithms predict future expenses with confidence intervals'
    },
    {
      icon: Filter,
      title: 'Category Filtering',
      description: 'Filter by Travel, Payroll, Cloud, and other expense categories'
    },
    {
      icon: Calendar,
      title: 'Flexible Time Ranges',
      description: 'View forecasts for single months, quarters, or custom periods'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Expense Forecast
            <span className="text-blue-600 block">Dashboard</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Visualize your expense data with intelligent forecasting. Make informed financial 
            decisions with interactive charts, category filtering, and confidence intervals.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 space-x-2 text-lg"
          >
            <span>View Dashboard</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to understand and predict your expense patterns
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div 
                key={index}
                className="text-center p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore Your Data?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Start analyzing your expense forecasts with our interactive dashboard
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition-colors duration-200 space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
import React, { useState, useMemo } from 'react';
import { useExpenseData } from '../hooks/useExpenseData';
import { FilterState } from '../types';
import { getUniqueCategories, processChartData, getCategoryColors } from '../utils/dataProcessing';
import FilterPanel from '../components/FilterPanel';
import ExpenseChart from '../components/ExpenseChart';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Dashboard: React.FC = () => {
  const { expenseData, forecastData, loading, error, refetch } = useExpenseData();
  
  const categories = useMemo(() => 
    getUniqueCategories(expenseData, forecastData), 
    [expenseData, forecastData]
  );

  const [filters, setFilters] = useState<FilterState>({
    selectedCategories: categories,
    forecastRange: 6,
    showHistorical: true,
    showConfidence: true,
    dateRange: {
      start: null,
      end: null
    }
  });

  // Update selected categories when categories change
  React.useEffect(() => {
    if (categories.length > 0 && filters.selectedCategories.length === 0) {
      setFilters(prev => ({ ...prev, selectedCategories: categories }));
    }
  }, [categories]);

  const chartData = useMemo(() => 
    processChartData(expenseData, forecastData, filters.selectedCategories, filters.dateRange, filters.forecastRange),
    [expenseData, forecastData, filters.selectedCategories, filters.dateRange, filters.forecastRange]
  );

  const categoryColors = useMemo(() => 
    getCategoryColors(categories),
    [categories]
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Dashboard</h1>
          <p className="text-gray-600">
            Interactive visualization of historical expenses and future forecasts
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <FilterPanel
              categories={categories}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          {/* Chart Area */}
          <div className="lg:col-span-3">
            <ExpenseChart
              data={chartData}
              categories={filters.selectedCategories}
              colors={categoryColors}
              showHistorical={filters.showHistorical}
              showConfidence={filters.showConfidence}
            />
            
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Categories</h3>
                <p className="text-3xl font-bold text-blue-600">{categories.length}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Selected Categories</h3>
                <p className="text-3xl font-bold text-teal-600">{filters.selectedCategories.length}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Points</h3>
                <p className="text-3xl font-bold text-orange-600">{chartData.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
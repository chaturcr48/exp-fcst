import React from 'react';
import { Calendar, Filter, ToggleLeft, ToggleRight } from 'lucide-react';
import { FilterState } from '../types';

interface FilterPanelProps {
  categories: string[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  categories, 
  filters, 
  onFiltersChange 
}) => {
  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.selectedCategories.includes(category)
      ? filters.selectedCategories.filter(c => c !== category)
      : [...filters.selectedCategories, category];
      
    onFiltersChange({ ...filters, selectedCategories: newCategories });
  };

  const handleSelectAll = () => {
    const allSelected = filters.selectedCategories.length === categories.length;
    onFiltersChange({ 
      ...filters, 
      selectedCategories: allSelected ? [] : categories 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
      {/* Categories Filter */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          </div>
          <button
            onClick={handleSelectAll}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {filters.selectedCategories.length === categories.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
        
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 font-medium">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Forecast Range */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Forecast Range</h3>
        <select
          value={filters.forecastRange}
          onChange={(e) => onFiltersChange({ ...filters, forecastRange: Number(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={1}>1 Month</option>
          <option value={3}>3 Months (Quarter)</option>
          <option value={6}>6 Months</option>
          <option value={12}>12 Months</option>
        </select>
      </div>

      {/* Historical Range */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Historical Range</h3>
        <select
          value={filters.historicalRange}
          onChange={(e) => onFiltersChange({ ...filters, historicalRange: Number(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={6}>6 Months</option>
          <option value={12}>12 Months</option>
          <option value={24}>24 Months</option>
          <option value={36}>36 Months</option>
          <option value={0}>All Historical Data</option>
        </select>
      </div>

      {/* Date Range */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Date Range</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={filters.dateRange.start ? filters.dateRange.start.toISOString().split('T')[0] : ''}
              onChange={(e) => onFiltersChange({
                ...filters,
                dateRange: {
                  ...filters.dateRange,
                  start: e.target.value ? new Date(e.target.value) : null
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={filters.dateRange.end ? filters.dateRange.end.toISOString().split('T')[0] : ''}
              onChange={(e) => onFiltersChange({
                ...filters,
                dateRange: {
                  ...filters.dateRange,
                  end: e.target.value ? new Date(e.target.value) : null
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Toggle Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Show Historical Data</span>
          <button
            onClick={() => onFiltersChange({ ...filters, showHistorical: !filters.showHistorical })}
            className="focus:outline-none"
          >
            {filters.showHistorical ? (
              <ToggleRight className="h-6 w-6 text-blue-600" />
            ) : (
              <ToggleLeft className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Show Confidence Intervals</span>
          <button
            onClick={() => onFiltersChange({ ...filters, showConfidence: !filters.showConfidence })}
            className="focus:outline-none"
          >
            {filters.showConfidence ? (
              <ToggleRight className="h-6 w-6 text-blue-600" />
            ) : (
              <ToggleLeft className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
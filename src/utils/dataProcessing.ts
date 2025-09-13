import { format, parseISO, isWithinInterval } from 'date-fns';
import { addMonths } from 'date-fns';
import { ExpenseData, ForecastData, ChartDataPoint } from '../types';

export const getUniqueCategories = (
  expenseData: ExpenseData[], 
  forecastData: ForecastData[]
): string[] => {
  const expenseCategories = new Set(expenseData.map(item => item.category));
  const forecastCategories = new Set(forecastData.map(item => item.category));
  return Array.from(new Set([...expenseCategories, ...forecastCategories])).sort();
};

export const processChartData = (
  expenseData: ExpenseData[],
  forecastData: ForecastData[],
  selectedCategories: string[],
  dateRange: { start: Date | null; end: Date | null },
  forecastRange: number
): ChartDataPoint[] => {
  const dataMap = new Map<string, ChartDataPoint>();

  // Calculate forecast cutoff date
  const now = new Date();
  const forecastCutoff = addMonths(now, forecastRange);
  // Process expense data
  expenseData
    .filter(item => selectedCategories.includes(item.category))
    .forEach(item => {
      const date = parseISO(item.month);
      const monthKey = format(date, 'yyyy-MM');
      
      if (!dataMap.has(monthKey)) {
        dataMap.set(monthKey, { month: monthKey, date });
      }
      
      const point = dataMap.get(monthKey)!;
      point[`${item.category}_actual`] = item.amount;
    });

  // Process forecast data
  forecastData
    .filter(item => selectedCategories.includes(item.category))
    .filter(item => {
      const date = parseISO(item.month);
      return date <= forecastCutoff;
    })
    .filter(item => {
      if (!dateRange.start || !dateRange.end) return true;
      const date = parseISO(item.month);
      return isWithinInterval(date, { start: dateRange.start, end: dateRange.end });
    })
    .forEach(item => {
      const date = parseISO(item.month);
      const monthKey = format(date, 'yyyy-MM');
      
      if (!dataMap.has(monthKey)) {
        dataMap.set(monthKey, { month: monthKey, date });
      }
      
      const point = dataMap.get(monthKey)!;
      point[`${item.category}_forecast`] = item.forecast_amount;
      point[`${item.category}_lower`] = item.lower_ci;
      point[`${item.category}_upper`] = item.upper_ci;
    });

  return Array.from(dataMap.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const getCategoryColors = (categories: string[]): Record<string, string> => {
  const colors = [
    '#3B82F6', // blue-500
    '#14B8A6', // teal-500
    '#F97316', // orange-500
    '#8B5CF6', // violet-500
    '#EF4444', // red-500
    '#10B981', // emerald-500
    '#F59E0B', // amber-500
    '#6366F1', // indigo-500
    '#EC4899', // pink-500
    '#84CC16', // lime-500
  ];
  
  return categories.reduce((acc, category, index) => {
    acc[category] = colors[index % colors.length];
    return acc;
  }, {} as Record<string, string>);
};
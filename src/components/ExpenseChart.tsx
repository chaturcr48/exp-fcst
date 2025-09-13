import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
  Legend
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { ChartDataPoint } from '../types';

interface ExpenseChartProps {
  data: ChartDataPoint[];
  categories: string[];
  colors: Record<string, string>;
  showHistorical: boolean;
  showConfidence: boolean;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({
  data,
  categories,
  colors,
  showHistorical,
  showConfidence
}) => {
  const formatXAxis = (tickItem: string) => {
    try {
      return format(new Date(tickItem + '-01'), 'MMM yyyy');
    } catch {
      return tickItem;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">
            {format(new Date(label + '-01'), 'MMMM yyyy')}
          </p>
          {payload.map((entry: any, index: number) => {
            const [category, type] = entry.dataKey.split('_');
            const color = colors[category] || '#3B82F6';
            
            return (
              <p key={index} style={{ color }} className="text-sm font-medium">
                {`${category} ${type === 'actual' ? '(Actual)' : '(Forecast)'}: ${formatCurrency(entry.value)}`}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available for the selected filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Expense Forecast Visualization</h2>
        <p className="text-sm text-gray-600 mt-1">Historical data and future projections by category</p>
      </div>
      
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            tickFormatter={formatXAxis}
            stroke="#6b7280"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={formatCurrency}
            stroke="#6b7280"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Confidence Intervals (Areas) */}
          {showConfidence && categories.map((category) => (
            <Area
              key={`${category}-confidence`}
              dataKey={`${category}_upper`}
              stroke="none"
              fill={`${colors[category]}20`}
              fillOpacity={0.3}
              connectNulls={false}
            />
          ))}

          {/* Historical Data Lines */}
          {showHistorical && categories.map((category) => (
            <Line
              key={`${category}-actual`}
              type="monotone"
              dataKey={`${category}_actual`}
              stroke={colors[category]}
              strokeWidth={2}
              dot={{ r: 4, fill: colors[category] }}
              connectNulls={false}
              name={`${category} (Actual)`}
            />
          ))}

          {/* Forecast Lines */}
          {categories.map((category) => (
            <Line
              key={`${category}-forecast`}
              type="monotone"
              dataKey={`${category}_forecast`}
              stroke={colors[category]}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4, fill: colors[category] }}
              connectNulls={false}
              name={`${category} (Forecast)`}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
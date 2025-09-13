export interface ExpenseData {
  month: string;
  category: string;
  amount: number;
}

export interface ForecastData {
  month: string;
  forecast_amount: number;
  category: string;
  lower_ci: number;
  upper_ci: number;
}

export interface ChartDataPoint {
  month: string;
  date: Date;
  [key: string]: any; // For dynamic category data
}

export interface FilterState {
  selectedCategories: string[];
  forecastRange: number;
  historicalRange: number;
  showHistorical: boolean;
  showConfidence: boolean;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}
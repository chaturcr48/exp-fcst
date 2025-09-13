import { useState, useEffect } from 'react';
import { ExpenseData, ForecastData } from '../types';

export const useExpenseData = () => {
  const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [expenseResponse, forecastResponse] = await Promise.all([
        fetch('https://expenseforecaster.onrender.com/monthly-expenses-data'),
        fetch('https://expenseforecaster.onrender.com/all-category-forecast-data')
      ]);

      if (!expenseResponse.ok || !forecastResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const expenses = await expenseResponse.json();
      const forecasts = await forecastResponse.json();

      setExpenseData(expenses);
      setForecastData(forecasts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);

  return { expenseData, forecastData, loading, error, refetch: fetchData };
};
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from './LeaderboardTotals.module.css';

interface DashboardData {
  partners: {
    owner: string;
    amount: number;
    createdAt: string;
  }[];
  prices: {
    address: string;
    usdPrice: number;
  }[];
  holdings: {
    value: string;
  }[];
}

const LeaderboardHoldingTotals: NextPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        // Validate the data structure
        if (!result.partners || !result.prices || !result.holdings) {
          throw new Error('Invalid data format received');
        }
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!data?.partners || !data?.prices || !data?.holdings) return null;

  const totalPartners = data.partners?.length || 0;
  
  // Calculate total value from holdings
  const totalValue = data.holdings.reduce((sum, holding) => {
    // Parse the value string (remove $ and commas) and convert to number
    const value = parseFloat(holding.value.replace(/[$,]/g, ''));
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const newPartners = data.partners?.filter(partner => 
    new Date(partner.createdAt) > sevenDaysAgo)?.length || 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>MARKET CAP</th>
            <th>AUM</th>
            <th>New Partners (7d)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalPartners.toLocaleString()}</td>
            <td>{formatCurrency(totalValue)}</td>
            <td>{newPartners}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardHoldingTotals;
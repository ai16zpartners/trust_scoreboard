import type { FC } from 'react';
import { useEffect, useState } from 'react';
import styles from './LeaderboardHoldingTotals.module.css';

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

const AI16Z_ADDRESS = 'HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC';
const AI16Z_TOTAL_SUPPLY = 1099999775.54;

const LeaderboardHoldingTotals: FC = () => {
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

  // Calculate metrics
  const ai16zPrice = data.prices.find(p => p.address === AI16Z_ADDRESS)?.usdPrice || 0;
  const marketCap = ai16zPrice * AI16Z_TOTAL_SUPPLY;
  
  const totalValue = data.holdings.reduce((sum, holding) => {
    const value = parseFloat(holding.value.replace(/[$,]/g, ''));
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const newPartners = data.partners?.filter(partner => 
    new Date(partner.createdAt) > sevenDaysAgo)?.length || 0;

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statItem}>
        <div className={styles.statValue}>
          ${(marketCap / 1000000).toFixed(2)}m
        </div>
        <div className={styles.statLabel}>MARKET CAP</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statValue}>
          ${(totalValue / 1000000).toFixed(2)}m
        </div>
        <div className={styles.statLabel}>AUM</div>
      </div>
      <div className={styles.statItem}>
        <div className={styles.statValue}>+{newPartners}</div>
        <div className={styles.statLabel}>NEW PARTNERS (7D)</div>
      </div>
    </div>
  );
};

export default LeaderboardHoldingTotals;

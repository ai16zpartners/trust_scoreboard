import type { FC } from 'react';
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
}

const AI16Z_ADDRESS = 'HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC';
const DECIMALS = 1_000_000_000;

const LeaderboardTotals: FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateMetrics = () => {
    if (!data?.partners || !data?.prices) return {
      totalPartners: 0,
      totalWorth: 0,
      newPartners: 0
    };

    const totalPartners = data.partners.length;
    const helpPrice = data.prices.find(p => p.address === AI16Z_ADDRESS)?.usdPrice || 0;
    const totalWorth = data.partners.reduce((sum, partner) => sum + partner.amount * helpPrice, 0);
    const newPartners = data.partners.filter(partner => 
      new Date(partner.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;

    return { totalPartners, totalWorth, newPartners };
  };

  const renderMetric = (value: string | number, label: string) => (
    <div className={styles.numberAndBadgeParent}>
      <div className={styles.numberAndBadge}>
        <div className={styles.number}>{value}</div>
      </div>
      <div className={styles.headingWrapper}>
        <div className={styles.heading}>{label}</div>
      </div>
    </div>
  );

  const metrics = calculateMetrics();

  return (
    <div className={styles.frameParent}>
      <div className={styles.instanceParent}>
        {isLoading ? (
          <>
            {renderMetric('-', 'PARTNERS')}
            {renderMetric('-', 'TOTAL WORTH')} 
            {renderMetric('-', 'NEW PARTNERS (7D)')}
          </>
        ) : error ? (
          <>
            {renderMetric('-', 'PARTNERS')}
            {renderMetric('-', 'TOTAL WORTH')}
            {renderMetric('-', 'NEW PARTNERS (7D)')}
          </>
        ) : (
          <>
            {renderMetric(metrics.totalPartners.toLocaleString(), 'PARTNERS')}
            {renderMetric(`$${(metrics.totalWorth / 1000000).toFixed(2)}m`, 'TOTAL WORTH')}
            {renderMetric(`+${metrics.newPartners}`, 'NEW PARTNERS (7D)')}
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardTotals;

import { FC, useState, useEffect } from 'react';
import styles from './LeaderboardHoldings.module.css';

interface DAOHolding {
  rank: number;
  name: string;
  holdings: string;
  value: string;
  percentage: string;
  imageUrl: string;
}

const LeaderboardHoldings: FC = () => {
  const [holdings, setHoldings] = useState<DAOHolding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        if (!data.holdings || !Array.isArray(data.holdings)) {
          throw new Error('Invalid data format received from API');
        }

        const sortedHoldings = data.holdings
          .sort((a, b) => {
            const valueA = parseFloat(a.value.replace(/[$,]/g, ''));
            const valueB = parseFloat(b.value.replace(/[$,]/g, ''));
            return valueB - valueA;
          })
          .map((holding, index) => ({
            ...holding,
            rank: index + 1
          }));

        setHoldings(sortedHoldings);
      } catch (err) {
        console.error('Error fetching DAO holdings:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderSkeletonRow = (index: number) => (
    <div key={`skeleton-${index}`} className={index % 2 === 0 ? styles.row : styles.row1}>
      <div className={styles.text}>
        <div className="animate-pulse bg-gray-300 h-6 w-8 rounded" />
      </div>
      <div className={styles.daoInfo}>
        <div className={styles.textParent}>
          <div className="animate-pulse bg-gray-300 h-6 w-32 rounded" />
          <div className="animate-pulse bg-gray-300 h-4 w-16 rounded mt-1" />
        </div>
      </div>
      <div className={styles.instanceParent}>
        <div className={styles.textWrapper}>
          <div className="animate-pulse bg-gray-300 h-6 w-24 rounded" />
        </div>
        <div className={styles.textWrapper}>
          <div className="animate-pulse bg-gray-300 h-6 w-24 rounded" />
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.frameParent}>
      <div className={styles.headingParent}>
        <div className={styles.heading}>Rank</div>
        <div className={styles.heading}>Asset</div>
        <div className={styles.heading2}>Amount</div>
        <div className={styles.heading2}>Value</div>
      </div>
      
      {isLoading ? (
        Array(5).fill(0).map((_, index) => renderSkeletonRow(index))
      ) : error ? (
        <div className={styles.errorMessage}>Error: {error}</div>
      ) : holdings.length === 0 ? (
        <div className={styles.emptyMessage}>No holdings found</div>
      ) : (
        holdings.map((dao, index) => (
          <div key={dao.rank} className={index % 2 === 0 ? styles.row : styles.row1}>
            <div className={styles.text}>{dao.rank}</div>
            <div className={styles.daoInfo}>
              <div className={styles.textParent}>
                <div className={styles.text1}>{dao.name}</div>
                <div className={styles.text2}>Token</div>
              </div>
            </div>
            <div className={styles.instanceParent}>
              <div className={styles.textWrapper}>
                <div className={styles.text3}>{dao.holdings}</div>
              </div>
              <div className={styles.textWrapper}>
                <div className={styles.text3}>{dao.value}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LeaderboardHoldings;

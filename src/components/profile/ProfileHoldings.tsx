import { FC, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Image from "next/image";
import styles from './ProfileHoldings.module.css';

interface TokenHolding {
  name: string;
  amount: number;
  allocation: number;
  price: number;
  value: number;
}

const ALLOWED_TOKENS = ['ai16z', 'degenai'];

const ProfileHoldings: FC = () => {
  const { publicKey } = useWallet();
  const [holdings, setHoldings] = useState<TokenHolding[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHoldings = async () => {
      if (!publicKey) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/userHoldings?wallet=${publicKey.toString()}`);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        if (!data.holdings) {
          throw new Error('Invalid response format');
        }

        // Filter for only ai16z and degenai tokens
        const validHoldings = data.holdings
          .filter(holding => 
            ALLOWED_TOKENS.includes(holding.name.toLowerCase()) && 
            holding.amount > 0
          )
          .sort((a, b) => b.value - a.value);

        setHoldings(validHoldings);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch holdings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHoldings();
  }, [publicKey]);

  const formatValue = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}m`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}k`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.holdingsTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>HOLDING</th>
            <th className={styles.tableHeader}></th>
            <th className={styles.tableHeader}>ALLOCATION</th>
            <th className={styles.tableHeader}>VALUE</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <tr key={index} className={`${styles.tableRow} ${index % 2 === 1 ? styles.alternateRow : ''}`}>
                {Array(4).fill(0).map((_, cellIndex) => (
                  <td key={cellIndex} className={styles.holdingCell}>
                    <div className="animate-pulse bg-gray-300 h-6 w-20 rounded"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : !publicKey ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                Connect wallet to view holdings
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={4} className="text-center py-4 text-red-500">
                Error: {error}
              </td>
            </tr>
          ) : !holdings || holdings.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No ai16z or degenai holdings found
              </td>
            </tr>
          ) : (
            holdings.map((holding, index) => (
              <tr key={index} className={`${styles.tableRow} ${index % 2 === 1 ? styles.alternateRow : ''}`}>
                <td className={styles.holdingCell}>
                  <div className={styles.holdingInfo}>
                    <span className={styles.rankNumber}>{index + 1}</span>
                    <Image 
                      src={`/${holding.name.toLowerCase()}.png`}
                      alt={holding.name}
                      width={34}
                      height={34}
                      className={styles.tokenLogo}
                    />
                    <div className={styles.holdingDetails}>
                      <div className={styles.tokenName}>{holding.name}</div>
                      <div className={styles.tokenAmount}>
                        {holding.amount.toLocaleString(undefined, {
                          maximumFractionDigits: 0
                        })}
                      </div>
                    </div>
                  </div>
                </td>
                <td></td>
                <td className={styles.allocationCell}>
                  {holding.allocation.toFixed(2)}%
                </td>
                <td className={styles.valueCell}>
                  {formatValue(holding.value)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileHoldings;
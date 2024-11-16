import type { FC } from 'react';
import Image from "next/image";
import styles from './RecomendationsList.module.css';

interface Transaction {
  id: number;
  token: string;
  type: 'buy' | 'sell';
  price: number;
  performance: number;
  date: string;
  status: 'success' | 'pending' | 'failed';
}

const mockTransactions: Transaction[] = [
  {
    id: 1,
    token: "BONK",
    type: 'buy',
    price: 0.00000234,
    performance: 12.5,
    date: '2024-03-15',
    status: 'success'
  },
  {
    id: 2,
    token: "JTO",
    type: 'sell',
    price: 1.24,
    performance: -5.2,
    date: '2024-03-14',
    status: 'success'
  },
  {
    id: 3,
    token: "PYTH",
    type: 'buy',
    price: 0.45,
    performance: 8.7,
    date: '2024-03-13',
    status: 'success'
  },
  // Add more mock transactions as needed
];

const RecomendationsList: FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPerformance = (performance: number) => {
    const isPositive = performance > 0;
    return (
      <span className={isPositive ? styles.positive : styles.negative}>
        {isPositive ? '+' : ''}{performance}%
      </span>
    );
  };

  return (
    <div className={styles.frameParent}>
      <div className={styles.headingParent}>
        <div className={styles.heading}>TOKEN</div>
        <div className={styles.heading}>TYPE</div>
        <div className={styles.heading}>PRICE</div>
        <div className={styles.heading}>PERFORMANCE</div>
        <div className={styles.heading}>DATE</div>
      </div>
      {mockTransactions.map((transaction) => (
        <div key={transaction.id} className={transaction.id % 2 === 0 ? styles.row : styles.row1}>
          <div className={styles.rowChild}>
            <Image
              width={34}
              height={34}
              alt={`${transaction.token} icon`}
              src="/token.svg"
              className={styles.tokenImage}
            />
            <div className={styles.textParent}>
              <div className={styles.text1}>{transaction.token}</div>
            </div>
          </div>
          <div className={styles.text2}>
            {transaction.type.toUpperCase()}
          </div>
          <div className={styles.text2}>
            ${transaction.price.toFixed(8)}
          </div>
          <div className={styles.text2}>
            {formatPerformance(transaction.performance)}
          </div>
          <div className={styles.text2}>
            {formatDate(transaction.date)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecomendationsList;
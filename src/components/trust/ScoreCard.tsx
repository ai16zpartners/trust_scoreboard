import React from 'react';
import styles from './ScoreCard.module.css';

interface ScoreCardProps {
  title: string;
  value: number;
  description: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ title, value, description }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.value}>
        {value.toFixed(2)}
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default ScoreCard;
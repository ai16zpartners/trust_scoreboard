import { FC } from 'react';
import styles from './index.module.css';
import LeaderboardTotals from '../../components/leaderboard/LeaderboardTotals';
import LeaderboardMedals from '../../components/leaderboard/LeaderboardMedals';
import LeaderboardPartners from '../../components/leaderboard/LeaderboardPartners';

export const HomeView: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Trust Leaderboard
        </h2>

        <LeaderboardMedals />

        <div className={styles.leaderboardWrapper}>
          <LeaderboardPartners />
        </div>
      </div>
    </div>
  );
};
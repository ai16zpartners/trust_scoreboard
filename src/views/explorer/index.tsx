import { FC, useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import ScoreCard from '../../components/trust/ScoreCard';
import RecomendationsList from '../../components/trust/RecomendationsList';
import TrustScoreChart from '../../components/trust/TrustScoreChart';

// Mock user data
const mockUserProfile = {
  address: "GxkXGe3YcqBdEgBrBh19X3wkLkgJXK2jA4k4nioW2Yg",
  discordUsername: "futjr",
  discordImage: "/profile_default.png",
  followers: 0,
  following: 0,
  scoreRank: 140,
  totalParticipants: 2481,
  trustScore: 85.5
};

const ExplorerView: FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mockUserProfile.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.userProfile}>
          <div className={styles.profileHeader}>
            <Image
              src={mockUserProfile.discordImage}
              alt={mockUserProfile.discordUsername}
              width={64}
              height={64}
              className={styles.profileImage}
            />
            <div className={styles.profileInfo}>
              <h2 className={styles.username}>{mockUserProfile.discordUsername}</h2>
              <p className={styles.address}>
                {mockUserProfile.address}
                <button 
                  className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                  onClick={handleCopy}
                  title={copied ? "Copied!" : "Copy address"}
                >
                  <Image 
                    src={copied ? "/check-icon.svg" : "/copy-icon.svg"} 
                    alt={copied ? "Copied" : "Copy"} 
                    width={16} 
                    height={16} 
                  />
                </button>
              </p>
            </div>
            <div className={styles.socialStats}>
              <div className={styles.statItem}>
                <p className={styles.statValue}>{mockUserProfile.following}</p>
                <p className={styles.statLabel}>following</p>
              </div>
              <div className={styles.statItem}>
                <p className={styles.statValue}>{mockUserProfile.followers}</p>
                <p className={styles.statLabel}>followers</p>
              </div>
            </div>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>TRUST SCORE</p>
              <p className={styles.metricValue}>{mockUserProfile.trustScore}</p>
              <p className={styles.metricDescription}>Overall trust score based on multiple factors</p>
            </div>
            <div className={styles.metricCard}>
              <p className={styles.metricLabel}>SCORE RANK</p>
              <p className={styles.metricValue}>
                #{mockUserProfile.scoreRank}
                <span className={styles.totalRank}>/{mockUserProfile.totalParticipants}</span>
              </p>
              <p className={styles.metricDescription}>Current ranking among all users</p>
            </div>
          </div>
        </div>

        <div className={styles.chartSection}>
          <h2 className={styles.sectionTitle}>Trust Score Trend</h2>
          <div className={styles.chartCard}>
            <TrustScoreChart />
          </div>
        </div>

        <div className={styles.performanceSection}>
          <h2 className={styles.sectionTitle}>Performance Metrics</h2>
          <div className={styles.performanceGrid}>
            <div className={styles.performanceCard}>
              <h3 className={styles.performanceLabel}>Total Recommendations</h3>
              <div className={styles.performanceValue}>150</div>
            </div>
            <div className={styles.performanceCard}>
              <h3 className={styles.performanceLabel}>Successful Recommendations</h3>
              <div className={styles.performanceValue}>125</div>
            </div>
            <div className={styles.performanceCard}>
              <h3 className={styles.performanceLabel}>Average Performance</h3>
              <div className={styles.performanceValue}>12.3%</div>
            </div>
          </div>
        </div>

        <div className={styles.transactionsSection}>
          <h2 className={styles.sectionTitle}>Recommendations History</h2>
          <RecomendationsList />
        </div>
      </main>
    </div>
  );
};

export default ExplorerView;
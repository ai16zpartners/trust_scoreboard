import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import styles from './ProfileTotals.module.css';

type View = 'profile' | 'holdings';

interface ProfileTotalsProps {
  onViewChange?: (view: View) => void;
}

interface MetricsData {
  trustScore: number | null;
  successRate: number | null;
  transparency: number | null;
  shillingScore: number | null;
  recommendations: number | null;
  rank: number | null;
  totalPartners: number | null;
  userHoldings: number | null;
}

const displayMetric = (value: number | null): string => {
  return value !== null ? value.toString() : "-";
};

const formatDate = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`;
};

const getLastThirtyDaysRange = (): string => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 30);

  return `${formatDate(start)} - ${formatDate(end)}`;
};

const ProfileTotals: NextPage<ProfileTotalsProps> = ({ onViewChange = () => { } }) => {
  const { publicKey } = useWallet();
  const [activeView, setActiveView] = useState<View>('profile');
  const [metrics, setMetrics] = useState<MetricsData>({
    trustScore: null,
    successRate: null,
    transparency: null,
    shillingScore: null,
    recommendations: null,
    rank: null,
    totalPartners: null,
    userHoldings: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!publicKey) return;

      try {
        setIsLoading(true);

        const dashboardResponse = await fetch('/api/dashboard');
        const dashboardData = await dashboardResponse.json();

        const holdingsResponse = await fetch('/api/userHoldings');
        const holdingsData = await holdingsResponse.json();

        if (dashboardData.partners && dashboardData.trustScores) {
          const userPartner = dashboardData.partners.find(
            (p: any) => p.owner.toLowerCase() === publicKey.toString().toLowerCase()
          );

          const userRank = userPartner
            ? dashboardData.partners.findIndex(
              (p: any) => p.owner.toLowerCase() === publicKey.toString().toLowerCase()
            ) + 1
            : 0;

          setMetrics(prev => ({
            ...prev,
            trustScore: dashboardData.trustScores[publicKey.toString()] || 0,
            rank: userRank,
            totalPartners: dashboardData.partners.length,
            userHoldings: holdingsData.holdings || 0
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [publicKey]);

  const handleViewChange = useCallback((view: View) => {
    setActiveView(view);
    onViewChange(view);
  }, [onViewChange]);

  const dateRange = getLastThirtyDaysRange();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(0)}m+`;
    }
    return num.toString();
  };

  if (!isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricContent}>
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center gap-[14px]'>
                <Image src="/heart.svg" alt="Trust Score" width={32} height={32} />
                <div className={styles.metricInfo}>
                  <div className={`${styles.label}`}>Trust Score</div>
                  <p className={styles.metricsAi}>Assigned from AI Marc</p>
                </div>
              </div>
              {/* <div className={`text-[#FF4463] ${styles.trustScorevalue}`}>{metrics.trustScore}</div> */}
              <Image src="/lock-03.svg" alt="Rank" width={20} height={20} />
            </div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricContent}>
            <Image src="/green_flame.svg" alt="Rank" width={32} height={32} />
            <div className={styles.metricInfo}>
              <div className={`text-[#68CE67] ${styles.value}`}>{displayMetric(metrics.rank)}</div>
              <div className={styles.label}>Rank</div>
            </div>
          </div>
        </div>

        {/* <div className={styles.metricCard}>
          <div className={styles.metricContent}>
            <Image src="/blue_flame.svg" alt="Tokens" width={24} height={24} />
            <div className={styles.metricInfo}>
              <div className={`text-[#3B82F7] ${styles.value}`}>{formatNumber(metrics.userHoldings)}</div>
              <div className={styles.label}>Tokens</div>
            </div>
          </div>
        </div> */}

        <div className={styles.metricCard}>
          <div className={styles.metricContent}>
            <Image src="/thumb.svg" alt="Success Rate" width={32} height={32} />
            <div className={styles.metricInfo}>
              <div className={`text-[#935DEA] ${styles.value}`}>{displayMetric(metrics.successRate)}</div>
              <div className={styles.label}>Success Rate</div>
            </div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricContent}>
            <Image src="/yellow_flame.svg" alt="Shills" width={32} height={32} />
            <div className={styles.metricInfo}>
              <div className={`text-[#F2A33C] ${styles.value}`}>{displayMetric(metrics.shillingScore)}</div>
              <div className={styles.label}>Shills</div>
            </div>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricContent}>
            <Image src="/clock.svg" alt="Joined" width={32} height={32} />
            <div className={styles.metricInfo}>
              <div className={`text-[#4FADF8] ${styles.value}`}>{displayMetric(metrics.recommendations)}</div>
              <div className={styles.label}>Joined</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTotals;

import type { FC } from 'react';
import { useState, useEffect, useCallback } from 'react';
import Image from "next/image";
import { useWallet } from '@solana/wallet-adapter-react';
import { useSession } from 'next-auth/react';
import styles from './LeaderboardPartners.module.css';
import { useMediaQuery } from 'react-responsive';

interface Partner {
  rank: number;
  address: string;
  trustScore: number;
  holdings: number;
  displayAddress: string;
}

interface PartnerWithUser extends Partner {
  isCurrentUser?: boolean;
  discordName?: string;
  discordImage?: string;
}

const SkeletonRow = () => (
  <div className={`${styles.row1} animate-pulse`}>
    <div className={styles.rowChild}>
      <div className="w-8 h-8 bg-[#3C3C3C] rounded-full" />

    </div>
  </div>
);

const LeaderboardPartners: FC = () => {
  const { publicKey } = useWallet();
  const { data: session } = useSession();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [partners, setPartners] = useState<PartnerWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const SKELETON_ROWS = 5;

  const formatAddress = useCallback((address: string) => {
    if (isMobile) {
      return `${address.slice(0, 3)}...${address.slice(-2)}`;
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [isMobile]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        if (!data.partners?.length || !data.trustScores) {
          throw new Error('Invalid or empty data received');
        }

        let sortedPartners = data.partners
          .filter(partner => partner && partner.amount >= 100000)
          .sort((a, b) => b.amount - a.amount)
          .map((partner, index) => ({
            rank: index + 1,
            address: partner.owner,
            displayAddress: formatAddress(partner.owner),
            trustScore: data.trustScores?.[partner.owner] || 0,
            holdings: partner.amount,
            isCurrentUser: publicKey ? partner.owner === publicKey.toString() : false,
            discordName: partner.owner === publicKey?.toString() ? session?.user?.name : undefined,
            discordImage: partner.owner === publicKey?.toString() ? session?.user?.image : undefined,
          }));

        if (publicKey) {
          const currentUserIndex = sortedPartners.findIndex(p => p.isCurrentUser);
          if (currentUserIndex > -1) {
            const currentUser = sortedPartners[currentUserIndex];
            sortedPartners.splice(currentUserIndex, 1);
            sortedPartners.unshift(currentUser);
          }
        }

        setPartners(sortedPartners);
        setError(null);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message);

        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 1000 * (retryCount + 1));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [retryCount, isMobile, formatAddress, publicKey, session]);

  const getRankDisplay = (rank: number) => {
    switch (rank) {
      case 1:
        return <div className={styles.medalEmoji}>🥇</div>;
      case 2:
        return <div className={styles.medalEmoji}>🥈</div>;
      case 3:
        return <div className={styles.medalEmoji}>🥉</div>;
      default:
        return <div className={styles.text}>#{rank}</div>;
    }
  };

  const getTrustScoreClass = (rank: number): string => {
    switch (rank) {
      case 1:
        return styles.trustScoreGold;
      case 2:
        return styles.trustScoreSilver;
      case 3:
        return styles.trustScoreBronze;
      default:
        return styles.text3;
    }
  };

  const renderPartnerRow = (partner: PartnerWithUser) => (
    <div
      key={partner.address}
      className={`${styles.row1} ${partner.isCurrentUser ? styles.currentUserRow : ''}`}
    >
      <div className={styles.rowChild}>
        <Image
          width={34}
          height={34}
          alt="Partner avatar"
          src={partner.discordImage || "/noname.svg"}
          className={styles.avatarImage}
        />
        <div className={styles.textParent}>
          <div className={styles.text1}>
            {partner.discordName || partner.displayAddress}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className={styles.textWrapper}>
          {partner.trustScore === 0 ? (
            <div className={styles.tooltipContainer}>
              <Image
                src="/null.svg"
                alt="Null trust score"
                width={20}
                height={20}
                className={`invert brightness-0 transition-all duration-300 ${styles.trustScoreImage}`}
              />
              <span className={styles.tooltip}>
                AI Marc is Calculating Trust
              </span>
            </div>
          ) : (
            <div className={getTrustScoreClass(partner.rank)}>
              {partner.trustScore.toFixed(1)}
            </div>
          )}
        </div>
        {
          partner.trustScore ? (<div className={styles.rankWrapper}>
            {getRankDisplay(partner.rank)}
          </div>) : null
        }

      </div>
    </div>
  );

  return (
    <div className={styles.frameParent}>
      {isLoading ? (
        <>
          {[...Array(SKELETON_ROWS)].map((_, index) => (
            <SkeletonRow key={index} />
          ))}
        </>
      ) : error ? (
        <div className={styles.errorMessage}>
          Error loading partners. Retrying... ({retryCount}/{MAX_RETRIES})
        </div>
      ) : !partners?.length ? (
        <div className={styles.emptyMessage}>No partners found</div>
      ) : (
        <>{partners.map(renderPartnerRow)}</>
      )}
    </div>
  );
};

export default LeaderboardPartners;
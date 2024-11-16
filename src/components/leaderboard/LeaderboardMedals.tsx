import { FC } from 'react';
import Image from 'next/image';
import { useDashboard } from '../../hooks/useDashboard';
import styles from './LeaderboardMedals.module.css';

const SkeletonMedal: FC<{ position: number }> = ({ position }) => {
  const isFirstPlace = position === 2;
  const size = isFirstPlace ? '120px' : '80px';

  const getMedalClass = (index: number) => {
    switch (index) {
      case 2:
        return styles.gold;
      case 1:
        return styles.silver;
      default:
        return styles.bronze;
    }
  };

  const displayPosition = position === 2 ? '1' : position === 1 ? '2' : '3';

  return (
    <div
      className={`${styles.medalHolder} ${
        isFirstPlace ? styles.firstPlace : ''
      }`}
    >
      <div
        className={`${styles.imageWrapper} ${
          isFirstPlace ? styles.firstPlaceImage : ''
        }`}
      >
        <div
          className={`${styles.medal} ${getMedalClass(position)} ${
            isFirstPlace ? styles.firstPlacemedal : ''
          }`}
        >
          {displayPosition}
        </div>
        <div
          className={`${styles.skeletonCircle}`}
          style={{
            width: size,
            height: size,
          }}
        />
      </div>
    </div>
  );
};

const LeaderboardMedals: FC = () => {
  const { data: dashboardData, isLoading } = useDashboard();

  const topThree = (dashboardData?.partners || [])
    .filter(
      (partner) =>
        partner && typeof partner.rank === 'number' && !isNaN(partner.rank)
    )
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 3);

  const reorderedTopThree = [
    topThree[1], // 2nd place
    topThree[0], // 1st place
    topThree[2], // 3rd place
  ];

  const getMedalClass = (index: number) => {
    switch (index) {
      case 1:
        return styles.gold;
      case 0:
        return styles.silver;
      default:
        return styles.bronze;
    }
  };

  console.log('isLoading', isLoading);
  console.log('dashboardData', dashboardData);

  return (
    <div className={styles.container}>
      {isLoading || !dashboardData
        ? [1, 2, 3].map((position) => (
            <SkeletonMedal key={position} position={position} />
          ))
        : reorderedTopThree.map((user, index) => {
            const isFirstPlace = index === 1;
            const medalClass = getMedalClass(index);

            return (
              <div
                key={user?.id || index}
                className={`${styles.medalHolder} ${
                  isFirstPlace ? styles.firstPlace : ''
                }`}
              >
                <div
                  className={`${styles.imageWrapper} ${
                    isFirstPlace ? styles.firstPlaceImage : ''
                  }`}
                >
                  <div
                    className={`${styles.medal} ${medalClass} ${
                      isFirstPlace ? styles.firstPlacemedal : ''
                    }`}
                  >
                    {user?.rank}
                  </div>
                  <div className={`${styles.imageBorder} ${medalClass}`}>
                    {user?.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt={
                          user && user.name
                            ? user.name
                            : `Position ${user?.rank}`
                        }
                        width={isFirstPlace ? 120 : 80}
                        height={isFirstPlace ? 120 : 80}
                        className={styles.userImage}
                      />
                    ) : (
                      <div
                        className={`${styles.placeholderImage}`}
                        style={{
                          width: index === 1 ? '80px' : '64px',
                          height: index === 1 ? '80px' : '64px',
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.userInfo}>
                  <span className={styles.name}>
                    {user?.name ? user.name : `Position ${user?.rank}`}
                  </span>
                  <div className={`${styles.scoreWrapper} ${medalClass}`}>
                    <span
                      className={`${styles.score} ${
                        isFirstPlace ? styles.firstPlaceScore : ''
                      }`}
                    >
                      {user?.trustScore ? user.trustScore.toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default LeaderboardMedals;

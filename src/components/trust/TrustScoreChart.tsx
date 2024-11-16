import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock data - replace with real data later
const mockData = {
  trustScore: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [75, 78, 80, 82, 84, 85.5],
  },
  trustRank: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [200, 180, 165, 155, 145, 140],
  }
};

const TrustScoreChart: FC = () => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#242424',
          font: {
            weight: 600
          }
        }
      },
    },
    scales: {
      y: {
        grid: {
          color: '#E8E3D6'
        },
        ticks: {
          color: '#242424'
        }
      },
      x: {
        grid: {
          color: '#E8E3D6'
        },
        ticks: {
          color: '#242424'
        }
      }
    }
  };

  const trustScoreData = {
    labels: mockData.trustScore.labels,
    datasets: [
      {
        label: 'Trust Score',
        data: mockData.trustScore.data,
        borderColor: '#F98C12',
        backgroundColor: 'rgba(249, 140, 18, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Trust Rank',
        data: mockData.trustRank.data,
        borderColor: '#242424',
        backgroundColor: 'rgba(36, 36, 36, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  return (
    <div className="chart-container" style={{ height: '300px', marginBottom: '32px' }}>
      <Line options={options} data={trustScoreData} />
    </div>
  );
};

export default TrustScoreChart;
// FILE: src/views/HomeView.tsx
import { FC, useState } from 'react';
import LeaderboardTotals from '../components/leaderboard/LeaderboardTotals';
import LeaderboardPartners from '../components/leaderboard/LeaderboardPartners';
import LeaderboardHoldings from '../components/leaderboard/LeaderboardHoldings';

export const HomeView: FC = () => {
  const [activeView, setActiveView] = useState<'partners' | 'holdings'>('partners');

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <div className="md:hero mx-auto p-2">
        <div className="md:hero-content flex flex-col w-full">
          {/* Leaderboard Section */}
          <div className="w-full max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-black bg-clip-text text-black mb-4">
              Leaderboard
            </h2>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveView('partners')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  activeView === 'partners'
                  ? 'bg-[#B5AD94] text-white' // Active state
                  : 'bg-[#E8E3D500] text-slate-700' // Inactive state
                }`}
              >
                Partners
              </button>
              <button
                onClick={() => setActiveView('holdings')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  activeView === 'holdings'
                  ? 'bg-[#B5AD94] text-white' // Active state
                  : 'bg-[#E8E3D500] text-slate-700' // Inactive state
                }`}
              >
                Holdings
              </button>
            </div>
            <LeaderboardTotals />
            <div className="relative group">
                {activeView === 'partners' ? <LeaderboardPartners /> : <LeaderboardHoldings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
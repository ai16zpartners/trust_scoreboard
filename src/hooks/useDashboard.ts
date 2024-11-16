import { useState, useEffect } from 'react';
import { get } from '../utils/axios';

const fetchHighestRankedUsers = async () => {
  console.log("sdasdsdadasd=?????????");
  
  try {
    const response = await get('/user/highestRankedUsers');
    return response.data;
  } catch (error) {
    console.error('Error fetching highest ranked users:', error);
    throw error;
  }
};



interface Partner {
  trustScore: number;
  avatarUrl?: string;
  rank?:number
  id?: string;
  name?: string;
}

interface DashboardData {
  partners: Partner[];
}

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const partners = await fetchHighestRankedUsers();
  
        
        setData({partners});
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch dashboard data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  

  return { data, isLoading, error };
};
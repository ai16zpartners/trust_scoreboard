export interface Partner {
  wallet: string;
  trustScore: number;
  image?: string;
}

export interface DashboardData {
  partners: Partner[];
} 
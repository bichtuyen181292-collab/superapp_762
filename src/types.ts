export type FeatureTab = 
  | 'faq' 
  | 'download' 
  | 'games' 
  | 'savings' 
  | 'loan' 
  | 'products' 
  | 'branches';

export interface GuideStep {
  step: number;
  title: string;
  description: string;
  image?: string;
}

export interface GuideItem {
  id: string;
  title: string;
  summary: string;
  badge?: string;
  videoUrl?: string;
  steps: GuideStep[];
}

export interface FeaturedProduct {
  id: string;
  title: string;
  category: 'ca-nhan' | 'ho-kinh-doanh' | 'doanh-nghiep' | 'uu-dai' | 'dau-gia';
  categoryLabel: string;
  imageUrl: string;
  tag: string;
  description?: string;
}

export interface BranchOffice {
  id: number;
  name: string;
  branchName: string;
  address: string;
  imageUrl: string;
  googleMapsUrl: string;
  phone: string;
}

export interface LoanScheduleRow {
  period: number;
  dueDate: string;
  beginningBalance: number;
  principal: number;
  interest: number;
  totalPayment: number;
  remainingBalance: number;
}

export interface GameVoucher {
  id: string;
  code: string;
  game: 'flappy' | 'snake';
  reward: string;
  score: number;
  createdAt: string;
}

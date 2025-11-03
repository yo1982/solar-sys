
export type SystemType = 'agricultural' | 'home';

export interface AgriculturalData {
  type: 'agricultural';
  pumpType: 'submersible' | 'motor';
  power: number;
  governorate: string;
  region: string;
}

export interface HomeData {
  type: 'home';
  dayAmperage: number;
  nightAmperage: number;
  hasNationalGrid: boolean;
  outageHours: number;
  governorate: string;
  region: string;
}

export interface SystemProposal {
  name: string;
  rationale: string;
  components: {
    name: string;
    specification: string;
  }[];
  protection: string;
  warranty: string;
  price: string;
}

export interface AIResponse {
  economy: SystemProposal;
  premium: SystemProposal;
}

export type CatalogProductCard = {
  id: string;
  name: string;
  category: string;
  details: string;
  dailyRate: number;
  deposit: number;
  imageSrc: string;
  availability: string;
  unavailable: boolean;
  mobile?: boolean;
  mobileCategory?: string;
  mobileDetails?: string;
};

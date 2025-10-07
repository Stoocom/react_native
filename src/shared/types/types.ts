export interface Shift {
  id: string;
  logo: string | null;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: {
    id: number;
    name: string;
    nameGt5: string;
    nameLt5: string;
    nameOne: string;
  }[];
  priceWorker: number;
  bonusPriceWorker: number;
  customerFeedbacksCount: string;
  customerRating: number | null;
  isPromotionEnabled: boolean;
}
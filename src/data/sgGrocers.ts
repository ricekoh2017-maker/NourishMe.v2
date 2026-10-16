import { GrocerStore } from '../types/seniorDiet';

export interface SgGrocerInfo {
  id: GrocerStore;
  name: string;
  tagline: string;
  deliverySlots: string;
  freeDeliveryThreshold: number;
  seniorDiscountInfo: string;
  seniorDiscountDays: string[];
  seniorDiscountPercent: number;
  bestFor: string[];
  websiteUrl: string;
}

export const SG_GROCERS: Record<GrocerStore, SgGrocerInfo> = {
  fairprice: {
    id: 'fairprice',
    name: 'FairPrice Online',
    tagline: 'Singapore’s National Co-op Grocer',
    deliverySlots: 'Same day & Next day 2-hr slots',
    freeDeliveryThreshold: 79,
    seniorDiscountInfo: 'Pioneer Generation 3% (Mon & Wed), Merdeka Gen 3% (Wed), Silver 2% (Tue) in stores & online linked card',
    seniorDiscountDays: ['MON', 'TUE', 'WED'],
    seniorDiscountPercent: 3,
    bestFor: ['HPB Healthier Choice items', 'Affordable house-brand brown rice', 'Pre-cleaned fresh chicken'],
    websiteUrl: 'https://www.fairprice.com.sg',
  },
  shengsiong: {
    id: 'shengsiong',
    name: 'Sheng Siong',
    tagline: 'All for You, Fresh Everyday',
    deliverySlots: 'Next-day delivery across Singapore',
    freeDeliveryThreshold: 100,
    seniorDiscountInfo: 'Senior Citizen 4% Discount every Tuesday & Wednesday (Singapore Citizens & PRs 60+)',
    seniorDiscountDays: ['TUE', 'WED'],
    seniorDiscountPercent: 4,
    bestFor: ['Fresh Batang (Mackerel) & Threadfin', 'Very fresh leafy greens', 'Dried Chinese herbs & wolfberries'],
    websiteUrl: 'https://shengsiong.com.sg',
  },
  redmart: {
    id: 'redmart',
    name: 'RedMart (Lazada)',
    tagline: 'Reliable Scheduled Delivery',
    deliverySlots: '2-hour morning & afternoon windows',
    freeDeliveryThreshold: 60,
    seniorDiscountInfo: 'Senior friendly scheduled delivery so you never have to carry heavy bags or rice sacks upstairs',
    seniorDiscountDays: [],
    seniorDiscountPercent: 0,
    bestFor: ['Heavy rice bags & pantry staples', 'Organic silken tofu & pasteurized eggs', 'Specialty low-sodium broth'],
    websiteUrl: 'https://www.lazada.sg/redmart',
  },
  coldstorage: {
    id: 'coldstorage',
    name: 'Cold Storage / CS Fresh',
    tagline: 'Fresh Food People & Premium Cuts',
    deliverySlots: 'Same day 2-hr slots',
    freeDeliveryThreshold: 80,
    seniorDiscountInfo: 'UOB Delight & senior privilege rewards, 3% senior discounts on selected days',
    seniorDiscountDays: ['WED'],
    seniorDiscountPercent: 3,
    bestFor: ['Air-flown Norwegian salmon fillets', 'Australian low-GI sweet potatoes', 'Clean bone-in soup packs'],
    websiteUrl: 'https://coldstorage.com.sg',
  },
  wetmarket: {
    id: 'wetmarket',
    name: 'Local SG Wet Market',
    tagline: 'Tekka, Tiong Bahru, Chinatown & Bedok',
    deliverySlots: 'Morning in-person visit (7 AM - 11 AM)',
    freeDeliveryThreshold: 0,
    seniorDiscountInfo: 'Personal fishmonger service: request bones removed, scaled, sliced thin for steaming!',
    seniorDiscountDays: ['TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    seniorDiscountPercent: 5,
    bestFor: ['Custom de-boned fish for elderly', 'Small portion bunches of ginger/coriander', 'Fresh made silken beancurd'],
    websiteUrl: '#wet-market-guide',
  },
};

import { Cat } from './types';

const CATAAS_BASE_URL = 'https://cataas.com';

export const fetchCats = async (count: number = 20): Promise<Cat[]> => {
  // Generate random cat images
  const timestamp = Date.now();
  return Array.from({ length: count }, (_, i) => ({
    id: `cat-${timestamp}-${i}`,
    imageUrl: `${CATAAS_BASE_URL}/cat?${timestamp}${i}`,
  }));
};

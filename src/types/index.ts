
export interface Car {
  _id: string;
  title: string;
  make: string;
  model: string;
  year: number | string;
  price: number | string;
  mileage: number | string;
  condition: string;
  bodyType: string;
  description: string;
  location: string;
  exteriorColor?: string;
  interiorColor?: string;
  transmission?: string;
  fuelType?: string;
  features?: string[];
  images?: { url: string; public_id: string }[];
  status: 'active' | 'sold' | 'pending' | 'draft';
  seller?: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt: string;
}

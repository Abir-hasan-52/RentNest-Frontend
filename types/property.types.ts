export interface PropertyImage {
  id: string;
  imageUrl: string;
}

export interface PropertyCategory {
  id: string;
  name: string;
  description: string;
}

export interface PropertyLandlord {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string | null;
  address: string | null;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  area: number;
  rent: string;
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  parking: boolean;
  availableFrom: string;
  status: "AVAILABLE" | "RENTED" | "UNAVAILABLE";
  createdAt: string;
  category: PropertyCategory;
  images: PropertyImage[];
  landlord: PropertyLandlord;
}

export interface PropertyListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Property[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface PropertyQueryParams {
  page?: string;
  limit?: string;
  search?: string;
  city?: string;
  categoryId?: string;
  bedrooms?: string;
  furnished?: string;
  parking?: string;
  minRent?: string;
  maxRent?: string;
  sortBy?: string;
  sortOrder?: string;
}
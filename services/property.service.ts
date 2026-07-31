// import { PropertyListResponse, PropertyQueryParams } from "@/types/property.type";

import {
  PropertyListResponse,
  PropertyQueryParams,
  PropertyResponse,
  PropertyReviewResponse,
} from "@/types/property.types";

const API_URL = process.env.BACKEND_API_URL;

export async function getProperties(
  params: PropertyQueryParams,
): Promise<PropertyListResponse> {
  const query = new URLSearchParams();

  if (params.page) query.set("page", params.page);
  if (params.limit) query.set("limit", params.limit);
  if (params.search) query.set("search", params.search);
  if (params.city) query.set("city", params.city);
  if (params.categoryId) query.set("categoryId", params.categoryId);
  if (params.bedrooms) query.set("bedrooms", params.bedrooms);
  if (params.furnished) query.set("furnished", params.furnished);
  if (params.parking) query.set("parking", params.parking);
  if (params.minRent) query.set("minRent", params.minRent);
  if (params.maxRent) query.set("maxRent", params.maxRent);
  if (params.sortBy) query.set("sortBy", params.sortBy);
  if (params.sortOrder) query.set("sortOrder", params.sortOrder);

  const res = await fetch(
    `${API_URL}/api/public/properties?${query.toString()}`,
    {
      next: {
        revalidate: 60,
        tags: ["properties"],
      },
    },
  );

  const result = await res.json();
//   console.log(result);
  return result;
}

// import { PropertyResponse } from "@/types/property.types";

export async function getPropertyById(
  id: string
): Promise<PropertyResponse> {
  const res = await fetch(
    `${API_URL}/api/public/properties/${id}`,
    {
      next: {
        revalidate: 60,
        tags: ["properties"],
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch property");
  }
  const result = await res.json();
  console.log(result)
  return result;
}

export async function getPropertyReviews(
  id: string
): Promise<PropertyReviewResponse> {
  const res = await fetch(
    `${API_URL}/api/public/properties/${id}/reviews`,
    {
      next: {
        revalidate: 60,
        tags: [`property-reviews-${id}`],
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch property reviews.");
  }

  return res.json();
}

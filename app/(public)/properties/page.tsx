import { getProperties } from "@/services/property.service";

import { SearchX } from "lucide-react";
// import { PropertyFilters } from "../_components/PropertyFilters";
import { PropertyCard } from "../_components/PropertyCard";
import { PropertyPagination } from "../_components/PropertyPagination";
import PropertyFilters from "../_components/PropertyFilters";

type PageProps = {
  searchParams: Promise<{
    page?: string;
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
  }>;
};

export default async function PropertiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ?? "1";

  const result = await getProperties({ ...params, page, limit: "9" });
  const properties = result.data ?? [];
  const totalPages = result.meta
    ? Math.ceil(result.meta.total / result.meta.limit)
    : 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Find your next home
        </h1>
        <p className="text-muted-foreground">
          {result.meta?.total ?? 0} properties available
        </p>
      </div>

      <div className="mb-8">
        <PropertyFilters />
      </div>

      {properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 py-20 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground" />
          <p className="font-medium">No properties found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <PropertyPagination currentPage={Number(page)} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
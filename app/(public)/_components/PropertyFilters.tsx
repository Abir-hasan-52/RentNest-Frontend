"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  { value: "createdAt:desc", label: "Newest First" },
  { value: "rent:asc", label: "Rent: Low to High" },
  { value: "rent:desc", label: "Rent: High to Low" },
];

const bedroomOptions = ["1", "2", "3", "4", "5"];

export default function PropertyFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialFilters = useMemo(
    () => ({
      search: searchParams.get("search") ?? "",
      city: searchParams.get("city") ?? "",
      bedrooms: searchParams.get("bedrooms") ?? "any",
      minRent: searchParams.get("minRent") ?? "",
      maxRent: searchParams.get("maxRent") ?? "",
      furnished: searchParams.get("furnished") ?? "any",
      parking: searchParams.get("parking") ?? "any",
      sort: `${searchParams.get("sortBy") ?? "createdAt"}:${
        searchParams.get("sortOrder") ?? "desc"
      }`,
    }),
    [searchParams],
  );

  const [filters, setFilters] = useState(initialFilters);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (filters.search.trim()) {
      params.set("search", filters.search.trim());
    }

    if (filters.city.trim()) {
      params.set("city", filters.city.trim());
    }

    if (filters.bedrooms !== "any") {
      params.set("bedrooms", filters.bedrooms);
    }

    if (filters.minRent) {
      params.set("minRent", filters.minRent);
    }

    if (filters.maxRent) {
      params.set("maxRent", filters.maxRent);
    }

    if (filters.furnished !== "any") {
      params.set("furnished", filters.furnished);
    }

    if (filters.parking !== "any") {
      params.set("parking", filters.parking);
    }

    const [sortBy, sortOrder] = filters.sort.split(":");

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      city: "",
      bedrooms: "any",
      minRent: "",
      maxRent: "",
      furnished: "any",
      parking: "any",
      sort: "createdAt:desc",
    });

    router.push(pathname);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleApplyFilters();
      }}
      className="space-y-4 rounded-2xl border border-border/60 bg-card/60 p-5"
    >
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              search: e.target.value,
            }))
          }
          placeholder="Search by title, city, address..."
          className="h-11 rounded-xl pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {/* City */}
        <Input
          value={filters.city}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              city: e.target.value,
            }))
          }
          placeholder="City"
          className="h-10 w-full rounded-xl sm:w-36"
        />

        {/* Bedrooms */}
        <Select
          value={filters.bedrooms}
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              bedrooms: value,
            }))
          }
        >
          <SelectTrigger className="h-10 w-full rounded-xl sm:w-36">
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="any">Any Beds</SelectItem>

            {bedroomOptions.map((bed) => (
              <SelectItem key={bed} value={bed}>
                {bed} Bed{bed !== "1" ? "s" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Min Rent */}
        <Input
          type="number"
          value={filters.minRent}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              minRent: e.target.value,
            }))
          }
          placeholder="Min Rent"
          className="h-10 w-full rounded-xl sm:w-32"
        />

        {/* Max Rent */}
        <Input
          type="number"
          value={filters.maxRent}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              maxRent: e.target.value,
            }))
          }
          placeholder="Max Rent"
          className="h-10 w-full rounded-xl sm:w-32"
        />

        {/* Furnished */}
        <Select
          value={filters.furnished}
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              furnished: value,
            }))
          }
        >
          <SelectTrigger className="h-10 w-full rounded-xl sm:w-36">
            <SelectValue placeholder="Furnished" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="true">Furnished</SelectItem>
            <SelectItem value="false">Unfurnished</SelectItem>
          </SelectContent>
        </Select>

        {/* Parking */}
        <Select
          value={filters.parking}
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              parking: value,
            }))
          }
        >
          <SelectTrigger className="h-10 w-full rounded-xl sm:w-36">
            <SelectValue placeholder="Parking" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="true">Has Parking</SelectItem>
            <SelectItem value="false">No Parking</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={filters.sort}
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              sort: value,
            }))
          }
        >
          <SelectTrigger className="h-10 w-full rounded-xl sm:w-48">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>

          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button type="submit" className="rounded-xl">
            Apply Filters
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={clearFilters}
            className="rounded-xl"
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>
    </form>
  );
}

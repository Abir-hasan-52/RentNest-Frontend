import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";

import { Property } from "@/types/property.types";

interface PropertyHeaderProps {
  property: Property;
}

export default function PropertyHeader({
  property,
}: PropertyHeaderProps) {
  return (
    <section className="space-y-6">
      {/* Category + Status */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant="secondary"
          className="rounded-full px-3 py-1 text-xs sm:px-4 sm:text-sm"
        >
          {property.category.name}
        </Badge>

        <Badge
          className={`rounded-full px-3 py-1 text-xs text-white sm:px-4 sm:text-sm ${
            property.status === "AVAILABLE"
              ? "bg-green-600 hover:bg-green-600"
              : "bg-red-600 hover:bg-red-600"
          }`}
        >
          {property.status}
        </Badge>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
        {property.title}
      </h1>

      {/* Address + Available Date */}
      <div className="space-y-3 text-sm text-muted-foreground sm:text-base">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <span>
            {property.address}, {property.city}
          </span>
        </div>

        <div className="flex items-start gap-2">
          <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <span>
            Available From{" "}
            <span className="font-medium text-foreground">
              {new Date(property.availableFrom).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </span>
        </div>
      </div>

      {/* Rent Card */}
      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Monthly Rent
        </p>

        <div className="mt-2 flex flex-wrap items-end gap-2">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            ৳ {Number(property.rent).toLocaleString()}
          </h2>

          <span className="pb-1 text-sm text-muted-foreground">
            / month
          </span>
        </div>
      </div>
    </section>
  );
}
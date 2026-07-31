import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";

// import { IProperty } from "@/types/property.types";

interface PropertyHeaderProps {
  property: IProperty;
}

export default function PropertyHeader({
  property,
}: PropertyHeaderProps) {
  return (
    <div className="space-y-5">
      {/* Category + Status */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className="rounded-full px-4 py-1">
          {property.category.name}
        </Badge>

        <Badge
          className={`rounded-full px-4 py-1 ${
            property.status === "AVAILABLE"
              ? "bg-green-600 hover:bg-green-600"
              : "bg-red-600 hover:bg-red-600"
          }`}
        >
          {property.status}
        </Badge>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {property.title}
      </h1>

      {/* Address */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-5 w-5 text-primary" />

        <span>
          {property.address}, {property.city}
        </span>
      </div>

      {/* Available Date */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <CalendarDays className="h-5 w-5 text-primary" />

        <span>
          Available From:{" "}
          {new Date(property.availableFrom).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Rent */}
      <div className="rounded-2xl border bg-muted/40 p-5">
        <p className="text-sm text-muted-foreground">
          Monthly Rent
        </p>

        <h2 className="mt-2 text-4xl font-bold text-primary">
          ৳ {Number(property.rent).toLocaleString()}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Per Month
        </p>
      </div>
    </div>
  );
}
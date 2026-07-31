import {
  Bath,
  BedDouble,
  CalendarDays,
  Car,
  Home,
  Ruler,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Property } from "@/types/property.types";

interface PropertyInfoProps {
  property: Property;
}

export default function PropertyInfo({
  property,
}: PropertyInfoProps) {
  const info = [
    {
      icon: BedDouble,
      label: "Bedrooms",
      value: property.bedrooms,
    },
    {
      icon: Bath,
      label: "Bathrooms",
      value: property.bathrooms,
    },
    {
      icon: Ruler,
      label: "Area",
      value: `${property.area} sqft`,
    },
    {
      icon: Home,
      label: "Furnished",
      value: property.furnished ? "Yes" : "No",
    },
    {
      icon: Car,
      label: "Parking",
      value: property.parking ? "Available" : "Not Available",
    },
    {
      icon: CalendarDays,
      label: "Available From",
      value: new Date(property.availableFrom).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
  ];

  return (
    <Card className="rounded-3xl border shadow-sm">
      <CardContent className="p-6">
        <h2 className="mb-6 text-2xl font-bold">
          Property Information
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {info.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl border bg-muted/40 p-4 transition hover:bg-muted"
              >
                <div className="rounded-xl bg-primary/10 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.label}
                  </p>

                  <p className="font-semibold">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
"use client";

import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Property } from "@/types/property.types";

interface RequestPropertyCardProps {
  property: Property;
}

export default function RequestPropertyCard({
  property,
}: RequestPropertyCardProps) {
  return (
    <Card className="sticky top-24 rounded-3xl border shadow-lg">
      <CardContent className="space-y-6 p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Monthly Rent
          </p>

          <h2 className="mt-1 text-4xl font-bold text-primary">
            ৳ {Number(property.rent).toLocaleString()}
          </h2>

          <p className="text-sm text-muted-foreground">
            / month
          </p>
        </div>

        <div className="rounded-2xl bg-muted/40 p-4">
          <div className="flex items-center justify-between">
            <span>Status</span>

            <span
              className={`font-semibold ${
                property.status === "AVAILABLE"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {property.status}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />

            <span>
              Available from{" "}
              {new Date(property.availableFrom).toLocaleDateString()}
            </span>
          </div>
        </div>

        <Button
          className="h-12 w-full rounded-xl text-base"
          disabled={property.status !== "AVAILABLE"}
        >
          {property.status === "AVAILABLE"
            ? "Request Property"
            : "Not Available"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Your rental request will be sent directly to the
          landlord for approval.
        </p>
      </CardContent>
    </Card>
  );
}
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Property } from "@/types/property.types";
import { Bath, Bed, MapPin, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function PropertyCard({ property }: { property: Property }) {
  const coverImage = property.images[0]?.imageUrl;

  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="group overflow-hidden rounded-2xl border-border/60 p-0 transition-shadow hover:shadow-xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
          <Badge className="absolute top-3 left-3" variant="secondary">
            {property.status === "AVAILABLE" ? "Available" : property.status}
          </Badge>
        </div>

        <div className="space-y-3 p-4">
          <div>
            <h3 className="line-clamp-1 font-semibold text-foreground">
              {property.title}
            </h3>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">
                {property.address}, {property.city}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4" /> {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" /> {property.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <Ruler className="h-4 w-4" /> {property.area} sqft
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-border/60 pt-3">
            <span className="text-lg font-bold text-primary">
              ৳{Number(property.rent).toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground">/mo</span>
            </span>
            <Badge variant="outline" className="text-xs">
              {property.category.name}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}
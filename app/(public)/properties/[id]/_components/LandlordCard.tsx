import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import { PropertyLandlord } from "@/types/property.types";

interface LandlordCardProps {
  landlord: PropertyLandlord;
}

export default function LandlordCard({
  landlord,
}: LandlordCardProps) {
  return (
    <Card className="rounded-3xl border shadow-sm">
      <CardContent className="space-y-6 p-6">
        <h2 className="text-2xl font-bold">
          Property Owner
        </h2>

        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={landlord.profileImage ?? ""}
              alt={landlord.name}
            />

            <AvatarFallback>
              {landlord.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-xl font-semibold">
              {landlord.name}
            </h3>

            <p className="text-sm text-muted-foreground">
              Verified Landlord
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />

            <span>{landlord.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />

            <span>{landlord.phone}</span>
          </div>

          {landlord.address && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />

              <span>{landlord.address}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
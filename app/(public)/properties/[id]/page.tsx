import { notFound } from "next/navigation";

// import { getPropertyById } from "@/services/property/property.service";

import PropertyGallery from "./_components/PropertyGallery";
import PropertyHeader from "./_components/PropertyHeader";
import PropertyInfo from "./_components/PropertyInfo";
import PropertyDescription from "./_components/PropertyDescription";
import LandlordCard from "./_components/LandlordCard";
import RequestPropertyCard from "./_components/RequestPropertyCard";
import { getPropertyById } from "@/services/property.service";

interface PropertyDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  const { id } = await params;

  const response = await getPropertyById(id);

  if (!response.success) {
    notFound();
  }

  const property = response.data;

  return (
    <section className="container mx-auto px-4 py-8 lg:py-10">
      <div className="space-y-8">
        {/* Gallery */}
        <PropertyGallery
          images={property.images}
          title={property.title}
        />

        {/* Header */}
        <PropertyHeader property={property} />

        {/* Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-8 lg:col-span-2">
            <PropertyInfo property={property} />

            <PropertyDescription
              description={property.description}
            />

            <LandlordCard
              landlord={property.landlord}
            />
          </div>

          {/* Right Sidebar */}
          <div>
            <RequestPropertyCard
              property={property}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
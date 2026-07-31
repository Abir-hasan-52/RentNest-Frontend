import { notFound } from "next/navigation";

import {
  getPropertyById,
  getPropertyReviews,
} from "@/services/property.service";

import PropertyGallery from "./_components/PropertyGallery";
import PropertyHeader from "./_components/PropertyHeader";
import PropertyInfo from "./_components/PropertyInfo";
import PropertyDescription from "./_components/PropertyDescription";
import PropertyReviews from "./_components/PropertyReviews";
import LandlordCard from "./_components/LandlordCard";
import RequestPropertyCard from "./_components/RequestPropertyCard";

interface PropertyDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  const { id } = await params;

  const [propertyResponse, reviewResponse] = await Promise.all([
    getPropertyById(id),
    getPropertyReviews(id),
  ]);

  if (!propertyResponse.success) {
    notFound();
  }

  const property = propertyResponse.data;
  const reviewData = reviewResponse.data;

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
          {/* Left Content */}
          <div className="space-y-8 lg:col-span-2">
            <PropertyInfo property={property} />

            <PropertyDescription
              description={property.description}
            />

            <PropertyReviews
              averageRating={reviewData.averageRating}
              totalReviews={reviewData.totalReviews}
              reviews={reviewData.reviews}
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
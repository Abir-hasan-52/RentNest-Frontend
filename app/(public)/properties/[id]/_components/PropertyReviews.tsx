import Image from "next/image";
import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { PropertyReview } from "@/types/property.types";

interface PropertyReviewsProps {
  averageRating: number;
  totalReviews: number;
  reviews: PropertyReview[];
}

export default function PropertyReviews({
  averageRating,
  totalReviews,
  reviews,
}: PropertyReviewsProps) {
  return (
    <Card className="rounded-3xl border shadow-sm">
      <CardContent className="space-y-8 p-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Reviews
            </h2>

            <p className="text-sm text-muted-foreground">
              See what previous tenants are saying.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border bg-muted/40 px-5 py-3">
            <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />

            <div>
              <p className="text-xl font-bold">
                {averageRating.toFixed(1)}
              </p>

              <p className="text-xs text-muted-foreground">
                {totalReviews} Reviews
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed py-12 text-center">
            <Star className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

            <h3 className="text-lg font-semibold">
              No Reviews Yet
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Be the first tenant to review this property.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border p-5"
              >
                {/* User */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={review.tenant.profileImage ?? ""}
                      />

                      <AvatarFallback>
                        {review.tenant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h4 className="font-semibold">
                        {review.tenant.name}
                      </h4>

                      <p className="text-xs text-muted-foreground">
                        {new Date(
                          review.createdAt
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                {review.comment && (
                  <p className="mt-5 leading-7 text-muted-foreground">
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
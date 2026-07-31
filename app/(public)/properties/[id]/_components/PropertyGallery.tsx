"use client";

import { useState } from "react";
import Image from "next/image";

import { PropertyImage } from "@/types/property.types";

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export default function PropertyGallery({
  images,
  title,
}: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(
    images[0]?.imageUrl ||
      "https://placehold.co/1200x800?text=No+Image"
  );

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-16/10 overflow-hidden rounded-3xl border bg-muted">
        <Image
          src={selectedImage}
          alt={title}
          fill
          priority
          className="object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
          {images.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedImage(image.imageUrl)}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                selectedImage === image.imageUrl
                  ? "border-primary"
                  : "border-transparent hover:border-primary/40"
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={title}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
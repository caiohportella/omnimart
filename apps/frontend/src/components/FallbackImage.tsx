"use client";

import React from "react";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { FALLBACK_IMAGE_URL } from "packages/shared/constants";

import { Skeleton } from "./ui/skeleton";

export function FallbackImage(props: ImageProps) {
  const { src, alt, className, ...rest } = props;
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE_URL);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}

      <Image
        {...rest}
        src={imageSrc || FALLBACK_IMAGE_URL}
        alt={alt || "Imagem do produto"}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"}`}
        onError={() => {
          setImageSrc(FALLBACK_IMAGE_URL);
        }}
        onLoadingComplete={() => setIsLoading(false)}
        fill
        priority
      />
    </div>
  );
}

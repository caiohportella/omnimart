"use client";

import React from "react";

import { useState, useEffect } from "react";
import Image, { type ImageProps } from "next/image";
import { FALLBACK_IMAGE_URL } from "packages/shared/constants";


export function FallbackImage(props: ImageProps) {
  const { src, alt, ...rest } = props;
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imageSrc || FALLBACK_IMAGE_URL}
      alt={alt || "Imagem do produto"}
      onError={() => {
        setImageSrc(FALLBACK_IMAGE_URL);
      }}
      unoptimized
    />
  );
}

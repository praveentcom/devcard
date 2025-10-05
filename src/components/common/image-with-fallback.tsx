"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = (error: unknown) => {
    console.error("Image error:", error);
    setHasError(true);
  };

  if (hasError) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
}
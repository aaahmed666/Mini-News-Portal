"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LoadingSkeleton } from "./loading-skeleton";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority = false,
  sizes,
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div
        className={cn("flex items-center justify-center bg-muted", className)}
      >
        <span className="text-xs text-muted-foreground">
          Failed to load image
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <LoadingSkeleton className="h-full w-full" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        priority={priority}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

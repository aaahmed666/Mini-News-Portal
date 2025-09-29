import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "card" | "text" | "avatar" | "button";
  lines?: number;
}

export function LoadingSkeleton({
  className,
  variant = "card",
  lines = 1,
}: LoadingSkeletonProps) {
  if (variant === "card") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="skeleton aspect-video w-full" />
        <div className="space-y-2">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-4 w-1/2" />
        </div>
        <div className="flex items-center gap-2">
          <div className="skeleton h-8 w-8 rounded-full" />
          <div className="skeleton h-4 w-24" />
        </div>
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn("skeleton h-4", i === lines - 1 ? "w-3/4" : "w-full")}
          />
        ))}
      </div>
    );
  }

  if (variant === "avatar") {
    return <div className={cn("skeleton h-8 w-8 rounded-full", className)} />;
  }

  if (variant === "button") {
    return <div className={cn("skeleton h-10 w-24 rounded-md", className)} />;
  }

  return <div className={cn("skeleton", className)} />;
}

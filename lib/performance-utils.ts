export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Intersection Observer hook for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  if (typeof window === "undefined") return null;

  return new IntersectionObserver(callback, {
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  });
}

// Preload critical resources
export function preloadResource(href: string, as: string, type?: string) {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  if (type) link.type = type;

  document.head.appendChild(link);
}

// Image optimization utilities
export function getOptimizedImageSizes(
  variant: "hero" | "featured" | "card" | "avatar"
) {
  const sizeMap = {
    hero: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    featured: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
    card: "(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw",
    avatar: "32px",
  };

  return sizeMap[variant];
}

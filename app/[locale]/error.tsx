"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="space-y-4">
          <div className="mx-auto w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>

          <h1 className="text-4xl font-serif font-bold text-foreground">500</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Something went wrong
          </h2>
          <p className="text-muted-foreground text-pretty">
            An unexpected error occurred. Please try again or contact support if
            the problem persists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <a href="/en">
              <RefreshCw className="mr-2 h-4 w-4" />
              Go back home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="space-y-4">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
            <FileX className="h-12 w-12 text-muted-foreground" />
          </div>

          <h1 className="text-4xl font-serif font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-pretty">
            The page you're looking for doesn't exist. It might have been moved,
            deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/en">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
          >
            <Link href="/en/search">Search articles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="space-y-4">
              <div className="mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-12 w-12 text-red-500" />
              </div>

              <h1 className="text-4xl font-bold text-gray-900">500</h1>
              <h2 className="text-2xl font-semibold text-gray-900">
                Application Error
              </h2>
              <p className="text-gray-600">
                A critical error occurred. Please refresh the page or contact
                support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try again
              </button>
              <a
                href="/en"
                className="inline-flex items-center justify-center rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                Go back home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

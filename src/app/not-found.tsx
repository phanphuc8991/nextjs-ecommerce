import Link from "next/link";

// app/not-found.tsx
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
          <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>

          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-500 mb-8 max-w-md">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go back home
          </Link>
        </div>
      </body>
    </html>
  );
}

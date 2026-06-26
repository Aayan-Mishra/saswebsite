import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md mx-auto space-y-8">
        <div className="space-y-2">
          <p className="text-[8rem] md:text-[10rem] font-bold text-navy-900 leading-none tracking-tighter font-display">
            404
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 tracking-tight">
            Page not found
          </h1>
          <p className="text-lg text-text-secondary mt-3">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link href="/">
            <Button variant="primary" size="lg" icon={<Home className="h-5 w-5" />}>
              Go Home
            </Button>
          </Link>
          <Link href="/marketing/contact">
            <Button variant="secondary" size="lg" icon={<Phone className="h-5 w-5" />}>
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="bg-gradient-to-br from-primary-500 to-secondary-500 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
          Ready to Launch Your Child&apos;s Potential?
        </h2>
        <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto text-balance">
          Join hundreds of successful students. Start your journey today.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/enrol">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary-600 hover:bg-white/90 hover:text-primary-700 border-none shadow-lg shadow-black/10"
            >
              Enrol Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/marketing/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Book a Free Assessment
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

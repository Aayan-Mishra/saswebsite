"use client";

import { useEffect, useRef } from "react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const linkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = linkRef.current?.querySelector("a");
    if (link) link.click();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div ref={linkRef} className="fixed opacity-0">
        <LoginLink>Log in</LoginLink>
      </div>
      <div className="flex items-center gap-3 text-text-secondary">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Redirecting to login...</span>
      </div>
    </div>
  );
}

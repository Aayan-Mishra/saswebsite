"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

// The site key is public (safe to expose). When it's not set, the widget
// renders nothing and forms fall back to no-CAPTCHA so nothing breaks before
// Cloudflare is configured.
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
export const turnstileEnabled = Boolean(TURNSTILE_SITE_KEY);

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    turnstile?: any;
  }
}

/**
 * Cloudflare Turnstile widget (explicit render). Calls `onVerify(token)` on
 * success; the parent includes that token in its form POST for server-side
 * verification. Resets/clears on expiry or error.
 */
export function Turnstile({
  onVerify,
  onExpire,
  className,
}: {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const render = useCallback(() => {
    if (!TURNSTILE_SITE_KEY) return;
    if (!window.turnstile || !containerRef.current) return;
    if (widgetId.current !== null) return; // already rendered
    widgetId.current = window.turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => onVerify(token),
      "expired-callback": () => onExpire?.(),
      "error-callback": () => onExpire?.(),
    });
  }, [onVerify, onExpire]);

  useEffect(() => {
    render();
    return () => {
      if (widgetId.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* noop */
        }
        widgetId.current = null;
      }
    };
  }, [render]);

  if (!TURNSTILE_SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={render}
      />
      <div ref={containerRef} className={className} />
    </>
  );
}

"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

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
 * Cloudflare Turnstile widget (explicit render).
 *
 * The widget is rendered exactly ONCE on mount. Callbacks are read through refs
 * so that parent re-renders (e.g. when the verified token is stored in state)
 * never change effect dependencies — otherwise the widget would be torn down
 * and re-rendered on every keystroke/verify, causing an endless
 * verify → disappear → re-verify loop.
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

  // Always-current callback refs (updated on render, never trigger effects).
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let cancelled = false;
    let pollId: number | undefined;

    const renderWidget = () => {
      if (cancelled) return;
      if (!window.turnstile || !containerRef.current) return;
      if (widgetId.current !== null) return; // already rendered
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => onVerifyRef.current?.(token),
        "expired-callback": () => onExpireRef.current?.(),
        "error-callback": () => onExpireRef.current?.(),
      });
    };

    // Render as soon as the script is available; poll if it hasn't loaded yet.
    if (window.turnstile) {
      renderWidget();
    } else {
      pollId = window.setInterval(() => {
        if (window.turnstile) {
          window.clearInterval(pollId);
          renderWidget();
        }
      }, 200);
    }

    return () => {
      cancelled = true;
      if (pollId) window.clearInterval(pollId);
      if (widgetId.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* noop */
        }
        widgetId.current = null;
      }
    };
    // Intentionally empty deps: render once on mount, clean up on unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!TURNSTILE_SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <div ref={containerRef} className={className} />
    </>
  );
}

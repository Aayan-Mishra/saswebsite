"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
      {/* Background video — 16:9 (1920x1080) sized to fully cover the hero with
          no letterboxing. aspect-ratio holds 16:9 while min-w/h:100% guarantee
          it always overflows the container on the shorter axis (cropped, never
          distorted, never leaving negative space). */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/1206654297?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ aspectRatio: "16 / 9", minWidth: "100%", minHeight: "100%", width: "auto", height: "auto" }}
          allow="autoplay; fullscreen; picture-in-picture"
          title="RAILWAY - WEBSITE"
        />
      </div>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/85 to-navy-950/90" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-500/20 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={item}>
            <Badge variant="primary" size="md" className="mb-6">
              Sydney&apos;s Trusted Tutoring Experts
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="max-w-4xl text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight text-balance leading-[1.05]"
          >
            Helping Students{" "}
            <span className="text-primary-300">Launch Ahead</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg md:text-xl text-navy-200 leading-relaxed text-balance"
          >
            Premium tutoring from Kindergarten to Year 12 — with specialised
            OC, NAPLAN, and Selective preparation that builds confidence and
            delivers real results.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/enrol">
              <Button variant="primary" size="lg">
                Enrol Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/marketing/contact">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Book a Consultation
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-16 md:mt-20 flex justify-center"
          >
            <div className="inline-flex items-center gap-3 rounded-2xl border border-primary-100 bg-white/80 backdrop-blur px-6 py-4 shadow-lg shadow-primary-500/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                <CheckCircle2 className="h-6 w-6 text-primary-600" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-navy-900">98%</p>
                <p className="text-sm text-text-secondary">Success Rate</p>
              </div>
              <div className="mx-4 h-10 w-px bg-border" />
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-white bg-primary-100"
                  />
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-navy-900">2,000+</p>
                <p className="text-xs text-text-secondary">Students</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

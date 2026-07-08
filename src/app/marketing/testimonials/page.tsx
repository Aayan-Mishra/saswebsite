"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, ArrowRight, Users, GraduationCap } from "lucide-react";

const roles = ["All", "Parents", "Students"] as const;

const testimonials = [
  {
    name: "Lisa Chen",
    role: "Parent",
    avatar: "LC",
    color: "bg-primary-100 text-primary-700",
    rating: 5,
    program: "OC Preparation",
    quote:
      "Our daughter went from being anxious about the OC test to walking in on test day with genuine confidence. The structured curriculum and mock tests made all the difference. She secured a place at her first-choice school.",
    outcome: "Child placed at first-choice OC school",
  },
  {
    name: "Mark Thompson",
    role: "Parent",
    avatar: "MT",
    color: "bg-gold-100 text-gold-800",
    rating: 5,
    program: "Selective Preparation",
    quote:
      "We were initially concerned about the cost, but looking back it was the best investment we have made in our son's education. The tutors were incredibly knowledgeable and the progress tracking kept us informed every step of the way.",
    outcome: "Child received Selective offer",
  },
  {
    name: "Lisa Williams",
    role: "Student",
    avatar: "SW",
    color: "bg-secondary-100 text-secondary-700",
    rating: 5,
    program: "HSC Excellence",
    quote:
      "I went from getting 70s in my trial HSC exams to an ATAR of 96.4. The difference was the exam technique — I finally understood how to structure my answers to get the marks I deserved. Cannot thank the team enough.",
    outcome: "ATAR of 96.4",
  },
  {
    name: "Priya Patel",
    role: "Parent",
    avatar: "PP",
    color: "bg-navy-100 text-navy-800",
    rating: 5,
    program: "Primary Excellence",
    quote:
      "My son was struggling with reading in Year 2 and his confidence was at an all-time low. Within one term at Success at School, he was not only catching up but actually enjoying school again. The transformation was remarkable.",
    outcome: "Above year-level reading within 1 term",
  },
  {
    name: "James Mitchell",
    role: "Student",
    avatar: "JM",
    color: "bg-orange-100 text-orange-700",
    rating: 5,
    program: "NAPLAN Success",
    quote:
      "NAPLAN seemed really scary at first, but my tutor made everything make sense. We practised until I felt ready. I got top band in all four areas and my mum nearly cried. Best decision we ever made.",
    outcome: "Top band in all 4 NAPLAN domains",
  },
  {
    name: "Amanda Foster",
    role: "Parent",
    avatar: "AF",
    color: "bg-primary-100 text-primary-700",
    rating: 5,
    program: "Selective Preparation",
    quote:
      "What sets Success at School apart is how much they genuinely care about each child. It is not just about test scores — they build resilience, curiosity, and a genuine love for learning. Our daughter is a different student than she was a year ago.",
    outcome: "Child thriving at Selective school",
  },
  {
    name: "Ryan Kwon",
    role: "Student",
    avatar: "RK",
    color: "bg-gold-100 text-gold-800",
    rating: 4,
    program: "HSC Excellence",
    quote:
      "The small group classes meant I could ask questions without feeling embarrassed. The tutors explained things in a way that actually made sense. Wish I had started earlier than Year 11, but even one year made a huge difference.",
    outcome: "ATAR improved by 15+ points",
  },
  {
    name: "Nicole Bennett",
    role: "Parent",
    avatar: "NB",
    color: "bg-secondary-100 text-secondary-700",
    rating: 5,
    program: "Kindergarten Readiness",
    quote:
      "Starting school can be intimidating, but our son was so well prepared thanks to this program. He knew his letters, numbers, and more importantly, he knew how to listen and follow instructions in a classroom setting. A huge head start.",
    outcome: "Child excelled in Kindergarten entry",
  },
  {
    name: "David Tran",
    role: "Student",
    avatar: "DT",
    color: "bg-navy-100 text-navy-800",
    rating: 5,
    program: "Subject Specialist (Maths)",
    quote:
      "I was completely stuck in Extension 2 Maths. My tutor helped me see the beauty in the problems instead of just the difficulty. I ended up coming first in my cohort. Could not have done it without this place.",
    outcome: "First in cohort for Maths Extension 2",
  },
  {
    name: "Rebecca Morrison",
    role: "Parent",
    avatar: "RM",
    color: "bg-orange-100 text-orange-700",
    rating: 5,
    program: "NAPLAN Success",
    quote:
      "As a teacher myself, I was picky about choosing a tutoring centre. Success at School exceeded my high expectations. The methodology is sound, the tutors are excellent, and the communication with parents is outstanding.",
    outcome: "Both children achieved top NAPLAN bands",
  },
];

export default function TestimonialsPage() {
  const [selectedRole, setSelectedRole] = useState("All");

  const filteredTestimonials = useMemo(() => {
    if (selectedRole === "All") return testimonials;
    return testimonials.filter((t) => t.role === selectedRole);
  }, [selectedRole]);

  return (
    <main>
      <PageHeader
        title="What Families Say"
        description="Hear from parents and students who have experienced the Success at School difference. Real stories, real outcomes."
      />

      <Section background="muted">
        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                selectedRole === role
                  ? "bg-navy-900 text-white shadow-md"
                  : "bg-white text-text-secondary border border-border hover:border-navy-300 hover:text-navy-800"
              }`}
            >
              {role === "All" ? (
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  All Reviews
                </span>
              ) : role === "Parents" ? (
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Parents
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Students
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTestimonials.map((t, index) => (
            <Card key={index} hover padding="lg" className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${t.color} flex items-center justify-center text-lg font-bold`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900">{t.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={t.role === "Parent" ? "primary" : "orange"}
                          size="sm"
                        >
                          {t.role}
                        </Badge>
                        <span className="text-xs text-text-tertiary">{t.program}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="relative flex-1">
                  <Quote className="h-6 w-6 text-primary-200 absolute -top-1 -left-1" />
                  <p className="text-text-secondary leading-relaxed pl-4 italic">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary-500" />
                  <span className="text-sm font-medium text-primary-600">{t.outcome}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Stats + CTA */}
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400">4.9</div>
              <p className="text-navy-200 text-sm mt-1">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400">500+</div>
              <p className="text-navy-200 text-sm mt-1">Five-Star Reviews</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400">98%</div>
              <p className="text-navy-200 text-sm mt-1">Would Recommend</p>
            </div>
          </div>
          <SectionTitle className="text-white">Ready to Write Your Own Success Story?</SectionTitle>
          <SectionSubtitle className="text-navy-200 mx-auto">
            Join thousands of families who trust us to help their children launch ahead.
          </SectionSubtitle>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/enrol">
              <Button variant="gold" size="lg">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/marketing/programs">
              <Button variant="secondary" size="lg">
                Explore Programs
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Map, MapMarker, MarkerContent, MapControls } from "@/components/ui/map";
import { Turnstile, turnstileEnabled } from "@/components/turnstile";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
  Send,
  CheckCircle2,
} from "lucide-react";

const subjectOptions = [
  { value: "general", label: "General Enquiry" },
  { value: "oc", label: "OC Preparation" },
  { value: "naplan", label: "NAPLAN Success" },
  { value: "selective", label: "Selective Preparation" },
  { value: "hsc", label: "HSC Excellence" },
  { value: "primary", label: "Primary Programs" },
  { value: "highschool", label: "High School Programs" },
  { value: "enrolment", label: "Enrolment" },
  { value: "other", label: "Other" },
];

const campusLocations = [
  { name: "Plumpton Neighbourhood Centre", address: "337 Rooty Hill Rd N, Plumpton NSW 2761", lat: -33.7507, lng: 150.8414 },
  { name: "Hassall Grove Neighbourhood Centre", address: "1 Cnr Osmond Court &, 25 Melanie St, Hassall Grove NSW 2761", lat: -33.732, lng: 150.8372 },
  { name: "Breed Australia", address: "T2A Nirimba Education Precinct, Warawara Cct, Quakers Hill NSW 2763", lat: -33.7307, lng: 150.8831 },
];

const campuses = [
  {
    name: "Plumpton Neighbourhood Centre",
    address: "337 Rooty Hill Rd N, Plumpton NSW 2761",
    hours: "Mon-Fri 3:00 PM - 8:00 PM, Sat 9:00 AM - 4:00 PM",
  },
  {
    name: "Hassall Grove Neighbourhood Centre",
    address: "1 Cnr Osmond Court &, 25 Melanie St, Hassall Grove NSW 2761",
    hours: "Mon-Fri 3:00 PM - 8:00 PM, Sat 9:00 AM - 4:00 PM",
  },
  {
    name: "Breed Australia",
    address: "T2A Nirimba Education Precinct, Warawara Cct, Quakers Hill NSW 2763",
    hours: "Mon-Fri 3:00 PM - 8:00 PM, Sat 9:00 AM - 4:00 PM",
  },
];

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "1300 572 428",
    description: "Mon-Fri, 9:00 AM - 6:00 PM",
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@successatschool.com.au",
    description: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Head Office",
    value: "337 Rooty Hill Rd N",
    description: "Plumpton NSW 2761",
  },
  {
    icon: Clock,
    title: "Operating Hours",
    value: "Mon-Fri: 3 PM - 8 PM",
    description: "Saturday: 9 AM - 4 PM",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (turnstileEnabled && !captchaToken) {
      setSubmitError("Please complete the verification below.");
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken: captchaToken }),
      });
      if (!res.ok) throw new Error("Request failed");
    } catch {
      setLoading(false);
      setSubmitError(
        "Something went wrong sending your message. Please try again, or email us directly."
      );
      return;
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main>
        <PageHeader
          title="Message Sent!"
          description="Thank you for reaching out. Our team will get back to you within 24 hours."
        />
        <Section>
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary-500" />
            </div>
            <h2 className="text-2xl font-bold text-navy-900 mb-2">We Have Received Your Message</h2>
            <p className="text-text-secondary mb-8">
              In the meantime, feel free to browse our programs or check our FAQ for immediate answers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/marketing/programs">
                <Button variant="primary" size="lg">
                  Explore Programs
                </Button>
              </Link>
              <Link href="/marketing/faq">
                <Button variant="outline" size="lg">
                  View FAQ
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        title="Get in Touch"
        description="Have a question, want to enrol, or just curious about what we offer? We would love to hear from you."
      >
        <div className="flex justify-center gap-2 mt-6">
          <Badge variant="primary" size="md">Free consultation</Badge>
          <Badge variant="gold" size="md">First session free</Badge>
          <Badge variant="navy" size="md">No obligation</Badge>
        </div>
      </PageHeader>

      <Section background="muted">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Send Us a Message</h2>
              <p className="text-text-secondary mb-6">
                Fill in the form and our team will respond within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="0400 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Select
                    label="Subject"
                    name="subject"
                    id="subject"
                    options={subjectOptions}
                    placeholder="Select a topic"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy-800 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-text placeholder:text-text-tertiary transition-all duration-200 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100 resize-y"
                  />
                </div>
                <Turnstile
                  onVerify={setCaptchaToken}
                  onExpire={() => setCaptchaToken(null)}
                />
                {submitError && (
                  <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200">
                    {submitError}
                  </p>
                )}
                <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full sm:w-auto" icon={!loading ? <Send className="h-5 w-5" /> : undefined}>
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <Card key={item.title} padding="md">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900 text-sm">{item.title}</h3>
                        <p className="text-text-secondary text-sm">{item.value}</p>
                        <p className="text-text-tertiary text-xs">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Campus Locations */}
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-4">Our Campuses</h2>
              <div className="space-y-3">
                {campuses.map((campus) => (
                  <Card key={campus.name} padding="md">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-5 w-5 text-gold-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900 text-sm">{campus.name}</h3>
                        <p className="text-text-secondary text-xs">{campus.address}</p>
                        <p className="text-text-tertiary text-xs mt-1">{campus.hours}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section>
        <div className="text-center mb-8">
          <Badge variant="navy" size="md" className="mb-4">
            Find Us
          </Badge>
          <SectionTitle>Visit a Campus Near You</SectionTitle>
          <SectionSubtitle className="mx-auto">
            All three campuses are conveniently located near public transport with easy access.
          </SectionSubtitle>
        </div>
        <div className="rounded-2xl overflow-hidden border border-border h-[400px]">
          <Map
            className="h-full w-full"
            viewport={{ center: [150.85, -33.74], zoom: 11.5 }}
          >
            <MapControls showZoom />
            {campusLocations.map((loc) => (
              <MapMarker key={loc.name} longitude={loc.lng} latitude={loc.lat}>
                <MarkerContent className="group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white shadow-lg border-2 border-white transition-transform hover:scale-110">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-navy-900 text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap shadow-md">
                      {loc.name}
                    </div>
                  </div>
                </MarkerContent>
              </MapMarker>
            ))}
          </Map>
        </div>
      </Section>

      {/* CTA */}
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto">
          <SectionTitle className="text-white">Not Ready to Call?</SectionTitle>
          <SectionSubtitle className="text-navy-200 mx-auto">
            Browse our programs online or check our FAQ for quick answers to common questions.
          </SectionSubtitle>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/marketing/programs">
              <Button variant="gold" size="lg">
                View Programs
              </Button>
            </Link>
            <Link href="/marketing/faq">
              <Button variant="secondary" size="lg">
                Read FAQ
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}

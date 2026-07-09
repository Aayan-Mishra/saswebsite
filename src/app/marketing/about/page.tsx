import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Heart,
  Users,
  BookOpen,
  Star,
  ArrowRight,
  GraduationCap,
  Lightbulb,
  Shield,
  Award,
} from "lucide-react";
import about from "@/text/about.json";

const teamMembers = [
  { name: about.team.member1Name, role: about.team.member1Role, initials: "LD", color: "bg-primary-100 text-primary-700" },
  { name: about.team.member2Name, role: about.team.member2Role, initials: "JC", color: "bg-gold-100 text-gold-800" },
  { name: about.team.member3Name, role: about.team.member3Role, initials: "ER", color: "bg-secondary-100 text-secondary-700" },
  { name: about.team.member4Name, role: about.team.member4Role, initials: "MT", color: "bg-navy-100 text-navy-800" },
  { name: about.team.member5Name, role: about.team.member5Role, initials: "PS", color: "bg-orange-100 text-orange-700" },
  { name: about.team.member6Name, role: about.team.member6Role, initials: "DK", color: "bg-primary-100 text-primary-700" },
];

const stats = [
  { value: about.stats.stat1Value, label: about.stats.stat1Label, icon: GraduationCap },
  { value: about.stats.stat2Value, label: about.stats.stat2Label, icon: Award },
  { value: about.stats.stat3Value, label: about.stats.stat3Label, icon: Heart },
  { value: about.stats.stat4Value, label: about.stats.stat4Label, icon: Star },
  { value: about.stats.stat5Value, label: about.stats.stat5Label, icon: Users },
  { value: about.stats.stat6Value, label: about.stats.stat6Label, icon: Shield },
];

const values = [
  { icon: Lightbulb, title: about.mission.value1Title, description: about.mission.value1Description },
  { icon: Heart, title: about.mission.value2Title, description: about.mission.value2Description },
  { icon: Target, title: about.mission.value3Title, description: about.mission.value3Description },
  { icon: Users, title: about.mission.value4Title, description: about.mission.value4Description },
];

export const metadata: Metadata = pageMetadata({
  title: about.meta.title,
  description: about.meta.description,
  path: "/marketing/about",
});

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/marketing/about" },
        ])}
      />
      <PageHeader
        title={about.pageHeader.title}
        description={about.pageHeader.description}
      />

      {/* Our Story */}
      <Section background="muted">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="primary" size="md" className="mb-4">
              {about.story.badge}
            </Badge>
            <SectionTitle>{about.story.title}</SectionTitle>
            <SectionSubtitle className="max-w-none">
              {about.story.subtitle}
            </SectionSubtitle>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>{about.story.paragraph1}</p>
              <p>{about.story.paragraph2}</p>
              <p>{about.story.paragraph3}</p>
            </div>
          </div>
          <div className="bg-navy-900 rounded-2xl p-8 md:p-12 text-white">
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed">
              &ldquo;{about.story.quote}&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center font-bold text-lg">
                LD
              </div>
              <div>
                <p className="font-semibold">{about.story.founderName}</p>
                <p className="text-sm text-navy-200">{about.story.founderTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Our Mission */}
      <Section>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="gold" size="md" className="mb-4">
            {about.mission.badge}
          </Badge>
          <SectionTitle>{about.mission.title}</SectionTitle>
          <SectionSubtitle className="mx-auto">
            {about.mission.subtitle}
          </SectionSubtitle>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <Card key={value.title} hover padding="lg" className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <value.icon className="h-7 w-7 text-primary-500" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">{value.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Stats Section */}
      <Section background="primary">
        <div className="text-center mb-12">
          <Badge variant="gold" size="md" className="mb-4 text-navy-900">
            {about.stats.badge}
          </Badge>
          <SectionTitle className="text-white">{about.stats.title}</SectionTitle>
          <SectionSubtitle className="text-primary-100 mx-auto">
            {about.stats.subtitle}
          </SectionSubtitle>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-gold-400" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">{stat.value}</div>
              <p className="text-primary-200 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The Team */}
      <Section>
        <div className="text-center mb-12">
          <Badge variant="navy" size="md" className="mb-4">
            {about.team.badge}
          </Badge>
          <SectionTitle>{about.team.title}</SectionTitle>
          <SectionSubtitle className="mx-auto">
            {about.team.subtitle}
          </SectionSubtitle>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.name} hover padding="lg" className="text-center">
              <div
                className={`w-20 h-20 rounded-2xl ${member.color} flex items-center justify-center mx-auto mb-4 text-2xl font-bold`}
              >
                {member.initials}
              </div>
              <h3 className="text-lg font-bold text-navy-900">{member.name}</h3>
              <p className="text-sm text-text-secondary mt-1">{member.role}</p>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-text-secondary mb-4">
            {about.team.fullTeamNote}
          </p>
          <Link href="/marketing/contact">
            <Button variant="outline" size="lg">
              {about.team.ctaButton}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* Our Approach */}
      <Section background="muted">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="primary" size="md" className="mb-4">
              {about.approach.badge}
            </Badge>
            <SectionTitle>{about.approach.title}</SectionTitle>
            <SectionSubtitle className="max-w-none">
              {about.approach.subtitle}
            </SectionSubtitle>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary-600">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy-900">{about.approach.step1Title}</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {about.approach.step1Description}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary-600">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy-900">{about.approach.step2Title}</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {about.approach.step2Description}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary-600">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy-900">{about.approach.step3Title}</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {about.approach.step3Description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Card padding="lg" className="bg-navy-50 border-navy-100">
            <h3 className="text-xl font-bold text-navy-900 mb-4">{about.approach.differenceTitle}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-navy-900 text-sm">{about.approach.difference1Title}</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {about.approach.difference1Description}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-navy-900 text-sm">{about.approach.difference2Title}</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {about.approach.difference2Description}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-navy-900 text-sm">{about.approach.difference3Title}</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {about.approach.difference3Description}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-secondary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-navy-900 text-sm">{about.approach.difference4Title}</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {about.approach.difference4Description}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto">
          <SectionTitle className="text-white">{about.finalCta.title}</SectionTitle>
          <SectionSubtitle className="text-navy-200 mx-auto">
            {about.finalCta.subtitle}
          </SectionSubtitle>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/enrol">
              <Button variant="gold" size="lg">
                {about.finalCta.primaryButton}
              </Button>
            </Link>
            <Link href="/marketing/contact">
              <Button variant="secondary" size="lg">
                {about.finalCta.secondaryButton}
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}

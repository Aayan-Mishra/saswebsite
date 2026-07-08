"use client";

import { useState, useEffect, useCallback } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Turnstile, turnstileEnabled } from "@/components/turnstile";
import {
  Target,
  BarChart3,
  Award,
  BookOpen,
  GraduationCap,
  Check,
  ChevronLeft,
  ChevronRight,
  Monitor,
  MapPin,
  Users,
  User,
  Edit3,
  ArrowLeft,
  LayoutDashboard,
  Home,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const YEAR_LEVELS = [
  { value: "kindergarten", label: "Kindergarten" },
  { value: "year-1", label: "Year 1" },
  { value: "year-2", label: "Year 2" },
  { value: "year-3", label: "Year 3" },
  { value: "year-4", label: "Year 4" },
  { value: "year-5", label: "Year 5" },
  { value: "year-6", label: "Year 6" },
  { value: "year-7", label: "Year 7" },
  { value: "year-8", label: "Year 8" },
  { value: "year-9", label: "Year 9" },
  { value: "year-10", label: "Year 10" },
  { value: "year-11", label: "Year 11" },
  { value: "year-12", label: "Year 12" },
];

const PROGRAM_GOALS = [
  { value: "general-tutoring", label: "General Tutoring", icon: BookOpen, description: "Ongoing academic support across key subjects" },
  { value: "oc-preparation", label: "OC Preparation", icon: Target, description: "Targeted preparation for the OC placement test" },
  { value: "naplan-preparation", label: "NAPLAN Preparation", icon: BarChart3, description: "Build confidence and skills for NAPLAN" },
  { value: "selective-preparation", label: "Selective Preparation", icon: Award, description: "Comprehensive Selective School test prep" },
  { value: "subject-support", label: "Subject Support", icon: GraduationCap, description: "Focused help in specific subjects" },
];

const SUBJECTS = [
  "English", "Mathematics", "Science", "Reading", "Writing",
  "Creative Writing", "Critical Thinking", "General Ability",
  "HSIE", "Languages", "STEM",
];

const CAMPUSES = [
  { value: "plumpton", label: "Plumpton" },
  { value: "hassall-grove", label: "Hassall Grove" },
  { value: "breed-australia", label: "Breed Australia" },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const PREFERRED_TIMES = [
  { value: "morning", label: "Morning (9am - 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm - 4pm)" },
  { value: "evening", label: "Evening (4pm - 8pm)" },
];

const SESSION_FORMATS = [
  { value: "online", label: "Online", icon: Monitor, description: "Live 1-on-1 via video call" },
  { value: "in-person", label: "In-Person", icon: MapPin, description: "Face-to-face at our campus" },
  { value: "hybrid", label: "Hybrid", icon: Users, description: "Flexible mix of both" },
];

const CLASS_TYPES = [
  { value: "group", label: "Group", icon: Users, description: "Small group with peers" },
  { value: "private", label: "Private", icon: User, description: "Undivided 1-on-1 attention" },
];

interface EnrolmentData {
  yearLevel: string;
  programGoal: string;
  studentFirstName: string;
  studentLastName: string;
  schoolName: string;
  parentFirstName: string;
  parentLastName: string;
  email: string;
  phone: string;
  campus: string;
  subjects: string[];
  learningGoals: string;
  availableDays: string[];
  preferredTime: string;
  sessionFormat: string;
  classType: string;
  bookAssessment: boolean;
  additionalNotes: string;
  termsAccepted: boolean;
}

const initialData: EnrolmentData = {
  yearLevel: "",
  programGoal: "",
  studentFirstName: "",
  studentLastName: "",
  schoolName: "",
  parentFirstName: "",
  parentLastName: "",
  email: "",
  phone: "",
  campus: "",
  subjects: [],
  learningGoals: "",
  availableDays: [],
  preferredTime: "",
  sessionFormat: "",
  classType: "",
  bookAssessment: false,
  additionalNotes: "",
  termsAccepted: false,
};

type Errors = Partial<Record<keyof EnrolmentData, string>>;

function validateStep(step: number, data: EnrolmentData): Errors {
  const errors: Errors = {};
  if (step === 0) {
    if (!data.yearLevel) errors.yearLevel = "Please select a year level";
    if (!data.programGoal) errors.programGoal = "Please select a program goal";
  }
  if (step === 1) {
    if (!data.studentFirstName.trim()) errors.studentFirstName = "Required";
    if (!data.studentLastName.trim()) errors.studentLastName = "Required";
    if (!data.parentFirstName.trim()) errors.parentFirstName = "Required";
    if (!data.parentLastName.trim()) errors.parentLastName = "Required";
    if (!data.email.trim()) errors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email address";
    if (!data.phone.trim()) errors.phone = "Required";
    if (!data.campus) errors.campus = "Please select a campus";
    if (data.subjects.length === 0) errors.subjects = "Select at least one subject";
  }
  if (step === 2) {
    if (data.availableDays.length === 0) errors.availableDays = "Select at least one day";
    if (!data.preferredTime) errors.preferredTime = "Please select a preferred time";
    if (!data.sessionFormat) errors.sessionFormat = "Please select a session format";
    if (!data.classType) errors.classType = "Please select a class type";
  }
  if (step === 3) {
    if (!data.termsAccepted) errors.termsAccepted = "You must accept the terms and conditions";
  }
  return errors;
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-navy-800">
          Step {current + 1} of {total}
        </span>
        <span className="text-sm text-text-tertiary">
          {Math.round(((current + 1) / total) * 100)}% complete
        </span>
      </div>
      <div className="w-full h-2 bg-navy-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={cn(
              "w-3 h-3 rounded-full border-2 transition-all duration-300",
              i === current
                ? "border-primary-500 bg-primary-500 scale-125"
                : i < current
                  ? "border-primary-500 bg-primary-500"
                  : "border-navy-200 bg-white"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-lg mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary-100 p-4 animate-scale-in">
            <CheckCircle2 className="h-16 w-16 text-primary-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 tracking-tight">
            Enrolment Submitted!
          </h2>
          <p className="text-lg text-text-secondary max-w-md mx-auto">
            Thank you for choosing Success at School. We&apos;ll be in touch within 24 hours to confirm your
            placement and schedule a free assessment.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link href="/auth/login">
            <Button variant="primary" size="lg" icon={<LayoutDashboard className="h-5 w-5" />}>
              View Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="secondary" size="lg" icon={<Home className="h-5 w-5" />}>
              Back to Home
            </Button>
          </Link>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-text-tertiary hover:text-primary-600 transition-colors underline underline-offset-4"
        >
          Submit another enrolment
        </button>
      </div>
    </div>
  );
}

function SubjectTag({
  subject,
  selected,
  onToggle,
}: {
  subject: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "rounded-lg border-2 px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
        selected
          ? "border-primary-500 bg-primary-50 text-primary-700"
          : "border-border text-text-secondary hover:border-navy-300 hover:text-navy-800"
      )}
    >
      {subject}
    </button>
  );
}

const STORAGE_KEY = "sas-enrolment-data";
const STEP_KEY = "sas-enrolment-step";

function loadSavedData(): EnrolmentData {
  if (typeof window === "undefined") return initialData;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...initialData, ...parsed };
    }
  } catch {}
  return initialData;
}

function loadSavedStep(): number {
  if (typeof window === "undefined") return 0;
  try {
    const saved = localStorage.getItem(STEP_KEY);
    return saved ? parseInt(saved, 10) : 0;
  } catch {}
  return 0;
}

export default function EnrolPage() {
  const [step, setStep] = useState(loadSavedStep);
  const [data, setData] = useState<EnrolmentData>(loadSavedData);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const totalSteps = 4;

  useEffect(() => {
    if (!submitted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, submitted]);

  useEffect(() => {
    if (!submitted) {
      localStorage.setItem(STEP_KEY, String(step));
    }
  }, [step, submitted]);

  const update = <K extends keyof EnrolmentData>(key: K, value: EnrolmentData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleNext = () => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(3, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    if (turnstileEnabled && !captchaToken) {
      setSubmitError("Please complete the verification below.");
      return;
    }
    setLoading(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/enrol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken: captchaToken }),
      });
      if (!res.ok) {
        const info = await res.json().catch(() => ({}));
        console.error("Enrolment submit failed:", info);
        setLoading(false);
        setSubmitError(
          `Something went wrong submitting your enrolment${
            info.code ? ` (${info.code})` : ""
          }. Please try again, or call us on 1300 572 428 if the problem continues.`
        );
        return;
      }
    } catch (e) {
      console.error("Enrolment submit network error:", e);
      setLoading(false);
      setSubmitError(
        "Something went wrong submitting your enrolment. Please try again, or call us on 1300 572 428 if the problem continues."
      );
      return;
    }

    setLoading(false);
    setSubmitted(true);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_KEY);
  };

  const toggleSubject = (subject: string) => {
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
    if (errors.subjects) setErrors((prev) => ({ ...prev, subjects: "" }));
  };

  const toggleDay = (day: string) => {
    setData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
    if (errors.availableDays) setErrors((prev) => ({ ...prev, availableDays: "" }));
  };

  const handleClearSaved = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_KEY);
    setData(initialData);
    setStep(0);
    setErrors({});
    setSubmitted(false);
  }, []);

  if (submitted) {
    return <SuccessScreen onReset={handleClearSaved} />;
  }

  const inputClasses = "placeholder:text-text-tertiary";

  return (
    <div className="pt-24 md:pt-28 pb-12 md:pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight">
            Enrol at <span className="text-primary-500">Success at School</span>
          </h1>
          <p className="mt-2 text-lg text-text-secondary">
            Start your child&apos;s journey to academic excellence.
          </p>
        </div>

        <StepIndicator current={step} total={totalSteps} />

        <div className="animate-fade-in" key={step}>
          {step === 0 && (
            <Card padding="lg" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-navy-900">Student &amp; Goal</h2>
                <p className="text-sm text-text-secondary mt-1">Tell us about your child and what they need help with.</p>
              </div>

              <Select
                label="Year Level"
                placeholder="Select year level"
                options={YEAR_LEVELS}
                value={data.yearLevel}
                onChange={(e) => update("yearLevel", e.target.value)}
                error={errors.yearLevel}
              />

              <div className="space-y-3">
                <label className="block text-sm font-medium text-navy-800">Program Goal</label>
                <div className="grid gap-3">
                  {PROGRAM_GOALS.map((goal) => {
                    const Icon = goal.icon;
                    const selected = data.programGoal === goal.value;
                    return (
                      <button
                        key={goal.value}
                        type="button"
                        onClick={() => update("programGoal", goal.value)}
                        className={cn(
                          "flex items-start gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200",
                          selected
                            ? "border-primary-500 bg-primary-50/50 shadow-sm"
                            : "border-border hover:border-navy-300 hover:shadow-sm"
                        )}
                      >
                        <div
                          className={cn(
                            "rounded-lg p-2.5 shrink-0 transition-colors",
                            selected ? "bg-primary-100 text-primary-600" : "bg-navy-50 text-navy-500"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p
                            className={cn(
                              "font-semibold transition-colors",
                              selected ? "text-primary-700" : "text-navy-800"
                            )}
                          >
                            {goal.label}
                          </p>
                          <p className="text-sm text-text-secondary mt-0.5">{goal.description}</p>
                        </div>
                        {selected && <Check className="h-5 w-5 text-primary-600 ml-auto shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
                {errors.programGoal && <p className="text-sm text-red-500">{errors.programGoal}</p>}
              </div>

              <div className="flex justify-end pt-2">
                <Button size="lg" onClick={handleNext} icon={<ChevronRight className="h-5 w-5" />}>
                  Next Step
                </Button>
              </div>
            </Card>
          )}

          {step === 1 && (
            <Card padding="lg" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-navy-900">Student Details</h2>
                <p className="text-sm text-text-secondary mt-1">We need some information to get started.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Student First Name"
                  placeholder="First name"
                  value={data.studentFirstName}
                  onChange={(e) => update("studentFirstName", e.target.value)}
                  error={errors.studentFirstName}
                  className={inputClasses}
                />
                <Input
                  label="Student Last Name"
                  placeholder="Last name"
                  value={data.studentLastName}
                  onChange={(e) => update("studentLastName", e.target.value)}
                  error={errors.studentLastName}
                  className={inputClasses}
                />
              </div>

              <Input
                label="School Name"
                placeholder="e.g. North Sydney Public School"
                value={data.schoolName}
                onChange={(e) => update("schoolName", e.target.value)}
                className={inputClasses}
              />

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold text-navy-800 mb-4">Parent / Guardian</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="First name"
                    value={data.parentFirstName}
                    onChange={(e) => update("parentFirstName", e.target.value)}
                    error={errors.parentFirstName}
                    className={inputClasses}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Last name"
                    value={data.parentLastName}
                    onChange={(e) => update("parentLastName", e.target.value)}
                    error={errors.parentLastName}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="parent@example.com"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  error={errors.email}
                  className={inputClasses}
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="0400 000 000"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  error={errors.phone}
                  className={inputClasses}
                />
              </div>

              <Select
                label="Preferred Campus / Location"
                placeholder="Select campus"
                options={CAMPUSES}
                value={data.campus}
                onChange={(e) => update("campus", e.target.value)}
                error={errors.campus}
              />

              <div className="space-y-3">
                <label className="block text-sm font-medium text-navy-800">Preferred Subjects</label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map((subject) => (
                    <SubjectTag
                      key={subject}
                      subject={subject}
                      selected={data.subjects.includes(subject)}
                      onToggle={() => toggleSubject(subject)}
                    />
                  ))}
                </div>
                {data.subjects.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {data.subjects.map((s) => (
                      <Badge key={s} variant="primary" size="sm">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
                {errors.subjects && <p className="text-sm text-red-500">{errors.subjects}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-navy-800">Learning Goals</label>
                <textarea
                  placeholder="What does your child need help with? Any specific goals or challenges?"
                  value={data.learningGoals}
                  onChange={(e) => update("learningGoals", e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-text placeholder:text-text-tertiary transition-all duration-200 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" size="md" onClick={handleBack} icon={<ChevronLeft className="h-5 w-5" />}>
                  Back
                </Button>
                <Button size="lg" onClick={handleNext} icon={<ChevronRight className="h-5 w-5" />}>
                  Next Step
                </Button>
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card padding="lg" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-navy-900">Session Preferences</h2>
                <p className="text-sm text-text-secondary mt-1">Let us know when and how you&apos;d like sessions to run.</p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-navy-800">Available Days</label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((day) => {
                    const selected = data.availableDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={cn(
                          "rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all duration-200",
                          selected
                            ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm"
                            : "border-border text-text-secondary hover:border-navy-300 hover:text-navy-800"
                        )}
                      >
                        {day.slice(0, 3)}
                      </button>
                    );
                  })}
                </div>
                {errors.availableDays && <p className="text-sm text-red-500">{errors.availableDays}</p>}
              </div>

              <Select
                label="Preferred Time"
                placeholder="Select preferred time"
                options={PREFERRED_TIMES}
                value={data.preferredTime}
                onChange={(e) => update("preferredTime", e.target.value)}
                error={errors.preferredTime}
              />

              <div className="space-y-3">
                <label className="block text-sm font-medium text-navy-800">Session Format</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SESSION_FORMATS.map((format) => {
                    const Icon = format.icon;
                    const selected = data.sessionFormat === format.value;
                    return (
                      <button
                        key={format.value}
                        type="button"
                        onClick={() => update("sessionFormat", format.value)}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200",
                          selected
                            ? "border-primary-500 bg-primary-50/50 shadow-sm"
                            : "border-border hover:border-navy-300 hover:shadow-sm"
                        )}
                      >
                        <div
                          className={cn(
                            "rounded-lg p-2.5 transition-colors",
                            selected ? "bg-primary-100 text-primary-600" : "bg-navy-50 text-navy-500"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p
                            className={cn(
                              "font-semibold text-sm transition-colors",
                              selected ? "text-primary-700" : "text-navy-800"
                            )}
                          >
                            {format.label}
                          </p>
                          <p className="text-xs text-text-secondary mt-0.5">{format.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.sessionFormat && <p className="text-sm text-red-500">{errors.sessionFormat}</p>}
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-navy-800">Class Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CLASS_TYPES.map((type) => {
                    const Icon = type.icon;
                    const selected = data.classType === type.value;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => update("classType", type.value)}
                        className={cn(
                          "flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200",
                          selected
                            ? "border-primary-500 bg-primary-50/50 shadow-sm"
                            : "border-border hover:border-navy-300 hover:shadow-sm"
                        )}
                      >
                        <div
                          className={cn(
                            "rounded-lg p-2.5 transition-colors",
                            selected ? "bg-primary-100 text-primary-600" : "bg-navy-50 text-navy-500"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p
                            className={cn(
                              "font-semibold transition-colors",
                              selected ? "text-primary-700" : "text-navy-800"
                            )}
                          >
                            {type.label}
                          </p>
                          <p className="text-sm text-text-secondary">{type.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.classType && <p className="text-sm text-red-500">{errors.classType}</p>}
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.bookAssessment}
                  onChange={(e) => update("bookAssessment", e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-2 border-border text-primary-600 focus:ring-primary-500/50 cursor-pointer accent-primary-500"
                />
                <div>
                  <span className="font-medium text-navy-800">Book a free assessment</span>
                  <p className="text-sm text-text-secondary">
                    We&apos;ll schedule a complimentary skills assessment to tailor the program.
                  </p>
                </div>
              </label>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-navy-800">Additional Notes</label>
                <textarea
                  placeholder="Anything else we should know? (optional)"
                  value={data.additionalNotes}
                  onChange={(e) => update("additionalNotes", e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border-2 border-border bg-white px-4 py-3 text-text placeholder:text-text-tertiary transition-all duration-200 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" size="md" onClick={handleBack} icon={<ChevronLeft className="h-5 w-5" />}>
                  Back
                </Button>
                <Button size="lg" onClick={handleNext} icon={<ChevronRight className="h-5 w-5" />}>
                  Next Step
                </Button>
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card padding="lg" className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-navy-900">Review &amp; Submit</h2>
                  <p className="text-sm text-text-secondary mt-1">Please check everything looks correct before submitting.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-navy-50/40 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-navy-800">Program</h3>
                    <button
                      onClick={() => setStep(0)}
                      className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-text-tertiary">Year Level</span>
                      <p className="font-medium text-navy-800">
                        {YEAR_LEVELS.find((y) => y.value === data.yearLevel)?.label || data.yearLevel}
                      </p>
                    </div>
                    <div>
                      <span className="text-text-tertiary">Program Goal</span>
                      <p className="font-medium text-navy-800">
                        {PROGRAM_GOALS.find((g) => g.value === data.programGoal)?.label || data.programGoal}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-navy-50/40 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-navy-800">Student Info</h3>
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-text-tertiary">Student Name</span>
                      <p className="font-medium text-navy-800">{data.studentFirstName} {data.studentLastName}</p>
                    </div>
                    {data.schoolName && (
                      <div>
                        <span className="text-text-tertiary">School</span>
                        <p className="font-medium text-navy-800">{data.schoolName}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-text-tertiary">Parent/Guardian</span>
                      <p className="font-medium text-navy-800">{data.parentFirstName} {data.parentLastName}</p>
                    </div>
                    <div>
                      <span className="text-text-tertiary">Email</span>
                      <p className="font-medium text-navy-800">{data.email}</p>
                    </div>
                    <div>
                      <span className="text-text-tertiary">Phone</span>
                      <p className="font-medium text-navy-800">{data.phone}</p>
                    </div>
                    <div>
                      <span className="text-text-tertiary">Campus</span>
                      <p className="font-medium text-navy-800">
                        {CAMPUSES.find((c) => c.value === data.campus)?.label || data.campus}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-text-tertiary">Subjects</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {data.subjects.map((s) => (
                          <Badge key={s} variant="primary" size="sm">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-navy-50/40 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-navy-800">Session Preferences</h3>
                    <button
                      onClick={() => setStep(2)}
                      className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-text-tertiary">Available Days</span>
                      <p className="font-medium text-navy-800">{data.availableDays.join(", ")}</p>
                    </div>
                    <div>
                      <span className="text-text-tertiary">Preferred Time</span>
                      <p className="font-medium text-navy-800">
                        {PREFERRED_TIMES.find((t) => t.value === data.preferredTime)?.label || data.preferredTime}
                      </p>
                    </div>
                    <div>
                      <span className="text-text-tertiary">Session Format</span>
                      <p className="font-medium text-navy-800">
                        {SESSION_FORMATS.find((f) => f.value === data.sessionFormat)?.label || data.sessionFormat}
                      </p>
                    </div>
                    <div>
                      <span className="text-text-tertiary">Class Type</span>
                      <p className="font-medium text-navy-800">
                        {CLASS_TYPES.find((t) => t.value === data.classType)?.label || data.classType}
                      </p>
                    </div>
                  </div>
                  {data.bookAssessment && (
                    <div className="flex items-center gap-2 mt-3 text-sm text-primary-700 bg-primary-50 rounded-lg px-3 py-2">
                      <Sparkles className="h-4 w-4" />
                      <span className="font-medium">Free assessment requested</span>
                    </div>
                  )}
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.termsAccepted}
                  onChange={(e) => update("termsAccepted", e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-2 border-border text-primary-600 focus:ring-primary-500/50 cursor-pointer accent-primary-500"
                />
                <div>
                  <span className="font-medium text-navy-800">
                    I accept the{" "}
                    <Link href="/terms" target="_blank" className="text-primary-600 hover:text-primary-700 underline underline-offset-2">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" target="_blank" className="text-primary-600 hover:text-primary-700 underline underline-offset-2">
                      Privacy Policy
                    </Link>
                  </span>
                </div>
              </label>
              {errors.termsAccepted && <p className="text-sm text-red-500">{errors.termsAccepted}</p>}
              <Turnstile
                onVerify={setCaptchaToken}
                onExpire={() => setCaptchaToken(null)}
              />
              {submitError && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200">
                  {submitError}
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Button variant="ghost" size="md" onClick={handleBack} icon={<ChevronLeft className="h-5 w-5" />}>
                  Back
                </Button>
                <Button
                  size="lg"
                  variant="gold"
                  loading={loading}
                  onClick={handleSubmit}
                  icon={!loading ? <Sparkles className="h-5 w-5" /> : undefined}
                >
                  Enrol Now
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

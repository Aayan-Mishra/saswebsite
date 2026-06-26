"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, ClipboardList, ArrowUpRight, Plus } from "lucide-react";
import { AdminPageLayout } from "@/components/dashboard/admin-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface EnrolmentRow {
  id: string;
  program_type: string;
  year_level: string;
  session_format: string;
  class_type: string;
  status: string;
  subjects: string[];
  created_at: string;
  student: { first_name: string; last_name: string } | null;
  tutor: { specialties: string[] } | null;
}

const statusVariant: Record<string, "primary" | "gold" | "navy" | "orange" | "outline"> = {
  active: "primary",
  pending: "orange",
  paused: "gold",
  completed: "navy",
  cancelled: "outline",
};

const programLabels: Record<string, string> = {
  general: "General Tutoring",
  oc: "OC Preparation",
  naplan: "NAPLAN Prep",
  selective: "Selective Preparation",
  subject: "Subject Tutoring",
};

export default function EnrolmentsPage() {
  const [enrolments, setEnrolments] = useState<EnrolmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("enrolments")
      .select("id, program_type, year_level, session_format, class_type, status, subjects, created_at, student:students!student_id(first_name, last_name), tutor:tutors!tutor_id(specialties)")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setEnrolments(data as unknown as EnrolmentRow[]);
        setLoading(false);
      });
  }, []);

  const filtered = statusFilter === "all"
    ? enrolments
    : enrolments.filter((e) => e.status === statusFilter);

  const counts = {
    all: enrolments.length,
    active: enrolments.filter((e) => e.status === "active").length,
    pending: enrolments.filter((e) => e.status === "pending").length,
    paused: enrolments.filter((e) => e.status === "paused").length,
    completed: enrolments.filter((e) => e.status === "completed").length,
  };

  return (
    <AdminPageLayout title="Enrolments" breadcrumb={[{ label: "Admin" }, { label: "Enrolments" }]}>
      <div className="flex items-center gap-3 flex-wrap">
        {(["all", "active", "pending", "paused", "completed"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              statusFilter === s
                ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                : "bg-white text-navy-600 border border-navy-200 hover:border-primary-300"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)} ({counts[s]})
          </button>
        ))}
        <div className="flex-1" />
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4" />
          New Enrolment
        </Button>
      </div>

      <Card padding="md">
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle className="h-10 w-10 text-red-400 mb-3" />
              <p className="text-navy-700 font-medium">Failed to load enrolments</p>
              <p className="text-sm text-navy-400 mt-1">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ClipboardList className="h-10 w-10 text-navy-300 mb-3" />
              <p className="text-navy-700 font-medium">No enrolments found</p>
              <p className="text-sm text-navy-400 mt-1">
                {statusFilter !== "all" ? "No enrolments with this status" : "Create your first enrolment to get started"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-100">
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Student</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Program</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Type</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Subjects</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Date</th>
                    <th className="text-right py-3 px-2" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e) => (
                    <tr key={e.id} className="border-b border-navy-50 hover:bg-navy-50/50 transition-colors">
                      <td className="py-3 px-2">
                        <span className="font-medium text-navy-900">
                          {e.student ? `${e.student.first_name} ${e.student.last_name}` : "—"}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-navy-600">
                        {programLabels[e.program_type] || e.program_type}
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-xs text-navy-500 capitalize">{e.class_type} · {e.session_format}</span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-1 flex-wrap">
                          {e.subjects?.slice(0, 2).map((sub) => (
                            <Badge key={sub} variant="navy" size="sm">{sub}</Badge>
                          ))}
                          {(e.subjects?.length ?? 0) > 2 && (
                            <span className="text-xs text-navy-400">+{e.subjects.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={statusVariant[e.status] || "outline"} size="sm">
                          {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-navy-500 text-xs">
                        {new Date(e.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button className="text-navy-400 hover:text-navy-700 transition-colors">
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
}

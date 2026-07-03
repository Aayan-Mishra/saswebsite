"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, ClipboardList, Mail, Phone } from "lucide-react";
import { AdminPageLayout } from "@/components/dashboard/admin-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EnrolmentRequest {
  id: string;
  year_level: string;
  program_goal: string;
  student_first_name: string;
  student_last_name: string;
  school_name: string | null;
  parent_first_name: string;
  parent_last_name: string;
  email: string;
  phone: string;
  campus: string | null;
  subjects: string[];
  learning_goals: string | null;
  available_days: string[];
  preferred_time: string | null;
  session_format: string | null;
  class_type: string | null;
  book_assessment: boolean;
  additional_notes: string | null;
  status: string;
  created_at: string;
}

const STATUSES = ["new", "contacted", "enrolled", "archived"] as const;
type Status = (typeof STATUSES)[number];

const statusVariant: Record<string, "primary" | "gold" | "navy" | "orange" | "outline"> = {
  new: "orange",
  contacted: "gold",
  enrolled: "primary",
  archived: "outline",
};

function formatYearLevel(value: string): string {
  if (!value) return "—";
  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function EnrolmentsPage() {
  const [requests, setRequests] = useState<EnrolmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/enrolment-requests")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load");
        setRequests(json.requests as EnrolmentRequest[]);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: Status) {
    setUpdatingId(id);
    // Optimistic update
    const previous = requests;
    setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      const res = await fetch(`/api/admin/enrolment-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Update failed");
      }
    } catch (e) {
      setRequests(previous); // roll back
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setUpdatingId(null);
    }
  }

  const filtered =
    statusFilter === "all"
      ? requests
      : requests.filter((r) => (r.status || "new") === statusFilter);

  const counts = {
    all: requests.length,
    new: requests.filter((r) => (r.status || "new") === "new").length,
    contacted: requests.filter((r) => r.status === "contacted").length,
    enrolled: requests.filter((r) => r.status === "enrolled").length,
    archived: requests.filter((r) => r.status === "archived").length,
  };

  return (
    <AdminPageLayout title="Enrolment Requests" breadcrumb={[{ label: "Admin" }, { label: "Enrolments" }]}>
      <div className="flex items-center gap-3 flex-wrap">
        {(["all", ...STATUSES] as const).map((s) => (
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
              <p className="text-navy-700 font-medium">Failed to load enrolment requests</p>
              <p className="text-sm text-navy-400 mt-1">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ClipboardList className="h-10 w-10 text-navy-300 mb-3" />
              <p className="text-navy-700 font-medium">No enrolment requests</p>
              <p className="text-sm text-navy-400 mt-1">
                {statusFilter !== "all"
                  ? "No requests with this status"
                  : "New submissions from the enrolment form will appear here"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-100">
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Student</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Year / Goal</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Parent & Contact</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Subjects</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Date</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b border-navy-50 hover:bg-navy-50/50 transition-colors align-top">
                      <td className="py-3 px-2">
                        <span className="font-medium text-navy-900">
                          {r.student_first_name} {r.student_last_name}
                        </span>
                        {r.school_name && (
                          <p className="text-xs text-navy-400 mt-0.5">{r.school_name}</p>
                        )}
                        {r.campus && (
                          <p className="text-xs text-navy-400 mt-0.5">Campus: {r.campus}</p>
                        )}
                      </td>
                      <td className="py-3 px-2 text-navy-600">
                        <span className="block">{formatYearLevel(r.year_level)}</span>
                        <span className="text-xs text-navy-400">{r.program_goal}</span>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-navy-700">
                          {r.parent_first_name} {r.parent_last_name}
                        </span>
                        <a href={`mailto:${r.email}`} className="flex items-center gap-1 text-xs text-primary-600 hover:underline mt-0.5">
                          <Mail className="h-3 w-3" /> {r.email}
                        </a>
                        <a href={`tel:${r.phone}`} className="flex items-center gap-1 text-xs text-navy-500 hover:underline mt-0.5">
                          <Phone className="h-3 w-3" /> {r.phone}
                        </a>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-1 flex-wrap max-w-[160px]">
                          {r.subjects?.slice(0, 3).map((sub) => (
                            <Badge key={sub} variant="navy" size="sm">{sub}</Badge>
                          ))}
                          {(r.subjects?.length ?? 0) > 3 && (
                            <span className="text-xs text-navy-400">+{r.subjects.length - 3}</span>
                          )}
                        </div>
                        {r.book_assessment && (
                          <span className="text-xs text-gold-600 font-medium mt-1 block">Requested assessment</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-navy-500 text-xs whitespace-nowrap">
                        {new Date(r.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={statusVariant[r.status || "new"] || "outline"} size="sm">
                            {(r.status || "new").charAt(0).toUpperCase() + (r.status || "new").slice(1)}
                          </Badge>
                          <select
                            aria-label="Update status"
                            value={r.status || "new"}
                            disabled={updatingId === r.id}
                            onChange={(e) => updateStatus(r.id, e.target.value as Status)}
                            className="text-xs border border-navy-200 rounded-lg px-2 py-1 bg-white text-navy-700 disabled:opacity-50"
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          {updatingId === r.id && <Loader2 className="h-3 w-3 animate-spin text-primary-500" />}
                        </div>
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

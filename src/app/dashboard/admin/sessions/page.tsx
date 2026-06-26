"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, CalendarDays, Clock, ArrowUpRight } from "lucide-react";
import { AdminPageLayout } from "@/components/dashboard/admin-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

interface SessionRow {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  format: string;
  status: string;
  topic: string | null;
  student: { first_name: string; last_name: string } | null;
  tutor: { specialties: string[] } | null;
  enrolment: { program_type: string } | null;
}

const statusVariant: Record<string, "primary" | "gold" | "navy" | "orange" | "outline"> = {
  scheduled: "primary",
  completed: "navy",
  cancelled: "orange",
  "no-show": "outline",
};

export default function SessionsPage() {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState("all");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("sessions")
      .select("id, date, start_time, end_time, format, status, topic, student:students!student_id(first_name, last_name), tutor:tutors!tutor_id(specialties), enrolment:enrolments!enrolment_id(program_type)")
      .is("deleted_at", null)
      .order("date", { ascending: false })
      .order("start_time", { ascending: true })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setSessions(data as unknown as SessionRow[]);
        setLoading(false);
      });
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const filtered = filterDate === "today"
    ? sessions.filter((s) => s.date === today)
    : filterDate === "upcoming"
    ? sessions.filter((s) => s.date >= today)
    : filterDate === "past"
    ? sessions.filter((s) => s.date < today)
    : sessions;

  const counts = {
    all: sessions.length,
    today: sessions.filter((s) => s.date === today).length,
    upcoming: sessions.filter((s) => s.date >= today).length,
    past: sessions.filter((s) => s.date < today).length,
  };

  return (
    <AdminPageLayout title="Sessions" breadcrumb={[{ label: "Admin" }, { label: "Sessions" }]}>
      <div className="flex items-center gap-3 flex-wrap">
        {(["all", "today", "upcoming", "past"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilterDate(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filterDate === f
                ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                : "bg-white text-navy-600 border border-navy-200 hover:border-primary-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
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
              <p className="text-navy-700 font-medium">Failed to load sessions</p>
              <p className="text-sm text-navy-400 mt-1">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CalendarDays className="h-10 w-10 text-navy-300 mb-3" />
              <p className="text-navy-700 font-medium">No sessions found</p>
              <p className="text-sm text-navy-400 mt-1">
                {filterDate !== "all" ? "No sessions match this filter" : "Schedule your first session"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-100">
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Date</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Time</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Student</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Program</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Format</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Topic</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Status</th>
                    <th className="text-right py-3 px-2" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} className="border-b border-navy-50 hover:bg-navy-50/50 transition-colors">
                      <td className="py-3 px-2 text-navy-900 font-medium">
                        {new Date(s.date + "T00:00:00").toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" })}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1 text-navy-600">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{s.start_time.slice(0, 5)} - {s.end_time.slice(0, 5)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="font-medium text-navy-900">
                          {s.student ? `${s.student.first_name} ${s.student.last_name}` : "—"}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-navy-500 text-xs">
                        {s.enrolment?.program_type || "—"}
                      </td>
                      <td className="py-3 px-2 text-navy-600 capitalize">{s.format}</td>
                      <td className="py-3 px-2 text-navy-500 max-w-[150px] truncate">
                        {s.topic || <span className="text-navy-300">—</span>}
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={statusVariant[s.status] || "outline"} size="sm">
                          {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                        </Badge>
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

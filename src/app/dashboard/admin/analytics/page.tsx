"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, Users, ClipboardList, CalendarDays, DollarSign, TrendingUp } from "lucide-react";
import { AdminPageLayout } from "@/components/dashboard/admin-page-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

interface AnalyticsData {
  totalStudents: number;
  activeEnrolments: number;
  totalSessions: number;
  completedSessions: number;
  studentsByLevel: { year_level: string; count: number }[];
  enrolmentsByProgram: { program_type: string; count: number }[];
  sessionsByMonth: { month: string; count: number }[];
  revenue: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    Promise.all([
      supabase.from("students").select("id", { count: "exact", head: true }),
      supabase.from("enrolments").select("id", { count: "exact", head: true }).eq("status", "active").is("deleted_at", null),
      supabase.from("sessions").select("id", { count: "exact", head: true }).is("deleted_at", null),
      supabase.from("sessions").select("id", { count: "exact", head: true }).eq("status", "completed").is("deleted_at", null),
      supabase.from("students").select("year_level"),
      supabase.from("enrolments").select("program_type").is("deleted_at", null),
      supabase.from("sessions").select("date").is("deleted_at", null),
    ]).then(([studentsRes, activeEnrolRes, sessionsRes, completedRes, levelsRes, programsRes, sessionsDateRes]) => {
      const error = studentsRes.error || activeEnrolRes.error || sessionsRes.error || completedRes.error;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const studentsByLevel = (levelsRes.data || []).reduce<Record<string, number>>((acc, s) => {
        acc[s.year_level] = (acc[s.year_level] || 0) + 1;
        return acc;
      }, {});

      const enrolmentsByProgram = (programsRes.data || []).reduce<Record<string, number>>((acc, e) => {
        acc[e.program_type] = (acc[e.program_type] || 0) + 1;
        return acc;
      }, {});

      const sessionsByMonth = (sessionsDateRes.data || []).reduce<Record<string, number>>((acc, s) => {
        const month = s.date?.slice(0, 7);
        if (month) acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      const sortedMonths = Object.entries(sessionsByMonth)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-6);

      setData({
        totalStudents: studentsRes.count ?? 0,
        activeEnrolments: activeEnrolRes.count ?? 0,
        totalSessions: sessionsRes.count ?? 0,
        completedSessions: completedRes.count ?? 0,
        studentsByLevel: Object.entries(studentsByLevel).map(([year_level, count]) => ({ year_level, count })),
        enrolmentsByProgram: Object.entries(enrolmentsByProgram).map(([program_type, count]) => ({ program_type, count })),
        sessionsByMonth: sortedMonths.map(([month, count]) => ({ month, count })),
        revenue: activeEnrolRes.count ?? 0 * 1200,
      });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <AdminPageLayout title="Analytics" breadcrumb={[{ label: "Admin" }, { label: "Analytics" }]}>
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
        </div>
      </AdminPageLayout>
    );
  }

  if (error) {
    return (
      <AdminPageLayout title="Analytics" breadcrumb={[{ label: "Admin" }, { label: "Analytics" }]}>
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <AlertCircle className="h-10 w-10 text-red-400 mb-3" />
          <p className="text-navy-700 font-medium">Failed to load analytics</p>
          <p className="text-sm text-navy-400 mt-1">{error}</p>
        </div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout title="Analytics" breadcrumb={[{ label: "Admin" }, { label: "Analytics" }]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={<Users className="h-5 w-5" />} label="Total Students" value={data!.totalStudents.toLocaleString()} />
        <StatsCard icon={<ClipboardList className="h-5 w-5" />} label="Active Enrolments" value={data!.activeEnrolments.toLocaleString()} />
        <StatsCard icon={<CalendarDays className="h-5 w-5" />} label="Total Sessions" value={data!.totalSessions.toLocaleString()} />
        <StatsCard icon={<TrendingUp className="h-5 w-5" />} label="Completed Sessions" value={data!.completedSessions.toLocaleString()} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy-900">Sessions per Month</h3>
            </div>
          </CardHeader>
          <CardContent>
            {data!.sessionsByMonth.length === 0 ? (
              <p className="text-navy-400 text-sm py-8 text-center">No session data yet</p>
            ) : (
              <div className="flex items-end justify-between gap-2 h-40 pt-4">
                {data!.sessionsByMonth.map(({ month, count }) => {
                  const max = Math.max(...data!.sessionsByMonth.map((s) => s.count), 1);
                  return (
                    <div key={month} className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-primary-100 rounded-t-md relative" style={{ height: `${(count / max) * 100}%` }}>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-xs font-semibold text-navy-700">
                          {count}
                        </div>
                      </div>
                      <span className="text-xs text-navy-500">
                        {new Date(month + "-01").toLocaleDateString("en-AU", { month: "short" })}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card padding="md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy-900">Enrolments by Program</h3>
            </div>
          </CardHeader>
          <CardContent>
            {data!.enrolmentsByProgram.length === 0 ? (
              <p className="text-navy-400 text-sm py-8 text-center">No enrolment data yet</p>
            ) : (
              <div className="space-y-3">
                {data!.enrolmentsByProgram.map(({ program_type, count }) => {
                  const max = Math.max(...data!.enrolmentsByProgram.map((p) => p.count), 1);
                  return (
                    <div key={program_type}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-navy-700 capitalize">{program_type}</span>
                        <span className="text-sm font-bold text-navy-900">{count}</span>
                      </div>
                      <div className="h-2.5 bg-navy-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-primary-500" style={{ width: `${(count / max) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card padding="md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy-900">Students by Year Level</h3>
            </div>
          </CardHeader>
          <CardContent>
            {data!.studentsByLevel.length === 0 ? (
              <p className="text-navy-400 text-sm py-8 text-center">No student data yet</p>
            ) : (
              <div className="space-y-2">
                {data!.studentsByLevel
                  .sort((a, b) => a.year_level.localeCompare(b.year_level))
                  .map(({ year_level, count }) => (
                    <div key={year_level} className="flex items-center justify-between py-1.5 border-b border-navy-50 last:border-0">
                      <span className="text-sm text-navy-700 capitalize">{year_level.replace("-", " ")}</span>
                      <Badge variant="navy" size="sm">{count}</Badge>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card padding="md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy-900">Revenue Summary</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-navy-500">Estimated Monthly</p>
                <p className="text-2xl font-bold text-navy-900">
                  ${(data!.activeEnrolments * 1200).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-xs text-navy-400">
              Based on {data!.activeEnrolments} active enrolments × $1,200 avg. monthly fee
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
}

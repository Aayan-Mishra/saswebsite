"use client";

import { useEffect, useState } from "react";
import { Search, ArrowUpRight, Loader2, AlertCircle, UserPlus, Mail, Phone, BookOpen } from "lucide-react";
import { AdminPageLayout } from "@/components/dashboard/admin-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface StudentRow {
  id: string;
  first_name: string;
  last_name: string;
  year_level: string;
  school: string | null;
  created_at: string;
  enrolments: { status: string }[];
}

const yearLevelLabels: Record<string, string> = {
  kindergarten: "Kindergarten",
  "year-1": "Year 1", "year-2": "Year 2", "year-3": "Year 3",
  "year-4": "Year 4", "year-5": "Year 5", "year-6": "Year 6",
  "year-7": "Year 7", "year-8": "Year 8", "year-9": "Year 9",
  "year-10": "Year 10", "year-11": "Year 11", "year-12": "Year 12",
};

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("students")
      .select("id, first_name, last_name, year_level, school, created_at, enrolments!student_id(status)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setStudents(data as unknown as StudentRow[]);
        setLoading(false);
      });
  }, []);

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return `${s.first_name} ${s.last_name}`.toLowerCase().includes(q)
      || (s.school?.toLowerCase() || "").includes(q)
      || s.year_level.toLowerCase().includes(q);
  });

  const activeEnrolments = (s: StudentRow) =>
    s.enrolments?.filter((e) => e.status === "active").length ?? 0;

  return (
    <AdminPageLayout title="Students" breadcrumb={[{ label: "Admin" }, { label: "Students" }]}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 text-navy-400 text-sm border border-navy-200 flex-1 max-w-md">
          <Search className="h-4 w-4" />
          <input
            className="flex-1 bg-transparent outline-none text-navy-900 placeholder:text-navy-400"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="primary" size="sm">
          <UserPlus className="h-4 w-4" />
          Add Student
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
              <p className="text-navy-700 font-medium">Failed to load students</p>
              <p className="text-sm text-navy-400 mt-1">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <BookOpen className="h-10 w-10 text-navy-300 mb-3" />
              <p className="text-navy-700 font-medium">
                {search ? "No students match your search" : "No students yet"}
              </p>
              <p className="text-sm text-navy-400 mt-1">
                {search ? "Try a different search term" : "Students will appear once they enrol"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-100">
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Year Level</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">School</th>
                    <th className="text-center py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Active Enrolments</th>
                    <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Enrolled</th>
                    <th className="text-right py-3 px-2" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} className="border-b border-navy-50 hover:bg-navy-50/50 transition-colors">
                      <td className="py-3 px-2">
                        <span className="font-medium text-navy-900">{s.first_name} {s.last_name}</span>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant="navy" size="sm">{yearLevelLabels[s.year_level] || s.year_level}</Badge>
                      </td>
                      <td className="py-3 px-2 text-navy-600">
                        {s.school || <span className="text-navy-300">—</span>}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={activeEnrolments(s) > 0 ? "text-primary-600 font-semibold" : "text-navy-300"}>
                          {activeEnrolments(s)}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-navy-500 text-xs">
                        {new Date(s.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
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

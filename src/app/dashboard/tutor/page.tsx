"use client";

import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/sidebar";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  Users,
  Calendar,
  Clock,
  FileText,
  Bell,
  ChevronRight,
  BookOpen,
  CheckSquare,
  ToggleLeft,
  ToggleRight,
  Activity,
  MessageSquare,
  ArrowRight,
  Star,
} from "lucide-react";

const tutorStats = [
  { icon: <Users className="h-5 w-5" />, label: "My Students", value: "12" },
  { icon: <Calendar className="h-5 w-5" />, label: "Sessions This Week", value: "8" },
  { icon: <Clock className="h-5 w-5" />, label: "Next Session", value: "Today 4pm" },
  { icon: <FileText className="h-5 w-5" />, label: "Pending Reports", value: "3" },
];

const sessions = [
  { time: "Today 4:00 PM", student: "Emma Watson", subject: "Selective Preparation", format: "In-person" as const },
  { time: "Tomorrow 9:00 AM", student: "James Chen", subject: "NAPLAN Maths", format: "Online" as const },
  { time: "Tomorrow 11:00 AM", student: "Sophia Lee", subject: "OC Preparation", format: "In-person" as const },
  { time: "Wed 10:00 AM", student: "Oliver Smith", subject: "Maths Advanced", format: "Online" as const },
  { time: "Wed 2:00 PM", student: "Mia Brown", subject: "English Tutoring", format: "In-person" as const },
];

const students = [
  { name: "Emma Watson", year: "Year 12", subjects: ["Maths Adv", "English"], progress: 85, initials: "EW" },
  { name: "James Chen", year: "Year 5", subjects: ["NAPLAN Maths", "NAPLAN Reading"], progress: 72, initials: "JC" },
  { name: "Sophia Lee", year: "Year 4", subjects: ["OC Thinking Skills"], progress: 90, initials: "SL" },
  { name: "Oliver Smith", year: "Year 11", subjects: ["Maths Advanced"], progress: 60, initials: "OS" },
  { name: "Mia Brown", year: "Year 7", subjects: ["English", "Science"], progress: 78, initials: "MB" },
  { name: "Lucas Chen", year: "Year 5", subjects: ["NAPLAN Maths"], progress: 45, initials: "LC" },
];

const recentActivity = [
  { action: "Session completed with Emma Watson", time: "2h ago" },
  { action: "Added session notes for James Chen", time: "4h ago" },
  { action: "Rescheduled Sophia Lee to Wednesday", time: "1d ago" },
  { action: "Submitted progress report for Oliver Smith", time: "2d ago" },
];

import { AuthGuard } from "@/components/auth-guard";
import { DashboardUserMenu } from "@/components/dashboard/user-menu";

export default function TutorDashboard() {
  const pathname = usePathname();

  return (
    <AuthGuard>
    <div className="min-h-screen bg-navy-50 flex">
      <Sidebar role="tutor" currentPath={pathname} />

      <div className="flex-1 flex flex-col min-w-0 sm:ml-72">
        <header className="h-16 bg-white border-b border-navy-100 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-navy-400">
              <span className="text-sm">Dashboard</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-sm font-medium text-navy-900">Tutor</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl hover:bg-navy-50 text-navy-500 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
            </button>
            <DashboardUserMenu fallbackName="Lisa Mitchell" fallbackRole="Senior Tutor" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">My Dashboard</h1>
            <p className="text-sm text-navy-500 mt-1">Here&apos;s what&apos;s on your plate today.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tutorStats.map((s) => (
              <StatsCard key={s.label} icon={s.icon} label={s.label} value={s.value} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card padding="md" className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-navy-400" />
                    Upcoming Sessions
                  </h3>
                  <Button variant="ghost" size="sm">
                    Full Schedule <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-navy-50">
                  {sessions.map((s) => (
                    <div key={`${s.student}-${s.time}`} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                      <div className="hidden sm:flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-navy-50 shrink-0">
                        <span className="text-xs font-bold text-navy-900 leading-tight">
                          {s.time.split(" ").slice(0, -1).join(" ")}
                        </span>
                        <span className="text-[10px] text-navy-400">
                          {s.time.split(" ").slice(-1)[0]}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-navy-900">{s.student}</p>
                        <p className="text-xs text-navy-500 mt-0.5">{s.subject}</p>
                      </div>
                      <Badge variant={s.format === "In-person" ? "navy" : "orange"} size="sm">
                        {s.format}
                      </Badge>
                      <button className="text-navy-400 hover:text-navy-700 transition-colors p-1">
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card padding="md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-navy-900 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-navy-400" />
                    Quick Stats
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-navy-700">Attendance Rate</span>
                    <span className="text-sm font-bold text-navy-900">94%</span>
                  </div>
                  <div className="h-3 bg-navy-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary-500" style={{ width: "94%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-navy-700">Session Completion</span>
                    <span className="text-sm font-bold text-navy-900">88%</span>
                  </div>
                  <div className="h-3 bg-navy-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gold-400" style={{ width: "88%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-navy-700">Report Submissions</span>
                    <span className="text-sm font-bold text-navy-900">72%</span>
                  </div>
                  <div className="h-3 bg-navy-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-orange-400" style={{ width: "72%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy-900">My Students</h3>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((s) => (
                <Card key={s.name} padding="md" hover>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold shrink-0">
                        {s.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-navy-900">{s.name}</p>
                        <p className="text-xs text-navy-500">{s.year}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {s.subjects.map((sub) => (
                            <Badge key={sub} variant="outline" size="sm">{sub}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-navy-500">Progress</span>
                        <span className="text-xs font-bold text-navy-900">{s.progress}%</span>
                      </div>
                      <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            s.progress >= 80 ? "bg-primary-500" : s.progress >= 60 ? "bg-gold-400" : "bg-orange-400"
                          )}
                          style={{ width: `${s.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-navy-50">
                      <Button variant="ghost" size="sm" className="text-xs flex-1">
                        <FileText className="h-3.5 w-3.5" />
                        Session Notes
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs flex-1">
                        <Star className="h-3.5 w-3.5" />
                        View Progress
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card padding="md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-navy-400" />
                    Recent Activity
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((a) => (
                  <div key={a.action} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-navy-700">{a.action}</p>
                      <span className="text-xs text-navy-400">{a.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card padding="md">
              <CardHeader>
                <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-navy-400" />
                  Quick Actions
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="secondary" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4" />
                  Add Session Notes
                </Button>
                <Button variant="secondary" size="sm" className="w-full justify-start">
                  <CheckSquare className="h-4 w-4" />
                  Mark Attendance
                </Button>
                <Button variant="secondary" size="sm" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4" />
                  Message Parent
                </Button>
                <Button variant="secondary" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4" />
                  Submit Report
                </Button>
              </CardContent>
            </Card>

            <Card padding="md">
              <CardHeader>
                <h3 className="text-base font-bold text-navy-900">Availability</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-navy-50">
                  <div>
                    <p className="text-sm font-medium text-navy-900">Accepting Sessions</p>
                    <p className="text-xs text-navy-500">You&apos;re currently available</p>
                  </div>
                  <button className="flex items-center gap-2 text-sm font-medium text-primary-600">
                    <ToggleRight className="h-6 w-6" />
                    On
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-navy-50">
                  <div>
                    <p className="text-sm font-medium text-navy-900">Weekly Hours</p>
                    <p className="text-xs text-navy-500">This week</p>
                  </div>
                  <span className="text-lg font-bold text-navy-900">18h</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-navy-50">
                  <div>
                    <p className="text-sm font-medium text-navy-900">Rating</p>
                    <p className="text-xs text-navy-500">Student feedback</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-gold-400 fill-current" />
                    <span className="text-sm font-bold text-navy-900">4.9</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}

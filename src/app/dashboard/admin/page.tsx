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
  ClipboardList,
  GraduationCap,
  DollarSign,
  Search,
  Bell,
  Plus,
  UserPlus,
  Megaphone,
  Download,
  MessageSquare,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  Clock,
} from "lucide-react";

const stats = [
  { icon: <Users className="h-5 w-5" />, label: "Total Students", value: "2,340", trend: { direction: "up" as const, value: "12.5%" } },
  { icon: <ClipboardList className="h-5 w-5" />, label: "Active Enrolments", value: "1,892", trend: { direction: "up" as const, value: "8.3%" } },
  { icon: <GraduationCap className="h-5 w-5" />, label: "Tutors", value: "48", trend: { direction: "up" as const, value: "4" } },
  { icon: <DollarSign className="h-5 w-5" />, label: "Revenue This Month", value: "$184,200", trend: { direction: "up" as const, value: "18.7%" } },
];

const recentEnrolments = [
  { student: "Emma Watson", program: "Selective Preparation", date: "12 Mar 2025", status: "Active" as const },
  { student: "James Chen", program: "NAPLAN Year 5", date: "10 Mar 2025", status: "Active" as const },
  { student: "Sophia Lee", program: "OC Preparation", date: "08 Mar 2025", status: "Pending" as const },
  { student: "Oliver Smith", program: "Maths Advanced", date: "05 Mar 2025", status: "Active" as const },
  { student: "Mia Brown", program: "English Tutoring", date: "01 Mar 2025", status: "Completed" as const },
];

const statusVariant = { Active: "primary" as const, Pending: "orange" as const, Completed: "navy" as const };

const quickActions = [
  { label: "New Enrolment", icon: Plus, variant: "primary" as const },
  { label: "Add Tutor", icon: UserPlus, variant: "secondary" as const },
  { label: "Create Announcement", icon: Megaphone, variant: "secondary" as const },
  { label: "Export Reports", icon: Download, variant: "outline" as const },
];

const messages = [
  { from: "Lisa Mitchell", preview: "Year 12 student needs extra session this week...", time: "2m ago" },
  { from: "David Kim", preview: "Parent enquiry about Selective program availability...", time: "1h ago" },
  { from: "Lisa Wang", preview: "Attendance report for Term 1 is ready for review...", time: "3h ago" },
];

const upcomingSessions = [
  { time: "Today 2:00 PM", student: "Emma Watson", subject: "Selective Prep" },
  { time: "Today 4:00 PM", student: "Lucas Chen", subject: "NAPLAN Maths" },
  { time: "Tomorrow 9:00 AM", student: "Sophia Lee", subject: "OC Preparation" },
];

const pendingTasks = [
  { task: "Review Term 1 reports", due: "Due today" },
  { task: "Approve tutor timesheets", due: "Due tomorrow" },
  { task: "Update program curriculum", due: "Due in 3 days" },
];

import { AuthGuard } from "@/components/auth-guard";
import { DashboardUserMenu } from "@/components/dashboard/user-menu";

export default function AdminDashboard() {
  const pathname = usePathname();

  return (
    <AuthGuard>
    <div className="min-h-screen bg-navy-50 flex">
      <Sidebar role="admin" currentPath={pathname} />

      <div className="flex-1 flex flex-col min-w-0 sm:ml-72">
        <header className="h-16 bg-white border-b border-navy-100 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-navy-400">
              <span className="text-sm">Dashboard</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-sm font-medium text-navy-900">Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-navy-50 rounded-xl px-3 py-2 text-navy-400 text-sm min-w-[200px]">
              <Search className="h-4 w-4" />
              <span>Search students, tutors...</span>
            </div>
            <button className="relative p-2 rounded-xl hover:bg-navy-50 text-navy-500 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <DashboardUserMenu fallbackName="Admin User" fallbackRole="Super Admin" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Admin Dashboard</h1>
            <p className="text-sm text-navy-500 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <StatsCard key={s.label} icon={s.icon} label={s.label} value={s.value} trend={s.trend} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card padding="md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-navy-900">Enrolment Trends</h3>
                  <span className="text-xs text-navy-400">Jan - Jun 2025</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2 h-40 pt-4">
                  {[
                    { month: "Jan", value: 45 },
                    { month: "Feb", value: 55 },
                    { month: "Mar", value: 60 },
                    { month: "Apr", value: 75 },
                    { month: "May", value: 85 },
                    { month: "Jun", value: 95 },
                  ].map((bar) => (
                    <div key={bar.month} className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-primary-100 rounded-t-md relative" style={{ height: `${bar.value}%` }}>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-xs font-semibold text-navy-700">
                          {bar.value}
                        </div>
                      </div>
                      <span className="text-xs text-navy-500">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card padding="md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-navy-900">Revenue Overview</h3>
                  <span className="text-xs text-navy-400">Last 6 months</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-40 pt-4 relative">
                  <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                    <polyline
                      points="10,100 60,80 110,90 160,50 210,60 260,30"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {[
                      { x: 10, y: 100, label: "$120K" },
                      { x: 60, y: 80, label: "$135K" },
                      { x: 110, y: 90, label: "$128K" },
                      { x: 160, y: 50, label: "$160K" },
                      { x: 210, y: 60, label: "$152K" },
                      { x: 260, y: 30, label: "$184K" },
                    ].map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="4" fill="#f97316" className="drop-shadow-sm" />
                        <circle cx={pt.x} cy={pt.y} r="6" fill="rgba(249,115,22,0.15)" />
                      </g>
                    ))}
                  </svg>
                  <div className="flex justify-between mt-1">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                      <span key={m} className="text-xs text-navy-400">{m}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card padding="md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-navy-900">Program Performance</h3>
                  <span className="text-xs text-navy-400">Completion rate</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Selective Preparation", pct: 92, color: "bg-primary-500" },
                  { name: "OC Preparation", pct: 88, color: "bg-primary-400" },
                  { name: "NAPLAN Prep", pct: 76, color: "bg-primary-300" },
                  { name: "Maths Tutoring", pct: 65, color: "bg-gold-400" },
                  { name: "English Tutoring", pct: 58, color: "bg-orange-400" },
                ].map((prog) => (
                  <div key={prog.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-navy-700">{prog.name}</span>
                      <span className="text-sm font-bold text-navy-900">{prog.pct}%</span>
                    </div>
                    <div className="h-2.5 bg-navy-100 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all", prog.color)} style={{ width: `${prog.pct}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card padding="md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-navy-900">Conversion Funnel</h3>
                  <span className="text-xs text-navy-400">This quarter</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { stage: "Leads", count: "1,240", pct: 100 },
                    { stage: "Enquiries", count: "856", pct: 69 },
                    { stage: "Trial Sessions", count: "423", pct: 34 },
                    { stage: "Enrolments", count: "218", pct: 18 },
                    { stage: "Retained", count: "189", pct: 15 },
                  ].map((item, i) => (
                    <div key={item.stage} className="flex items-center gap-3">
                      <div className="w-24 shrink-0">
                        <span className="text-sm font-medium text-navy-700">{item.stage}</span>
                      </div>
                      <div className="flex-1 h-8 rounded-lg bg-navy-100 overflow-hidden relative">
                        <div
                          className={cn(
                            "h-full rounded-lg flex items-center justify-end px-3 text-xs font-bold text-white",
                            i === 0 && "bg-primary-500",
                            i === 1 && "bg-primary-400",
                            i === 2 && "bg-primary-300",
                            i === 3 && "bg-gold-400 text-navy-900",
                            i === 4 && "bg-orange-400"
                          )}
                          style={{ width: `${item.pct}%`, minWidth: "fit-content" }}
                        >
                          {item.count}
                        </div>
                      </div>
                      <span className="text-xs text-navy-400 w-10 text-right">{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card padding="md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-navy-900">Recent Enrolments</h3>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-navy-100">
                      <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Student</th>
                      <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Program</th>
                      <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Date</th>
                      <th className="text-left py-3 px-2 font-semibold text-navy-500 text-xs uppercase tracking-wider">Status</th>
                      <th className="text-right py-3 px-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {recentEnrolments.map((row) => (
                      <tr key={row.student} className="border-b border-navy-50 hover:bg-navy-50/50 transition-colors">
                        <td className="py-3 px-2">
                          <span className="font-medium text-navy-900">{row.student}</span>
                        </td>
                        <td className="py-3 px-2 text-navy-600">{row.program}</td>
                        <td className="py-3 px-2 text-navy-500">{row.date}</td>
                        <td className="py-3 px-2">
                          <Badge variant={statusVariant[row.status]} size="sm">{row.status}</Badge>
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
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button key={action.label} variant={action.variant as any} size="md" className="w-full">
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card padding="md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-navy-400" />
                    Latest Messages
                  </h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {messages.map((m) => (
                  <div key={m.from} className="flex items-start gap-3 p-3 rounded-xl hover:bg-navy-50 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-navy-100 text-navy-600 flex items-center justify-center text-xs font-semibold shrink-0">
                      {m.from.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-navy-900">{m.from}</p>
                        <span className="text-xs text-navy-400 shrink-0">{m.time}</span>
                      </div>
                      <p className="text-xs text-navy-500 mt-0.5 truncate">{m.preview}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card padding="md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-navy-400" />
                    Upcoming Sessions
                  </h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingSessions.map((s) => (
                  <div key={`${s.student}-${s.time}`} className="flex items-start gap-3 p-3 rounded-xl hover:bg-navy-50 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy-900">{s.student}</p>
                      <p className="text-xs text-navy-500">{s.subject}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-navy-400" />
                        <span className="text-xs text-navy-400">{s.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card padding="md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-navy-400" />
                    Pending Tasks
                  </h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingTasks.map((t) => (
                  <div key={t.task} className="flex items-start gap-3 p-3 rounded-xl hover:bg-navy-50 transition-colors cursor-pointer">
                    <div className="w-5 h-5 rounded border-2 border-navy-200 mt-0.5 shrink-0 hover:border-primary-400 transition-colors" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy-900">{t.task}</p>
                      <span className={cn(
                        "text-xs",
                        t.due === "Due today" ? "text-orange-500 font-medium" : "text-navy-400"
                      )}>{t.due}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, Settings, Save, User, Bell, Shield, Building, School } from "lucide-react";
import { AdminPageLayout } from "@/components/dashboard/admin-page-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("profiles")
      .select("first_name, last_name, email, phone")
      .limit(1)
      .then(({ data, error }) => {
        if (data?.[0]) setProfile(data[0] as typeof profile);
        if (error) setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ phone: profile.phone })
      .eq("email", profile.email);
    if (!error) setSaved(true);
    setSaving(false);
  };

  return (
    <AdminPageLayout title="Settings" breadcrumb={[{ label: "Admin" }, { label: "Settings" }]}>
      {loading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card padding="md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary-500" />
                  <h3 className="text-lg font-bold text-navy-900">Profile</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">First Name</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-900 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20"
                      value={profile.first_name}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">Last Name</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-900 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20"
                      value={profile.last_name}
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Email</label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-900 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20"
                    value={profile.email}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Phone</label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border border-navy-200 text-navy-900 text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="0400 000 000"
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button variant="primary" size="sm" onClick={handleSave} loading={saving}>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  {saved && <span className="text-sm text-green-600 font-medium">Saved!</span>}
                </div>
              </CardContent>
            </Card>

            <Card padding="md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary-500" />
                  <h3 className="text-lg font-bold text-navy-900">Notifications</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "New enrolments", desc: "Get notified when a new student enrols" },
                  { label: "Session reminders", desc: "Daily summary of upcoming sessions" },
                  { label: "Message alerts", desc: "When you receive a new message" },
                  { label: "Report submissions", desc: "When tutors submit progress reports" },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-navy-900">{n.label}</p>
                      <p className="text-xs text-navy-500">{n.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-navy-200 rounded-full peer peer-checked:bg-primary-500 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card padding="md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-500" />
                  <h3 className="text-lg font-bold text-navy-900">Role</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 border border-primary-200">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                    SA
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">Super Admin</p>
                    <p className="text-xs text-navy-500">Full system access</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card padding="md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary-500" />
                  <h3 className="text-lg font-bold text-navy-900">Organisation</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-navy-500">Name</p>
                  <p className="font-medium text-navy-900">Success at School</p>
                </div>
                <div>
                  <p className="text-navy-500">Website</p>
                  <p className="font-medium text-navy-900">successatschool.com.au</p>
                </div>
                <div>
                  <p className="text-navy-500">Since</p>
                  <p className="font-medium text-navy-900">2024</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </AdminPageLayout>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, MessageSquare, Search, Mail, Phone } from "lucide-react";
import { AdminPageLayout } from "@/components/dashboard/admin-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
}

const STATUSES = ["new", "read", "replied", "archived"] as const;
type Status = (typeof STATUSES)[number];

const statusVariant: Record<string, "primary" | "gold" | "navy" | "orange" | "outline"> = {
  new: "orange",
  read: "navy",
  replied: "primary",
  archived: "outline",
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/contact-messages")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load");
        setMessages(json.messages as ContactMessage[]);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: Status) {
    setUpdatingId(id);
    const previous = messages;
    setMessages((ms) => ms.map((m) => (m.id === id ? { ...m, status } : m)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    try {
      const res = await fetch(`/api/admin/contact-messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Update failed");
      }
    } catch (e) {
      setMessages(previous);
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setUpdatingId(null);
    }
  }

  function openMessage(m: ContactMessage) {
    setSelected(m);
    // Auto-advance brand-new messages to "read" on open.
    if ((m.status || "new") === "new") updateStatus(m.id, "read");
  }

  const filtered = messages.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q) ||
      (m.subject ?? "").toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q)
    );
  });

  const unread = messages.filter((m) => (m.status || "new") === "new").length;

  return (
    <AdminPageLayout title="Contact Messages" breadcrumb={[{ label: "Admin" }, { label: "Messages" }]}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 text-navy-400 text-sm border border-navy-200 flex-1 max-w-md">
          <Search className="h-4 w-4" />
          <input
            className="flex-1 bg-transparent outline-none text-navy-900 placeholder:text-navy-400"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="text-sm text-navy-500">
          <span className="font-semibold text-navy-700">{unread}</span> new
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card padding="sm">
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="h-8 w-8 text-red-400 mb-2" />
                  <p className="text-sm text-navy-500">{error}</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="h-8 w-8 text-navy-300 mb-2" />
                  <p className="text-sm text-navy-500">No messages</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filtered.map((m) => {
                    const isNew = (m.status || "new") === "new";
                    return (
                      <button
                        key={m.id}
                        onClick={() => openMessage(m)}
                        className={`w-full text-left p-3 rounded-xl transition-colors ${
                          selected?.id === m.id
                            ? "bg-primary-50 border border-primary-200"
                            : "hover:bg-navy-50 border border-transparent"
                        } ${isNew ? "bg-navy-50/70" : ""}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-sm truncate ${isNew ? "font-semibold text-navy-900" : "text-navy-700"}`}>
                            {m.name}
                          </span>
                          <span className="text-xs text-navy-400 shrink-0">
                            {new Date(m.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                          </span>
                        </div>
                        <p className={`text-xs mt-0.5 truncate ${isNew ? "font-medium text-navy-700" : "text-navy-500"}`}>
                          {m.subject || "(no subject)"}
                        </p>
                        <p className="text-xs text-navy-400 mt-0.5 truncate">{m.message}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card padding="md">
            <CardContent>
              {selected ? (
                <div>
                  <div className="flex items-start justify-between mb-6 gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-navy-900">{selected.subject || "(no subject)"}</h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-navy-500 flex-wrap">
                        <span>
                          From: <span className="font-medium text-navy-700">{selected.name}</span>
                        </span>
                        <span>·</span>
                        <span>{new Date(selected.created_at).toLocaleString("en-AU")}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <a href={`mailto:${selected.email}`} className="flex items-center gap-1 text-xs text-primary-600 hover:underline">
                          <Mail className="h-3 w-3" /> {selected.email}
                        </a>
                        {selected.phone && (
                          <a href={`tel:${selected.phone}`} className="flex items-center gap-1 text-xs text-navy-500 hover:underline">
                            <Phone className="h-3 w-3" /> {selected.phone}
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={statusVariant[selected.status || "new"] || "outline"} size="sm">
                        {(selected.status || "new").charAt(0).toUpperCase() + (selected.status || "new").slice(1)}
                      </Badge>
                      <select
                        aria-label="Update status"
                        value={selected.status || "new"}
                        disabled={updatingId === selected.id}
                        onChange={(e) => updateStatus(selected.id, e.target.value as Status)}
                        className="text-xs border border-navy-200 rounded-lg px-2 py-1 bg-white text-navy-700 disabled:opacity-50"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || "Your enquiry")}`}>
                        <Button variant="primary" size="sm">
                          <Mail className="h-4 w-4" />
                          Reply
                        </Button>
                      </a>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none text-navy-700 whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <MessageSquare className="h-12 w-12 text-navy-200 mb-4" />
                  <p className="text-navy-600 font-medium">Select a message</p>
                  <p className="text-sm text-navy-400 mt-1">Choose a message from the list to read it</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPageLayout>
  );
}

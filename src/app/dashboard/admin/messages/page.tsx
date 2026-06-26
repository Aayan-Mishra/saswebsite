"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, MessageSquare, Search, Send, Trash2 } from "lucide-react";
import { AdminPageLayout } from "@/components/dashboard/admin-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface MessageRow {
  id: string;
  subject: string;
  body: string;
  read: boolean;
  created_at: string;
  sender: { first_name: string; last_name: string; email: string } | null;
  receiver: { first_name: string; last_name: string; email: string } | null;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MessageRow | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("messages")
      .select("id, subject, body, read, created_at, sender:profiles!sender_id(first_name, last_name, email), receiver:profiles!receiver_id(first_name, last_name, email)")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setMessages(data as unknown as MessageRow[]);
        setLoading(false);
      });
  }, []);

  const filtered = messages.filter((m) => {
    const q = search.toLowerCase();
    return m.subject.toLowerCase().includes(q)
      || m.body.toLowerCase().includes(q)
      || `${m.sender?.first_name} ${m.sender?.last_name}`.toLowerCase().includes(q);
  });

  const unread = messages.filter((m) => !m.read).length;

  return (
    <AdminPageLayout title="Messages" breadcrumb={[{ label: "Admin" }, { label: "Messages" }]}>
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
          <span className="font-semibold text-navy-700">{unread}</span> unread
        </div>
        <Button variant="primary" size="sm">
          <Send className="h-4 w-4" />
          Compose
        </Button>
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
                  <p className="text-sm text-navy-500">Failed to load</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="h-8 w-8 text-navy-300 mb-2" />
                  <p className="text-sm text-navy-500">No messages</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filtered.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelected(m)}
                      className={`w-full text-left p-3 rounded-xl transition-colors ${
                        selected?.id === m.id
                          ? "bg-primary-50 border border-primary-200"
                          : "hover:bg-navy-50 border border-transparent"
                      } ${!m.read ? "bg-navy-50/70" : ""}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm truncate ${!m.read ? "font-semibold text-navy-900" : "text-navy-700"}`}>
                          {m.sender ? `${m.sender.first_name} ${m.sender.last_name}` : "Unknown"}
                        </span>
                        <span className="text-xs text-navy-400 shrink-0">
                          {new Date(m.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                        </span>
                      </div>
                      <p className={`text-xs mt-0.5 truncate ${!m.read ? "font-medium text-navy-700" : "text-navy-500"}`}>
                        {m.subject}
                      </p>
                      <p className="text-xs text-navy-400 mt-0.5 truncate">{m.body}</p>
                    </button>
                  ))}
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
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-navy-900">{selected.subject}</h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-navy-500">
                        <span>
                          From: <span className="font-medium text-navy-700">
                            {selected.sender ? `${selected.sender.first_name} ${selected.sender.last_name}` : "Unknown"}
                          </span>
                        </span>
                        <span>·</span>
                        <span>{new Date(selected.created_at).toLocaleString("en-AU")}</span>
                      </div>
                      {selected.sender?.email && (
                        <p className="text-xs text-navy-400 mt-0.5">{selected.sender.email}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                      <Button variant="primary" size="sm">
                        <Send className="h-4 w-4" />
                        Reply
                      </Button>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none text-navy-700 whitespace-pre-wrap">
                    {selected.body}
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

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, Plus, Trash2, CheckCircle2, XCircle, Loader2,
  Eye, EyeOff, Megaphone, GripVertical, Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  description: string;
  date_label: string;
  is_new: boolean;
  is_active: boolean;
  show_in_bar: boolean;
  sort_order: number;
  created_at: string;
}

const EMPTY_FORM = {
  title: "",
  description: "",
  date_label: "",
  is_new: true,
  is_active: true,
  show_in_bar: true,
  sort_order: 0,
};

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-brand-gold/60 focus:bg-white/15 focus:ring-2 focus:ring-brand-gold/30 transition-all";

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition-all",
        checked
          ? "bg-green-500/20 text-green-400 ring-1 ring-green-500/40"
          : "bg-white/10 text-white/40 ring-1 ring-white/10"
      )}
    >
      {checked ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
      {label}
    </button>
  );
}

export default function NotificationsAdminPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/notifications");
    if (res.status === 401) {
      setUnauthorized(true);
    } else if (res.ok) {
      const json = await res.json();
      setNotifications(json.notifications ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    const res = await fetch("/api/admin/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setSaving(false);
    if (!res.ok) { showToast(json.error, false); return; }
    showToast("Notification added!", true);
    setForm({ ...EMPTY_FORM });
    setShowForm(false);
    load();
  }

  async function toggleField(id: string, field: "is_active" | "is_new" | "show_in_bar", current: boolean) {
    const res = await fetch(`/api/admin/notifications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !current }),
    });
    if (res.ok) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, [field]: !current } : n))
      );
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this notification?")) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/notifications/${id}`, { method: "DELETE" });
    setDeleting(null);
    if (res.ok) {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      showToast("Deleted", true);
    } else {
      showToast("Failed to delete", false);
    }
  }

  return (
    <div className="min-h-screen bg-[#061530]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0a1f45] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gold/10">
            <Shield className="h-5 w-5 text-brand-gold" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin Panel</p>
            <h1 className="text-lg font-bold text-white">Notifications Manager</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="ml-auto flex items-center gap-2 rounded-xl bg-brand-gold px-4 py-2 text-sm font-bold text-[#061530] hover:bg-brand-gold/90 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add Notification
          </button>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className={cn(
              "fixed right-5 top-5 z-[9999] flex items-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-semibold shadow-xl",
              toast.ok ? "bg-green-600 text-white" : "bg-red-600 text-white"
            )}
          >
            {toast.ok ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl bg-[#0a1f45] p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-center gap-2">
                <Bell className="h-5 w-5 text-brand-gold" />
                <h2 className="text-base font-bold text-white">New Notification</h2>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Title *
                  </label>
                  <input
                    className={inputCls}
                    placeholder="e.g. UPSC Foundation Batch Starting July 2026"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Description
                  </label>
                  <input
                    className={inputCls}
                    placeholder="Optional short description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Date Label
                  </label>
                  <input
                    className={inputCls}
                    placeholder="e.g. 15 Jul"
                    value={form.date_label}
                    onChange={(e) => setForm({ ...form, date_label: e.target.value })}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Sort Order (lower = higher)
                  </label>
                  <input
                    type="number"
                    className={inputCls}
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Toggle
                    checked={form.is_new}
                    onChange={(v) => setForm({ ...form, is_new: v })}
                    label="Mark as NEW"
                  />
                  <Toggle
                    checked={form.is_active}
                    onChange={(v) => setForm({ ...form, is_active: v })}
                    label="Active"
                  />
                  <Toggle
                    checked={form.show_in_bar}
                    onChange={(v) => setForm({ ...form, show_in_bar: v })}
                    label="Show in top bar"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setForm({ ...EMPTY_FORM }); }}
                    className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-semibold text-white/60 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gold py-2.5 text-sm font-bold text-[#061530] hover:bg-brand-gold/90 transition-colors disabled:opacity-60"
                  >
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    Add Notification
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-brand-gold/40" />
          </div>
        ) : unauthorized ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-12 text-center">
            <Shield className="mx-auto mb-3 h-10 w-10 text-red-400/40" />
            <p className="text-red-400 font-semibold">Not authorized</p>
            <p className="mt-1 text-sm text-white/30">You need to be logged in as an admin to manage notifications.</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <Bell className="mx-auto mb-3 h-10 w-10 text-white/20" />
            <p className="text-white/40">No notifications yet. Add one above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <motion.div
                key={n.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className={cn(
                  "rounded-2xl border p-4 transition-all",
                  n.is_active
                    ? "border-white/10 bg-white/5"
                    : "border-white/5 bg-white/[0.02] opacity-50"
                )}
              >
                <div className="flex items-start gap-3">
                  <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-white/20" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <p className="flex-1 text-sm font-semibold text-white leading-snug min-w-0">
                        {n.title}
                      </p>
                      {n.is_new && (
                        <span className="rounded-full bg-brand-orange/20 px-2 py-0.5 text-[10px] font-bold text-brand-orange">
                          NEW
                        </span>
                      )}
                      {n.show_in_bar && (
                        <span className="rounded-full bg-brand-gold/20 px-2 py-0.5 text-[10px] font-bold text-brand-gold flex items-center gap-1">
                          <Megaphone className="h-2.5 w-2.5" /> TOP BAR
                        </span>
                      )}
                    </div>
                    {n.description && (
                      <p className="mt-0.5 text-xs text-white/40">{n.description}</p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {n.date_label && (
                        <span className="rounded-md bg-brand-blue/30 px-2 py-0.5 text-[10px] font-medium text-white/60">
                          {n.date_label}
                        </span>
                      )}
                      <span className="text-[10px] text-white/30">
                        Added {new Date(n.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleField(n.id, "show_in_bar", n.show_in_bar)}
                      title={n.show_in_bar ? "Remove from top bar" : "Add to top bar"}
                      className={cn(
                        "rounded-lg p-1.5 transition-colors",
                        n.show_in_bar
                          ? "text-brand-gold hover:bg-brand-gold/10"
                          : "text-white/30 hover:bg-white/5 hover:text-white/50"
                      )}
                    >
                      <Megaphone className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => toggleField(n.id, "is_active", n.is_active)}
                      title={n.is_active ? "Hide" : "Show"}
                      className="rounded-lg p-1.5 text-white/40 hover:bg-white/5 hover:text-white/70 transition-colors"
                    >
                      {n.is_active ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDelete(n.id)}
                      disabled={deleting === n.id}
                      className="rounded-lg p-1.5 text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-40"
                    >
                      {deleting === n.id
                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        : <Trash2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

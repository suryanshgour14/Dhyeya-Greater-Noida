"use client";

import { useEffect, useState, useCallback } from "react";
import { Package, ShoppingCart, UserCheck, Plus, Trash2, RefreshCw, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Product {
  id: string;
  type: "course" | "test";
  ref_id: string | null;
  ref_slug: string | null;
  title: string;
  title_hi: string | null;
  price_inr: number;
  is_active: boolean;
  access_days: number | null;
  created_at: string;
}

interface Order {
  id: string;
  student_id: string;
  product_id: string;
  razorpay_order_id: string;
  amount_paise: number;
  status: string;
  created_at: string;
  products: { title: string; type: string } | null;
  profiles: { full_name: string; email: string } | null;
}

interface Enrollment {
  id: string;
  student_id: string;
  product_id: string;
  granted_at: string;
  expires_at: string | null;
  products: { title: string; type: string } | null;
  profiles: { full_name: string; email: string } | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const inputCls = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";
const selectCls = `${inputCls} cursor-pointer`;

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function fmtMoney(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

// ─── Products Tab ─────────────────────────────────────────────────────────────

function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [form, setForm] = useState({
    type: "course", ref_id: "", ref_slug: "", title: "", title_hi: "",
    price_inr: "", access_days: "", is_active: true,
  });

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    const json = await res.json();
    setProducts(json.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price_inr: parseFloat(form.price_inr),
        access_days: form.access_days ? parseInt(form.access_days) : null,
        ref_id: form.ref_id || null,
        ref_slug: form.ref_slug || null,
      }),
    });
    const json = await res.json();
    setSaving(false);
    if (res.ok) {
      setMsg({ text: "Product created.", ok: true });
      setShowForm(false);
      setForm({ type: "course", ref_id: "", ref_slug: "", title: "", title_hi: "", price_inr: "", access_days: "", is_active: true });
      load();
    } else {
      setMsg({ text: json.error ?? "Failed.", ok: false });
    }
  }

  async function toggleActive(product: Product) {
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: product.id, is_active: !product.is_active }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? Existing enrollments are unaffected.")) return;
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{products.length} product(s)</p>
        <div className="flex gap-2">
          <button onClick={load} className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-1.5 rounded-xl bg-brand-blue px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
          >
            <Plus className="h-3.5 w-3.5" /> Add Product
            {showForm ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {msg && (
        <div className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium ${msg.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {msg.ok ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          {msg.text}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-700">New Product</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Type *</label>
              <select className={selectCls} value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                <option value="course">Course</option>
                <option value="test">Test</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Price (INR) *</label>
              <input type="number" min="1" step="1" required className={inputCls} placeholder="e.g. 4999" value={form.price_inr} onChange={(e) => setForm((f) => ({ ...f, price_inr: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Title (English) *</label>
            <input type="text" required className={inputCls} placeholder="IAS Foundation 2025" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Title (Hindi)</label>
            <input type="text" className={inputCls} placeholder="आईएएस फाउंडेशन 2025" value={form.title_hi} onChange={(e) => setForm((f) => ({ ...f, title_hi: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">{form.type === "course" ? "Course Slug (ref_slug)" : "Test UUID (ref_id)"}</label>
              {form.type === "course"
                ? <input type="text" className={inputCls} placeholder="ias-foundation" value={form.ref_slug} onChange={(e) => setForm((f) => ({ ...f, ref_slug: e.target.value }))} />
                : <input type="text" className={inputCls} placeholder="uuid of test row" value={form.ref_id} onChange={(e) => setForm((f) => ({ ...f, ref_id: e.target.value }))} />
              }
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Access Days (blank = lifetime)</label>
              <input type="number" min="1" className={inputCls} placeholder="365" value={form.access_days} onChange={(e) => setForm((f) => ({ ...f, access_days: e.target.value }))} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="is_active" checked={form.is_active} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))} className="h-4 w-4 rounded border-slate-300" />
            <label htmlFor="is_active" className="text-xs font-medium text-slate-600">Active (visible to students)</label>
          </div>
          <div className="flex gap-2 pt-1">
            <button type="submit" disabled={saving} className="rounded-xl bg-brand-blue px-5 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60">
              {saving ? "Saving…" : "Create Product"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />)}
        </div>
      ) : products.length === 0 ? (
        <p className="py-8 text-center text-slate-400">No products yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="bg-white hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{p.title}</p>
                    {p.ref_slug && <p className="text-xs text-slate-400">{p.ref_slug}</p>}
                    {p.ref_id && <p className="text-xs text-slate-400 font-mono">{p.ref_id.slice(0, 8)}…</p>}
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-600">{p.type}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-700">₹{p.price_inr.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleActive(p)} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${p.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {p.is_active ? "ACTIVE" : "INACTIVE"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    const qs = filter !== "all" ? `?status=${filter}` : "";
    const res = await fetch(`/api/admin/orders${qs}`);
    const json = await res.json();
    setOrders(json.data ?? []);
    setLoading(false);
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    paid: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-600",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {["all", "pending", "paid", "failed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${filter === s ? "bg-brand-blue text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <button onClick={load} className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />)}</div>
      ) : orders.length === 0 ? (
        <p className="py-8 text-center text-slate-400">No orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o.id} className="bg-white hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{o.profiles?.full_name ?? "—"}</p>
                    <p className="text-xs text-slate-400">{o.profiles?.email}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{o.products?.title ?? o.product_id.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-right font-semibold">{fmtMoney(o.amount_paise)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${STATUS_COLORS[o.status] ?? "bg-slate-100 text-slate-500"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{fmt(o.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Manual Grant Tab ─────────────────────────────────────────────────────────

function ManualGrantTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [form, setForm] = useState({ student_id: "", product_id: "", access_days: "" });

  const load = useCallback(async () => {
    setLoading(true);
    const [pRes, eRes] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/enrollments"),
    ]);
    const [pJson, eJson] = await Promise.all([pRes.json(), eRes.json()]);
    setProducts(pJson.data ?? []);
    setEnrollments(eJson.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleGrant(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    const res = await fetch("/api/admin/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: form.student_id.trim(),
        product_id: form.product_id,
        access_days: form.access_days ? parseInt(form.access_days) : null,
      }),
    });
    const json = await res.json();
    setSaving(false);
    if (res.ok) {
      setMsg({ text: "Enrollment granted successfully.", ok: true });
      setForm({ student_id: "", product_id: "", access_days: "" });
      load();
    } else {
      setMsg({ text: json.error ?? "Failed.", ok: false });
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="mb-4 text-sm font-bold text-slate-700">Grant Enrollment Manually</h3>
        <form onSubmit={handleGrant} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Student UUID (from Supabase auth) *</label>
            <input type="text" required className={inputCls} placeholder="uuid of the student" value={form.student_id} onChange={(e) => setForm((f) => ({ ...f, student_id: e.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Product *</label>
            <select required className={selectCls} value={form.product_id} onChange={(e) => setForm((f) => ({ ...f, product_id: e.target.value }))}>
              <option value="">— Select product —</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.title} ({p.type}) — ₹{p.price_inr}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Access Days (blank = lifetime)</label>
            <input type="number" min="1" className={inputCls} placeholder="365" value={form.access_days} onChange={(e) => setForm((f) => ({ ...f, access_days: e.target.value }))} />
          </div>
          {msg && (
            <div className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium ${msg.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {msg.ok ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {msg.text}
            </div>
          )}
          <button type="submit" disabled={saving} className="rounded-xl bg-brand-blue px-5 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60">
            {saving ? "Granting…" : "Grant Enrollment"}
          </button>
        </form>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-700">Recent Enrollments</h3>
          <button onClick={load} className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
        {loading ? (
          <div className="space-y-3">{[1, 2].map((i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />)}</div>
        ) : enrollments.length === 0 ? (
          <p className="py-6 text-center text-slate-400">No enrollments yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">Student</th>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Granted</th>
                  <th className="px-4 py-3 text-left">Expires</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enrollments.map((e) => {
                  const expired = e.expires_at && new Date(e.expires_at) < new Date();
                  return (
                    <tr key={e.id} className="bg-white hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-800">{e.profiles?.full_name ?? "—"}</p>
                        <p className="text-xs text-slate-400">{e.profiles?.email}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{e.products?.title ?? "—"}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{fmt(e.granted_at)}</td>
                      <td className="px-4 py-3">
                        {e.expires_at
                          ? <span className={`text-xs font-medium ${expired ? "text-red-500" : "text-slate-600"}`}>{fmt(e.expires_at)}</span>
                          : <span className="text-xs font-semibold text-green-600">Lifetime</span>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "products",  label: "Products",     Icon: Package },
  { id: "orders",    label: "Orders",       Icon: ShoppingCart },
  { id: "grants",    label: "Manual Grant", Icon: UserCheck },
] as const;

type Tab = (typeof TABS)[number]["id"];

export default function AdminPaymentsPage() {
  const [active, setActive] = useState<Tab>("products");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white px-4 py-5 shadow-sm">
        <h1 className="text-xl font-extrabold text-slate-800">Payments &amp; Enrollments</h1>
        <p className="mt-0.5 text-sm text-slate-400">Manage products, view orders, and grant enrollments.</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-slate-200 bg-white px-4">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              active === id
                ? "border-brand-blue text-brand-blue"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {active === "products" && <ProductsTab />}
        {active === "orders"   && <OrdersTab />}
        {active === "grants"   && <ManualGrantTab />}
      </div>
    </div>
  );
}

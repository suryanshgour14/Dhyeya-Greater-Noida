import nodemailer from "nodemailer";

// Owner notification email (free, via Gmail SMTP + App Password).
// Sent server-side from the settle step so it fires even on the webhook
// path where no browser is involved. Never throws — returns ok:false so the
// caller can leave owner_notified_at null and let a later webhook/reconcile
// retry.

export interface OwnerNotifyPayload {
  fullName: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  email: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
  productTitle: string;
  productType: string;          // course | test
  amountInr: number;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  paidAt: string;               // ISO string
  status: string;               // e.g. captured / paid
}

// Lazy transporter — not constructed at import time so the build doesn't
// require SMTP creds to be present.
function transporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

function fmtINR(n: number) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

export async function notifyOwner(p: OwnerNotifyPayload): Promise<{ ok: boolean }> {
  const tx = transporter();
  if (!tx) {
    console.error("[notify-owner] GMAIL_USER / GMAIL_APP_PASSWORD not set — skipping email");
    return { ok: false };
  }

  const to = process.env.OWNER_EMAIL || process.env.GMAIL_USER!;
  const fullAddress = `${p.address}, ${p.city}, ${p.state} - ${p.pincode}`;
  const waNumber = p.mobile.replace(/[^0-9]/g, "");
  const waLink = `https://wa.me/91${waNumber}`;

  const rows: [string, string][] = [
    ["Purchased", `${p.productTitle} (${p.productType})`],
    ["Amount Paid", fmtINR(p.amountInr)],
    ["Transaction Status", p.status],
    ["Payment Time", new Date(p.paidAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
    ["", ""],
    ["Name", p.fullName],
    ["Father's Name", p.fatherName],
    ["Mother's Name", p.motherName],
    ["Mobile", p.mobile],
    ["Email", p.email],
    ["Address", fullAddress],
    ["", ""],
    ["Razorpay Payment ID", p.razorpayPaymentId],
    ["Razorpay Order ID", p.razorpayOrderId],
  ];

  const htmlRows = rows
    .map(([k, v]) =>
      k === ""
        ? `<tr><td colspan="2" style="padding:6px 0"></td></tr>`
        : `<tr>
             <td style="padding:6px 14px 6px 0;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top">${k}</td>
             <td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:600">${v}</td>
           </tr>`
    )
    .join("");

  const html = `
  <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto">
    <h2 style="color:#0B1C3D;margin:0 0 4px">New Enrollment / Purchase ✅</h2>
    <p style="color:#64748b;margin:0 0 18px;font-size:14px">A payment was verified successfully. Grant this student access on the app.</p>
    <table style="border-collapse:collapse;width:100%">${htmlRows}</table>
    <p style="margin:20px 0 0">
      <a href="${waLink}" style="display:inline-block;background:#22c55e;color:#fff;text-decoration:none;padding:9px 16px;border-radius:8px;font-size:13px;font-weight:700">
        WhatsApp ${p.fullName}
      </a>
    </p>
    <p style="color:#94a3b8;font-size:11px;margin-top:20px">Dhyeya IAS Greater Noida — automated purchase notification.</p>
  </div>`;

  const text = rows
    .filter(([k]) => k !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  try {
    await tx.sendMail({
      from: `"Dhyeya IAS Purchases" <${process.env.GMAIL_USER}>`,
      to,
      subject: `New Purchase — ${p.productTitle} — ${p.fullName} (${fmtINR(p.amountInr)})`,
      text,
      html,
    });
    return { ok: true };
  } catch (err) {
    console.error("[notify-owner] send failed:", err instanceof Error ? err.message : err);
    return { ok: false };
  }
}

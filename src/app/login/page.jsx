"use client";
/** login/page.jsx - Split-screen login. Validates, signs in against the demo users, redirects by role. */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Clock3, ScrollText } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { ENV } from "@/config/env";
import { DEVELOPER } from "@/config/constants";
import { homeForRole } from "@/config/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";

const POINTS = [
  [Clock3, "Timestamped by the system"],
  [ShieldCheck, "One phone number, one owner"],
  [ScrollText, "Every action is logged"],
];

export default function LoginPage() {
  const { hydrated, isAuthenticated, homePath, signIn } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ loginId: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already signed in? Go straight to the right home page.
  useEffect(() => { if (hydrated && isAuthenticated) router.replace(homePath); }, [hydrated, isAuthenticated, homePath, router]);

  const set = (field) => (e) => { setForm((f) => ({ ...f, [field]: e.target.value })); setErrors((x) => ({ ...x, [field]: "" })); setFormError(""); };

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.loginId.trim()) next.loginId = "Enter your User ID.";
    if (!form.password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      const user = await signIn(form.loginId, form.password);
      toast.success(`Welcome, ${user.name}.`);
      router.replace(homeForRole(user.role));
    } catch (err) {
      setFormError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel: black and gold */}
      <section className="login-brand hidden flex-col justify-between p-12 text-white lg:flex">
        <div>
          <p className="font-serif text-logo-title">{ENV.appName}</p>
          <p className="mt-1 text-logo-sub font-medium tracking-wide text-login-gold">{ENV.companyName}</p>
          <span className="mt-5 block h-px w-14 bg-login-gold/60" aria-hidden />
        </div>
        <div>
          <h2 className="font-serif text-hero-h1">
            Whoever registers first <span className="italic text-login-gold">owns the client.</span>
          </h2>
          <p className="mt-4 max-w-md text-hero-sub text-hero-subtitle">A timestamped record that ends commission disputes before they start.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {POINTS.map(([Icon, text]) => (
              <Pill key={text} icon={Icon} className="!border-login-gold/30 !bg-white/5 !text-white">{text}</Pill>
            ))}
          </div>
        </div>
        <p className="text-right text-hero-small text-white/60">
          Designed and developed by{" "}
          <a href={DEVELOPER.url} target="_blank" rel="noopener noreferrer" className="font-medium text-login-gold underline-offset-4 hover:underline">{DEVELOPER.name}</a>
        </p>
      </section>

      {/* Form panel */}
      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <p className="font-serif text-logo-title lg:hidden">{ENV.appName}</p>
          <h1 className="mt-4 text-section-title lg:mt-0">Sign in</h1>
          <p className="mb-6 mt-1 text-section-sub text-ink-muted">Use the ID and password issued to you.</p>

          <form onSubmit={submit} noValidate className="space-y-4 rounded-section border border-card-border bg-card p-6 shadow-card">
            {formError && (
              <p role="alert" className="rounded-item border border-status-red/30 bg-status-red/10 px-4 py-3 text-[15px] text-status-red">{formError}</p>
            )}
            <Input label="User ID" value={form.loginId} onChange={set("loginId")} error={errors.loginId} autoComplete="username" autoFocus />
            <Input label="Password" type="password" value={form.password} onChange={set("password")} error={errors.password} autoComplete="current-password" />
            <Button type="submit" size="lg" loading={loading} className="w-full">Sign in</Button>
          </form>

          {ENV.showDemoCredentials && (
            <div className="mt-6 rounded-section border border-dashed border-pill-border p-4">
              <p className="mb-3 text-stat-label text-ink">Demo credentials</p>
              <ul className="space-y-2">
                {ENV.demoUsers.map((u) => (
                  <li key={u.loginId} className="flex items-center justify-between gap-3 text-meta">
                    <span><span className="font-medium text-ink">{u.name}</span> <span className="text-ink-muted">{u.loginId} / {u.password}</span></span>
                    <Button type="button" variant="secondary" size="sm" onClick={() => { setForm({ loginId: u.loginId, password: u.password }); setFormError(""); setErrors({}); }}>Fill</Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-8 text-center text-meta text-ink-muted lg:hidden">
            Designed and developed by{" "}
            <a href={DEVELOPER.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline">{DEVELOPER.name}</a>
          </p>
        </div>
      </section>
    </main>
  );
}

import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { SimplexNoise } from "@paper-design/shaders-react";

export function Login() {
  const location = useLocation();
  const isSignUp = location.pathname === "/signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = useMemo(() => (isSignUp ? "Create your Crest account" : "Welcome back"), [isSignUp]);
  const subtitle = isSignUp
    ? "Start building a stronger security posture."
    : "Sign in to continue to the Crest platform.";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || (isSignUp && password.length < 8)) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#100b18] text-white">
      <div className="pointer-events-none absolute inset-0">
        <SimplexNoise
          colors={["#F94446", "#FFD1E0", "#4449CF", "#FFFFFF", "#FFD36B"]}
          stepsPerColor={2}
          softness={0.08}
          speed={0.42}
          scale={0.62}
          fit="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(17,8,28,0.12),rgba(10,7,16,0.7)_44%,rgba(8,6,12,0.96)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(9,7,13,0.9),rgba(23,12,35,0.62)_48%,rgba(9,7,13,0.86))]" />

      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-10">
        <Link to="/" className="group flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Crest</span>
        </Link>
        <Link to="/" className="group flex h-7 w-28 items-center sm:h-8 sm:w-32" aria-label="Crest home">
          <img
            src="/crest-logo-white.svg"
            alt="Crest"
            className="h-full w-full object-contain object-right transition-opacity duration-300 group-hover:opacity-70"
          />
        </Link>
      </header>

      <main className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-28 lg:grid-cols-[1fr_460px] lg:px-12">
        <section className="hidden max-w-xl lg:block">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-white/55 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-[#b47cff]" />
            Enterprise security platform
          </div>
          <h1 className="font-display text-5xl leading-[1.04] tracking-[-0.04em] text-white xl:text-6xl">Security should feel invisible.</h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/45">Crest gives your team one place to detect, prevent, and respond to modern threats without adding friction to the work they already do.</p>
        </section>

        <section className="w-full rounded-[28px] border border-white/10 bg-[#17111f]/85 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-9">
          <div className="mb-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#b47cff]">Crest platform</p>
            <h2 className="font-display text-3xl tracking-[-0.025em]">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">{subtitle}</p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-[#b47cff]/20 bg-[#b47cff]/[0.07] p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#b47cff]/15 text-[#c79cff]">✓</div>
              <h3 className="font-medium">You're all set.</h3>
              <p className="mt-1 text-sm leading-6 text-white/45">Your request was received. Connect the Crest authentication backend to turn this into a live session.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-medium text-white/65">Work email</span>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#b47cff]/60 focus:bg-white/[0.065] focus:ring-4 focus:ring-[#b47cff]/10 placeholder:text-white/25" />
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between"><span className="text-xs font-medium text-white/65">Password</span>{!isSignUp && <button type="button" onClick={() => setSubmitted(true)} className="text-xs text-[#c79cff] transition hover:text-white">Forgot password?</button>}</div>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} required={isSignUp} minLength={isSignUp ? 8 : undefined} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isSignUp ? "At least 8 characters" : "Enter your password"} className="w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3.5 pr-12 text-sm text-white outline-none transition focus:border-[#b47cff]/60 focus:bg-white/[0.065] focus:ring-4 focus:ring-[#b47cff]/10 placeholder:text-white/25" />
                  <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/30 hover:text-white"><span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                </div>
              </label>

              <button type="submit" disabled={loading} className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#b47cff] px-4 py-3.5 text-sm font-semibold text-[#160c22] transition hover:bg-[#c69bff] disabled:cursor-wait disabled:opacity-60">
                {loading ? "Connecting…" : isSignUp ? "Create account" : "Continue"}
                {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
              </button>
            </form>
          )}

          <div className="my-7 flex items-center gap-4"><div className="h-px flex-1 bg-white/10" /><span className="text-[10px] uppercase tracking-[0.18em] text-white/25">or</span><div className="h-px flex-1 bg-white/10" /></div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setSubmitted(true)} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 text-xs font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white">Google</button>
            <button type="button" onClick={() => setSubmitted(true)} className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 text-xs font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white">GitHub</button>
          </div>

          <p className="mt-7 text-center text-xs text-white/35">{isSignUp ? "Already have an account?" : "Don't have an account?"} <Link to={isSignUp ? "/login" : "/signup"} className="font-medium text-[#c79cff] hover:text-white">{isSignUp ? "Sign in" : "Create one"}</Link></p>
          <p className="mt-5 text-center text-[10px] leading-5 text-white/25">By continuing, you agree to Crest's <Link to="/terms" className="underline hover:text-white/55">Terms</Link> and <Link to="/privacy" className="underline hover:text-white/55">Privacy Policy</Link>.</p>
        </section>
      </main>
    </div>
  );
}

export default Login;

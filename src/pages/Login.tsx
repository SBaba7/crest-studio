import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TwinklingMatrixBackground } from "@/components/TwinklingMatrixBackground";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 selection:bg-purple-500/30 overflow-hidden">
      {/* Animated Subtle Purple Twinkling Matrix Stars Background */}
      <TwinklingMatrixBackground />

      {/* Back to Home Link */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Crest</span>
      </Link>

      {/* Main Login Card matching screenshot */}
      <div className="w-full max-w-[420px] rounded-[24px] bg-[#1a0c2e]/95 sm:bg-[#1a0c2e]/90 border border-purple-500/20 p-7 sm:p-9 shadow-lg relative z-10 backdrop-blur-2xl">
        {/* Avatar / Monogram circle */}
        <div className="w-12 h-12 rounded-full bg-[#2a1347] border border-purple-400/30 text-white font-semibold flex items-center justify-center text-sm shadow-inner mb-5 mx-auto tracking-wide">
          JS
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-[26px] font-semibold text-white font-display tracking-tight">
            {isSignUp ? "Create an Account" : "Sign in to Account"}
          </h1>
          <p className="text-sm text-purple-200/80 mt-1.5 font-light">
            {isSignUp ? "Get started with Crest platform." : "Sign in to your Account."}
          </p>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="email" className="sr-only">
              Work Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@work-email.com"
              className="w-full bg-[#10061e] border border-purple-800/40 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:border-purple-400 transition-all font-light"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#581c87] hover:bg-[#6b21a8] active:bg-[#4a1670] text-white font-semibold rounded-xl py-3 text-sm transition-all cursor-pointer border border-purple-300/30 shadow-sm flex items-center justify-center gap-2"
          >
            {isSubmitted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Check your inbox</span>
              </>
            ) : (
              <span>Continue with Email</span>
            )}
          </button>
        </form>

        {/* Social Authentication List */}
        <div className="mt-4 space-y-2.5">
          {/* Google Button */}
          <button
            type="button"
            onClick={() => alert("Google authentication flow initiated.")}
            className="w-full bg-[#150926] hover:bg-[#200e3b] active:bg-[#2a134d] border border-purple-700/30 rounded-xl py-3 px-4 text-sm font-medium text-white flex items-center justify-center gap-3 transition-colors cursor-pointer"
          >
            {/* Google Colorful Logo */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.39 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12c0 2.06.46 3.84 1.26 5.42l4.02-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.27 2.61 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* GitHub Button */}
          <button
            type="button"
            onClick={() => alert("GitHub authentication flow initiated.")}
            className="w-full bg-[#120422]/60 hover:bg-[#1f0938] active:bg-[#280c46] border border-purple-900/40 rounded-xl py-3 px-4 text-sm font-medium text-white flex items-center justify-center gap-3 transition-colors cursor-pointer"
          >
            {/* GitHub Logo */}
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>Continue with GitHub</span>
          </button>

          {/* Apple Button */}
          <button
            type="button"
            onClick={() => alert("Apple authentication flow initiated.")}
            className="w-full bg-[#120422]/60 hover:bg-[#1f0938] active:bg-[#280c46] border border-purple-900/40 rounded-xl py-3 px-4 text-sm font-medium text-white flex items-center justify-center gap-3 transition-colors cursor-pointer"
          >
            {/* Apple Logo */}
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.61 1.35-.55.63-1.03 1.67-.9 2.68 1.01.08 2.03-.51 2.59-1.18z" />
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>

        {/* Toggle between Sign In and Sign Up */}
        <p className="text-center text-xs text-neutral-400 mt-6 font-light">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-white hover:underline font-semibold cursor-pointer ml-1"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>

        {/* Legal Disclaimer */}
        <p className="text-[11px] text-neutral-500 text-center leading-relaxed mt-5 font-light">
          By proceeding, you agree to creating a Crest account subject to our{" "}
          <a href="#" className="underline hover:text-neutral-400">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-neutral-400">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
export default Login;

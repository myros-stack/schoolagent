import Link from "next/link";
import { AuthForm } from "@/components/forms/auth-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-primary-600 to-primary-800 p-12 text-white lg:flex">
        <div>
          <p className="text-sm uppercase tracking-[0.2em]">Parents • AI</p>
          <h1 className="mt-4 text-4xl font-semibold">All school communications in one hub.</h1>
          <p className="mt-4 text-lg text-white/80">
            AI extracts tasks, reminders, deadlines, and calendar events so nothing slips through.
          </p>
        </div>
        <div className="space-y-2 text-sm text-white/70">
          <p>Built with Next.js + Supabase + Gemini.</p>
          <p>Secure OAuth with Gmail & Calendar.</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center bg-white px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md space-y-8">
          <Link href="/" className="text-sm font-semibold text-primary-600">
            ← Back to landing
          </Link>
          <AuthForm mode="login" />
          <p className="text-sm text-slate-600">
            New here?{" "}
            <Link href="/signup" className="font-semibold text-primary-600">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


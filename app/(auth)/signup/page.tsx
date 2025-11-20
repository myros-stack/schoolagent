import Link from "next/link";
import { AuthForm } from "@/components/forms/auth-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-primary-600 to-primary-800 p-12 text-white lg:flex">
        <div>
          <p className="text-sm uppercase tracking-[0.2em]">SchoolAgent</p>
          <h1 className="mt-4 text-4xl font-semibold">Launch your AI parent agent.</h1>
          <p className="mt-4 text-lg text-white/80">
            Supabase stores your family profiles securely while Gemini parses every incoming message.
          </p>
        </div>
        <div className="space-y-2 text-sm text-white/70">
          <p>• Gmail + Calendar OAuth</p>
          <p>• PDF uploads to Supabase Storage</p>
          <p>• Review dashboard before syncing</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center bg-white px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md space-y-8">
          <Link href="/" className="text-sm font-semibold text-primary-600">
            ← Back to landing
          </Link>
          <AuthForm mode="signup" />
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


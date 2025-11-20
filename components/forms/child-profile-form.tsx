import { createChildProfile } from "@/app/(dashboard)/dashboard/actions";

export function ChildProfileForm() {
  return (
    <form
      action={createChildProfile}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
    >
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="child-name">
          Child name
        </label>
        <input
          id="child-name"
          name="name"
          required
          className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
          placeholder="Madison Lee"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="child-grade">
            Grade
          </label>
          <input
            id="child-grade"
            name="grade"
            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            placeholder="4th"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="child-homeroom">
            Homeroom / teacher
          </label>
          <input
            id="child-homeroom"
            name="homeroom"
            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            placeholder="Ms. Patel"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700"
      >
        Save profile
      </button>
    </form>
  );
}


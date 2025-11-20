import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ChildCardProps = {
  name: string;
  grade?: string | null;
  homeroom?: string | null;
  actions?: ReactNode;
};

export function ChildCard({ name, grade, homeroom, actions }: ChildCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">Child</p>
          <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
          <p className={cn("mt-1 text-sm text-slate-600")}>
            {grade ?? "Grade unknown"} • {homeroom ?? "Homeroom TBA"}
          </p>
        </div>
        {actions}
      </div>
    </div>
  );
}


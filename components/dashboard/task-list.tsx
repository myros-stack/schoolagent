import { updateTaskStatus } from "@/app/(dashboard)/dashboard/actions";
import type { TaskItem } from "@/lib/types";

export function TaskList({ tasks }: { tasks: TaskItem[] }) {
  if (!tasks.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        No tasks yet. Connect Gmail or upload PDFs to see AI-created to-dos.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-400">{task.source}</p>
            <p className="text-lg font-semibold text-slate-900">{task.title}</p>
            {task.description && <p className="text-sm text-slate-600">{task.description}</p>}
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
              {task.childName && <span>Child: {task.childName}</span>}
              {task.dueAt && <span>Due: {new Date(task.dueAt).toLocaleString()}</span>}
              <span>Status: {task.status}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {task.status !== "completed" && (
              <form action={updateTaskStatus}>
                <input type="hidden" name="taskId" value={task.id} />
                <input type="hidden" name="status" value="completed" />
                <button className="rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">
                  Mark done
                </button>
              </form>
            )}
            {task.status !== "dismissed" && (
              <form action={updateTaskStatus}>
                <input type="hidden" name="taskId" value={task.id} />
                <input type="hidden" name="status" value="dismissed" />
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-300">
                  Dismiss
                </button>
              </form>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}


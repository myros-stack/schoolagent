import { syncEventToCalendar } from "@/app/(dashboard)/dashboard/actions";
import type { EventItem } from "@/lib/types";

export function EventList({ events }: { events: EventItem[] }) {
  if (!events.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        No events yet. Approve parsed events to see them here.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-400">{event.source}</p>
            <p className="text-lg font-semibold text-slate-900">{event.title}</p>
            {event.description && <p className="text-sm text-slate-600">{event.description}</p>}
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
              <span>Starts: {new Date(event.startsAt).toLocaleString()}</span>
              {event.endsAt && <span>Ends: {new Date(event.endsAt).toLocaleString()}</span>}
              {event.location && <span>Location: {event.location}</span>}
              {event.childName && <span>Child: {event.childName}</span>}
            </div>
          </div>
          <div>
            {event.synced ? (
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Synced to Calendar
              </span>
            ) : (
              <form action={syncEventToCalendar}>
                <input type="hidden" name="eventId" value={event.id} />
                <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                  Sync to Calendar
                </button>
              </form>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


import { useEffect, useState } from "react";
import type { Contact } from "../../types/contact";

interface ContactCardProps {
  contact: Contact;
  onRemove: (id: string) => void;
  onEdit: (contact: Contact) => void;
  onToggleFavorite: (id: string) => void;
}

export default function ContactCard({ contact, onRemove, onEdit, onToggleFavorite }: ContactCardProps) {
  const { id, name, email, phone, role, notes, initials, color, favorite, createdAt } = contact;
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    if (!confirmingDelete) return;
    const timer = setTimeout(() => setConfirmingDelete(false), 4000);
    return () => clearTimeout(timer);
  }, [confirmingDelete]);

  return (
    <div
      className="group relative flex flex-col gap-4 rounded-2xl border border-t-4 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
      style={{ borderColor: "var(--border)", borderTopColor: color, backgroundColor: "var(--surface)", boxShadow: "var(--shadow)" }}
    >
      <div className="absolute right-3 top-3 flex items-center gap-1">
        <button
          type="button"
          onClick={() => onToggleFavorite(id)}
          aria-pressed={favorite}
          aria-label={favorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
          className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
            favorite ? "" : "opacity-0 group-hover:opacity-100"
          }`}
          style={{ color: favorite ? "var(--accent)" : "var(--text-muted)" }}
        >
          <svg viewBox="0 0 24 24" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onEdit(contact)}
          aria-label={`Edit ${name}`}
          className="flex h-7 w-7 items-center justify-center rounded-full opacity-0 transition group-hover:opacity-100"
          style={{ color: "var(--text-muted)" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4 pr-14">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white shadow-md"
          style={{ backgroundColor: color }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold" style={{ color: "var(--text)" }}>
            {name}
          </p>
          <span
            className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
            style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
          >
            {role}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 border-t pt-3 text-sm" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
        <p className="flex items-center gap-2 truncate">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 6-10 7L2 6" />
          </svg>
          <span className="truncate">{email}</span>
        </p>
        <p className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>{phone}</span>
        </p>
        {notes && <p className="line-clamp-2 pt-1">{notes}</p>}
      </div>

      <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--border)" }}>
        <span className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
          Added {new Date(createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
        </span>
        {confirmingDelete ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onRemove(id)}
              className="rounded-full px-2.5 py-1 text-xs font-medium text-white"
              style={{ backgroundColor: "var(--danger)" }}
            >
              Confirm remove
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
              className="text-xs font-medium transition hover:opacity-80"
              style={{ color: "var(--text-muted)" }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            aria-label={`Remove ${name}`}
            className="remove-link text-xs font-medium transition"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

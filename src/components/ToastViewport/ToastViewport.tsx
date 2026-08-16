import { useToast, type ToastTone } from "../../context/ToastContext";

const TONE_COLOR: Record<ToastTone, string> = {
  success: "var(--accent-2)",
  error: "var(--danger)",
  info: "var(--text)",
};

export default function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 sm:inset-x-auto sm:right-4 sm:items-end"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm shadow-lg"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: TONE_COLOR[toast.tone],
            boxShadow: "var(--shadow)",
          }}
        >
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="text-[var(--text-muted)] transition hover:text-[var(--text)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

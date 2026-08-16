import ThemeToggle from "../ThemeToggle/ThemeToggle";

interface HeaderProps {
  total: number;
}

export default function Header({ total }: HeaderProps) {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg"
          style={{ backgroundColor: "var(--accent)", boxShadow: "0 10px 24px var(--accent-soft)" }}
        >
          <svg
            className="h-7 w-7 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="space-y-1.5">
          <p className="font-display text-3xl font-semibold tracking-tight" style={{ color: "var(--text)" }}>
            Contact Cards
          </p>
          <p className="max-w-md text-sm" style={{ color: "var(--text-muted)" }}>
            {total} {total === 1 ? "person" : "people"} in your directory — search, star your
            favorites, and keep every card up to date.
          </p>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}

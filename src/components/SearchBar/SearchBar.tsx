export type SortOption = "recent" | "name" | "favorites";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

export default function SearchBar({ query, onQueryChange, sortBy, onSortChange }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
          style={{ color: "var(--text-muted)" }}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name, email, or role…"
          aria-label="Search contacts"
          className="w-full rounded-xl border py-2.5 pl-9 pr-3 text-sm outline-none transition focus:ring-2"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
            color: "var(--text)",
          }}
        />
      </div>
      <label className="flex items-center gap-2 whitespace-nowrap text-sm" style={{ color: "var(--text-muted)" }}>
        Sort
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-xl border px-3 py-2.5 text-sm outline-none transition"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", color: "var(--text)" }}
        >
          <option value="recent">Recently added</option>
          <option value="name">Name A–Z</option>
          <option value="favorites">Favorites first</option>
        </select>
      </label>
    </div>
  );
}

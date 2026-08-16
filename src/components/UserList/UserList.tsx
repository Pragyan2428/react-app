import { useMemo, useState } from "react";
import ContactCard from "../ContactCard/ContactCard";
import SearchBar, { type SortOption } from "../SearchBar/SearchBar";
import type { Contact } from "../../types/contact";

interface UserListProps {
  contacts: Contact[];
  onRemove: (id: string) => void;
  onEdit: (contact: Contact) => void;
  onToggleFavorite: (id: string) => void;
}

export default function UserList({ contacts, onRemove, onEdit, onToggleFavorite }: UserListProps) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const visibleContacts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? contacts.filter((c) => [c.name, c.email, c.role].some((field) => field.toLowerCase().includes(q)))
      : contacts;

    const sorted = [...filtered];
    if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "favorites") {
      sorted.sort((a, b) => Number(b.favorite) - Number(a.favorite));
    } else {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return sorted;
  }, [contacts, query, sortBy]);

  return (
    <section className="w-full">
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>
            Contacts
          </h2>
          <span
            className="rounded-full px-2.5 py-1 text-xs font-medium"
            style={{ backgroundColor: "var(--surface-2)", color: "var(--text-muted)" }}
          >
            {contacts.length} {contacts.length === 1 ? "contact" : "contacts"}
          </span>
        </div>
        {contacts.length > 0 && (
          <SearchBar query={query} onQueryChange={setQuery} sortBy={sortBy} onSortChange={setSortBy} />
        )}
      </div>

      {contacts.length === 0 ? (
        <EmptyState message="No contacts yet" hint="Use the form above to add your first contact." />
      ) : visibleContacts.length === 0 ? (
        <EmptyState message="No matches" hint={`Nothing matches "${query}" — try a different search.`} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onRemove={onRemove}
              onEdit={onEdit}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function EmptyState({ message, hint }: { message: string; hint: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed p-10 text-center"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10" style={{ color: "var(--text-muted)" }}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      <p className="font-medium" style={{ color: "var(--text)" }}>{message}</p>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{hint}</p>
    </div>
  );
}

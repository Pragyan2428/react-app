import { useLocalStorage } from "./useLocalStorage";
import { getInitials, pickAvatarColor } from "../utils/avatar";
import type { Contact, NewContactInput } from "../types/contact";

const STORAGE_KEY = "contact-cards:contacts";

const SEED_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Ahmad Thakur",
    email: "ahmad.thakur@example.com",
    phone: "(+91) 632-555-0132",
    role: "Product Designer",
    initials: getInitials("Ahmad Thakur"),
    color: pickAvatarColor("Ahmad Thakur"),
    favorite: true,
    createdAt: "2026-05-01T09:00:00.000Z",
  },
  {
    id: "2",
    name: "Sourabh Khan",
    email: "sourabh.khan@example.com",
    phone: "(+91) 832-555-0198",
    role: "Frontend Engineer",
    initials: getInitials("Sourabh Khan"),
    color: pickAvatarColor("Sourabh Khan"),
    favorite: false,
    createdAt: "2026-05-03T09:00:00.000Z",
  },
  {
    id: "3",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "(628) 555-0167",
    role: "Project Manager",
    initials: getInitials("Priya Nair"),
    color: pickAvatarColor("Priya Nair"),
    favorite: false,
    createdAt: "2026-05-05T09:00:00.000Z",
  },
];

function newId(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function useContacts() {
  const [contacts, setContacts] = useLocalStorage<Contact[]>(STORAGE_KEY, SEED_CONTACTS);

  const addContact = (input: NewContactInput): Contact => {
    const contact: Contact = {
      id: newId(),
      name: input.name,
      email: input.email,
      phone: input.phone,
      role: input.role || "Contact",
      notes: input.notes?.trim() || undefined,
      initials: getInitials(input.name) || "?",
      color: pickAvatarColor(input.name),
      favorite: false,
      createdAt: new Date().toISOString(),
    };
    setContacts((prev) => [contact, ...prev]);
    return contact;
  };

  const updateContact = (id: string, input: NewContactInput) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              name: input.name,
              email: input.email,
              phone: input.phone,
              role: input.role || "Contact",
              notes: input.notes?.trim() || undefined,
              initials: getInitials(input.name) || "?",
              color: pickAvatarColor(input.name),
            }
          : c,
      ),
    );
  };

  const removeContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)));
  };

  return { contacts, addContact, updateContact, removeContact, toggleFavorite };
}

import { useState } from "react";
import Header from "./components/Header/Header";
import ContactForm from "./components/ContactForm/ContactForm";
import UserList from "./components/UserList/UserList";
import ToastViewport from "./components/ToastViewport/ToastViewport";
import { useContacts } from "./hooks/useContacts";
import { useToast } from "./context/ToastContext";
import type { Contact, NewContactInput } from "./types/contact";

export default function App() {
  const { contacts, addContact, updateContact, removeContact, toggleFavorite } = useContacts();
  const { showToast } = useToast();
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const handleSubmit = (input: NewContactInput) => {
    if (editingContact) {
      updateContact(editingContact.id, input);
      showToast(`Updated ${input.name}`, "success");
      setEditingContact(null);
    } else {
      addContact(input);
      showToast(`Added ${input.name}`, "success");
    }
  };

  const handleRemove = (id: string) => {
    const contact = contacts.find((c) => c.id === id);
    removeContact(id);
    if (editingContact?.id === id) setEditingContact(null);
    if (contact) showToast(`Removed ${contact.name}`, "info");
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    requestAnimationFrame(() => {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="min-h-screen px-4 py-10 transition-colors sm:px-8" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <Header total={contacts.length} />
        <ContactForm
          initialContact={editingContact}
          onSubmit={handleSubmit}
          onCancelEdit={() => setEditingContact(null)}
        />
        <UserList
          contacts={contacts}
          onRemove={handleRemove}
          onEdit={handleEdit}
          onToggleFavorite={toggleFavorite}
        />
      </div>
      <ToastViewport />
    </div>
  );
}

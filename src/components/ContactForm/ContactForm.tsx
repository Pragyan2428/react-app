import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { Contact, NewContactInput } from "../../types/contact";

interface ContactFormProps {
  initialContact?: Contact | null;
  onSubmit: (input: NewContactInput) => void;
  onCancelEdit?: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  role: string;
  notes: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", phone: "", role: "", notes: "" };

function contactToForm(contact: Contact): FormState {
  return {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    role: contact.role,
    notes: contact.notes ?? "",
  };
}

export default function ContactForm({ initialContact, onSubmit, onCancelEdit }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialContact ? contactToForm(initialContact) : EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const isEditing = Boolean(initialContact);

  useEffect(() => {
    setForm(initialContact ? contactToForm(initialContact) : EMPTY_FORM);
    setErrors({});
  }, [initialContact]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email";
    }
    if (!form.phone.trim()) nextErrors.phone = "Phone is required";
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      role: form.role.trim() || "Contact",
      notes: form.notes.trim() || undefined,
    });

    if (!isEditing) setForm(EMPTY_FORM);
    setErrors({});
  };

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="w-full scroll-mt-6 rounded-2xl border p-6 shadow-sm transition-colors"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", boxShadow: "var(--shadow)" }}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>
          {isEditing ? `Edit ${initialContact?.name}` : "Add a new contact"}
        </h2>
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm font-medium transition hover:opacity-80"
            style={{ color: "var(--text-muted)" }}
          >
            Cancel
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" value={form.name} onChange={handleChange} placeholder="Pragyan Singh" error={errors.name} />
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" error={errors.email} />
        <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="(+91)835-395-8170" error={errors.phone} />
        <Field label="Role (optional)" name="role" value={form.role} onChange={handleChange} placeholder="Web Designer" />
      </div>

      <div className="mt-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium" style={{ color: "var(--text)" }}>
            Notes (optional)
          </span>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="How you know them, follow-ups, anything worth remembering…"
            rows={2}
            className="rounded-lg border px-3 py-2 outline-none transition"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-2)", color: "var(--text)" }}
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl px-4 py-2.5 font-medium text-white shadow-md transition hover:opacity-90 active:scale-[0.99] sm:w-auto"
        style={{ backgroundColor: "var(--accent)" }}
      >
        {isEditing ? "Save changes" : "Add contact"}
      </button>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: keyof Omit<FormState, "notes">;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  error?: string;
}

function Field({ label, name, value, onChange, placeholder, type = "text", error }: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium" style={{ color: "var(--text)" }}>
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded-lg border px-3 py-2 outline-none transition focus:ring-2"
        style={{
          borderColor: error ? "var(--danger)" : "var(--border)",
          backgroundColor: "var(--surface-2)",
          color: "var(--text)",
        }}
      />
      {error && (
        <span className="text-xs" style={{ color: "var(--danger)" }}>
          {error}
        </span>
      )}
    </label>
  );
}

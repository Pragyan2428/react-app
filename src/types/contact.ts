export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  notes?: string;
  initials: string;
  color: string;
  favorite: boolean;
  createdAt: string;
}

export interface NewContactInput {
  name: string;
  email: string;
  phone: string;
  role: string;
  notes?: string;
}

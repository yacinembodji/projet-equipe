// src/services/ClientService.ts
export type StoredUser = {
  id?: string | number;
  name: string;
  email: string;
  role?: string;
  [k: string]: any;
};

export function getCurrentUser(): StoredUser | null {
  const u = localStorage.getItem("currentUser");
  return u ? (JSON.parse(u) as StoredUser) : null;
}

export function setCurrentUser(user: StoredUser) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}

// ⚡ Ajoute cette fonction pour récupérer l'ID du client connecté
export function getCurrentClientId(): string | null {
  const user = getCurrentUser();
  if (user && user.role === "client") return String(user.id);
  return null;
}

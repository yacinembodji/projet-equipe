// src/services/ProductClient.ts
export type ProductForClient = {
  id?: string | number;
  name: string;
  price: number;
  type_de_creation?: string;
  detail_de_la_commande?: string;
  [k: string]: any;
};

export type CommandForClient = {
  id?: string;
  productId: string;
  productName: string;
  price: number;
  clientId: string;
  date: string;
  status: "en attente" | "validée" | "annulée";
  paymentStatus?: "pending" | "paid" | "validated";
  downloadUrl?: string;
  adminMessage?: string;
  paymentMethod?: "bank" | "wave" | "orange";
  accountHolderName?: string;
  iban?: string;
  bic?: string;
  phoneNumber?: string;
  clientName?: string;
  clientEmail?: string;
  details?: string;
};

const API_URL = "https://essayedeployer.onrender.com";
const PRODUCTS_ENDPOINT = `${API_URL}/products`;
const COMMANDS_ENDPOINT = `${API_URL}/commands`;

// Récupérer tous les produits
export async function getProductsForClient(): Promise<ProductForClient[]> {
  const res = await fetch(PRODUCTS_ENDPOINT);
  if (!res.ok) throw new Error(`Erreur chargement produits: ${res.status}`);
  return res.json();
}

// Récupérer les commandes pour un client spécifique
export async function getCommandsForClient(clientId: string): Promise<CommandForClient[]> {
  const res = await fetch(`${COMMANDS_ENDPOINT}?clientId=${clientId}`);
  if (!res.ok) throw new Error(`Erreur chargement commandes: ${res.status}`);
  return res.json();
}

// Créer une nouvelle commande pour un client
export async function createCommandForClient(command: Omit<CommandForClient, 'id'>): Promise<CommandForClient> {
  const res = await fetch(COMMANDS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!res.ok) throw new Error(`Erreur création commande: ${res.status}`);
  return res.json();
}

// Mettre à jour une commande pour un client
export async function updateCommandForClient(id: string, command: Partial<CommandForClient>): Promise<CommandForClient> {
  const res = await fetch(`${COMMANDS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!res.ok) throw new Error(`Erreur mise à jour commande: ${res.status}`);
  return res.json();
}

// Supprimer une commande pour un client
export async function deleteCommandForClient(id: string): Promise<void> {
  const res = await fetch(`${COMMANDS_ENDPOINT}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Erreur suppression commande: ${res.status}`);
}

// ---------- CommandService.tsx ----------
// Service de gestion CRUD pour les commandes (utilise fetch)
// Emplacement recommandé : src/services/CommandService.tsx

export type Command = {
  id?: string;
  clientId: string;
  productName: string;
  price: number;
  date: string;
  status: "en attente" | "validée" | "annulée";
  details?: string;
  clientName?: string;
  clientEmail?: string;
  downloadUrl?: string;
  adminMessage?: string;
};

const API_URL = "https://essayedeployer.onrender.com";
const COMMANDS_ENDPOINT = `${API_URL}/commands`;

async function handleResponse(response: Response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error: ${response.status} ${response.statusText} - ${text}`);
  }
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return response.json();
  return null;
}

const CommandService = {
  // GET /commands
  async getAll(): Promise<Command[]> {
    const res = await fetch(COMMANDS_ENDPOINT);
    return handleResponse(res);
  },

  // GET /commands/:id
  async getById(id: string): Promise<Command> {
    const res = await fetch(`${COMMANDS_ENDPOINT}/${id}`);
    return handleResponse(res);
  },

  // POST /commands
  async create(command: Command): Promise<Command> {
    const res = await fetch(COMMANDS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(command),
    });
    return handleResponse(res);
  },

  // PUT /commands/:id
  async update(id: string, command: Partial<Command>): Promise<Command> {
    const res = await fetch(`${COMMANDS_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(command),
    });
    return handleResponse(res);
  },

  // PATCH /commands/:id
  async patch(id: string, command: Partial<Command>): Promise<Command> {
    const res = await fetch(`${COMMANDS_ENDPOINT}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(command),
    });
    return handleResponse(res);
  },

  // DELETE /commands/:id
  async remove(id: string): Promise<void> {
    const res = await fetch(`${COMMANDS_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    await handleResponse(res);
  },
};

export default CommandService;

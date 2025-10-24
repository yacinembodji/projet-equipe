// ---------- UsersService.tsx ----------
// Service de gestion CRUD pour les utilisateurs (utilise fetch)

export type User = {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role?: string;
};

const API_URL ="https://essayedeployer.onrender.com";
const USERS_ENDPOINT = `${API_URL}/users`;

async function handleResponse(response: Response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error: ${response.status} ${response.statusText} - ${text}`);
  }
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return response.json();
  return null;
}

const UsersService = {
  async getAll(): Promise<User[]> {
    const res = await fetch(USERS_ENDPOINT);
    return handleResponse(res);
  },

  async getById(id: string): Promise<User> {
    const res = await fetch(`${USERS_ENDPOINT}/${id}`);
    return handleResponse(res);
  },

  async create(user: User): Promise<User> {
    const res = await fetch(USERS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return handleResponse(res);
  },

  async update(id: string, user: Partial<User>): Promise<User> {
    const res = await fetch(`${USERS_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return handleResponse(res);
  },

  async patch(id: string, user: Partial<User>): Promise<User> {
    const res = await fetch(`${USERS_ENDPOINT}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return handleResponse(res);
  },

  async remove(id: string): Promise<void> {
    const res = await fetch(`${USERS_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    await handleResponse(res);
  },
};

export default UsersService;

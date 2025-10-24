// ---------- ProductService.tsx ----------
// Service de gestion CRUD pour les produits (utilise fetch)
// Emplacement recommandé : src/services/ProductService.tsx

export type Product = {
  type?: string;
  id?: string;
  name: string;
  price: number;
  "type de creation"?: string;
  "detail de la commande"?: string;
};

const API_URL = "https://essayedeployer.onrender.com";
const PRODUCTS_ENDPOINT = `${API_URL}/products`;


async function handleResponse(response: Response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error: ${response.status} ${response.statusText} - ${text}`);
  }
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return response.json();
  return null;
}

const ProductService = {
  // GET /products
  async getAll(): Promise<Product[]> {
    const res = await fetch(PRODUCTS_ENDPOINT);
    return handleResponse(res);
  },

  // GET /products/:id
  async getById(id: string): Promise<Product> {
    const res = await fetch(`${PRODUCTS_ENDPOINT}/${id}`);
    return handleResponse(res);
  },

  // POST /products
  async create(product: Product): Promise<Product> {
    const res = await fetch(PRODUCTS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return handleResponse(res);
  },

  // PUT /products/:id
  async update(id: string, product: Partial<Product>): Promise<Product> {
    const res = await fetch(`${PRODUCTS_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return handleResponse(res);
  },

  // PATCH /products/:id
  async patch(id: string, product: Partial<Product>): Promise<Product> {
    const res = await fetch(`${PRODUCTS_ENDPOINT}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return handleResponse(res);
  },

  // DELETE /products/:id
  async remove(id: string): Promise<void> {
    const res = await fetch(`${PRODUCTS_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    await handleResponse(res);
  },
};

export default ProductService;

// Notes:
// - Si tu préfères utiliser des noms de champs sans espaces (par ex. typeDeCreation), il vaut mieux
//   modifier db.json et adapté le frontend. Je peux te fournir une version qui mappe les champs.
// - Si tu veux que j'ajoute la gestion des erreurs UI (toasts), ou une version avec axios, dis-le.

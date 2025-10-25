import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../Produits/ClientService";
import UsersService from "../services/UsersService";
import type { User } from "../services/UsersService";
import ProductService from "../services/ProductService";
import type { Product } from "../services/ProductService";
import CommandService from "../services/CommandService";
import type { Command } from "../services/CommandService";
import Swal from "sweetalert2";
import {
  Home,
  Users,
  Box,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  ShoppingCart,
  FileText,
  Star,
} from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);



const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  // Check if user is admin
  useEffect(() => {
    console.log("AdminDashboard - Current user:", user);
    if (!user) {
      console.log("AdminDashboard - No user found, redirecting to login");
      navigate("/login");
    } else if (user.role !== "admin") {
      console.log("AdminDashboard - User is not admin, redirecting to login");
      navigate("/login");
    } else {
      console.log("AdminDashboard - User is admin, proceeding");
    }
  }, [user, navigate]);

  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [newUser, setNewUser] = useState<User>({ name: "", email: "", password: "", role: "user" });
  const [newProduct, setNewProduct] = useState<Product>({ type: "", name: "", price: 0 });

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [activeSection, setActiveSection] = useState<"utilisateurs" | "produits" | "accueil" | "parametres" | "commandes">("accueil");
  const [commands, setCommands] = useState<Command[]>([]);
  const [editingCommand, setEditingCommand] = useState<Command | null>(null);
  const [editingCommandForEdit, setEditingCommandForEdit] = useState<Command | null>(null);
  const [newCommand, setNewCommand] = useState<Command>({ clientId: "", productName: "", price: 0, date: "", status: "en attente", clientName: "", clientEmail: "", details: "" });
  const [adminMessage, setAdminMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCommands = commands.filter((command) =>
    command.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (command.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
    command.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("Fetching data...");
      const [u, p, c] = await Promise.all([UsersService.getAll(), ProductService.getAll(), CommandService.getAll()]);
      console.log("Users:", u);
      console.log("Products:", p);
      console.log("Commands:", c);
      setUsers(u);
      setProducts(p);
      setCommands(c);
    } catch (err) {
      console.error("Error fetching data:", err);
      Swal.fire("Erreur", "Impossible de charger les données", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      await UsersService.create(newUser);
      Swal.fire("Succès", "Utilisateur ajouté !", "success");
      setNewUser({ name: "", email: "", password: "", role: "user" });
      fetchData();
    } catch (err) {
      console.error(err);
      Swal.fire("Erreur", "Impossible d'ajouter l'utilisateur", "error");
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUser(user);
    setActiveSection("utilisateurs");
  };

  const handleUpdateUser = async () => {
    if (!editingUser?.id) return;
    try {
      await UsersService.update(editingUser.id, newUser);
      Swal.fire("Succès", "Utilisateur modifié !", "success");
      setEditingUser(null);
      setNewUser({ name: "", email: "", password: "", role: "user" });
      fetchData();
    } catch (err) {
      console.error(err);
      Swal.fire("Erreur", "Impossible de modifier l'utilisateur", "error");
    }
  };

  const handleDeleteUser = async (id?: string) => {
    if (!id) return;
    try {
      await UsersService.remove(id);
      Swal.fire("Succès", "Utilisateur supprimé !", "success");
      fetchData();
    } catch (err) {
      console.error(err);
      Swal.fire("Erreur", "Impossible de supprimer l'utilisateur", "error");
    }
  };

  const handleAddProduct = async () => {
    try {
      await ProductService.create(newProduct);
      Swal.fire("Succès", "Produit ajouté !", "success");
      setNewProduct({ type: "", name: "", price: 0 });
      fetchData();
    } catch (err) {
      console.error(err);
      Swal.fire("Erreur", "Impossible d'ajouter le produit", "error");
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setActiveSection("produits");
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct?.id) return;
    try {
      await ProductService.update(editingProduct.id, newProduct);
      Swal.fire("Succès", "Produit modifié !", "success");
      setEditingProduct(null);
      setNewProduct({ type: "", name: "", price: 0 });
      fetchData();
    } catch (err) {
      console.error(err);
      Swal.fire("Erreur", "Impossible de modifier le produit", "error");
    }
  };

  const handleDeleteProduct = async (id?: string) => {
    if (!id) return;
    try {
      await ProductService.remove(id);
      Swal.fire("Succès", "Produit supprimé !", "success");
      fetchData();
    } catch (err) {
      console.error(err);
      Swal.fire("Erreur", "Impossible de supprimer le produit", "error");
    }
  };



  const handleUpdateCommand = async () => {
    if (!editingCommandForEdit?.id) return;
    try {
      await CommandService.update(editingCommandForEdit.id, newCommand);
      Swal.fire("Succès", "Commande modifiée !", "success");
      setEditingCommandForEdit(null);
      setNewCommand({ clientId: "", productName: "", price: 0, date: "", status: "en attente", clientName: "", clientEmail: "", details: "" });
      fetchData();
    } catch (err) {
      console.error(err);
      Swal.fire("Erreur", "Impossible de modifier la commande", "error");
    }
  };

  const handleDeleteCommand = async (id?: string) => {
    if (!id) return;
    try {
      await CommandService.remove(id);
      Swal.fire("Succès", "Commande supprimée !", "success");
      fetchData();
    } catch (err) {
      console.error(err);
      Swal.fire("Erreur", "Impossible de supprimer la commande", "error");
    }
  };

  const NavButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    section: "utilisateurs" | "produits" | "accueil" | "parametres" | "commandes";
  }> = ({ icon, label, section }) => (
    <button
      onClick={() => {
        setActiveSection(section);
        setSidebarOpen(false);
      }}
      className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-md transition hover:bg-purple-400 ${
        activeSection === section ? "bg-purple-400 font-semibold" : ""
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </button>
  );

  if (loading)
    return <p className="text-center mt-12 text-xl font-semibold text-gray-700">Chargement...</p>;

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-digipurple border-r p-4 w-72 hidden md:block text-white`}> 
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Digiservices</h2>
              <p className="text-sm text-white">Admin Panel</p>
            </div>
            <div className="text-white">
              <Home size={28} />
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <NavButton icon={<Home />} label="Accueil" section="accueil" />
            <NavButton icon={<Users />} label="Utilisateurs" section="utilisateurs" />
            <NavButton icon={<Box />} label="Produits" section="produits" />
            <NavButton icon={<ShoppingCart />} label="Commandes" section="commandes" />
            <NavButton icon={<Settings />} label="Paramètres" section="parametres" />
          </nav>

          <div className="mt-8">
            <button
              onClick={() => {
                logoutUser();
                navigate("/login");
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-purple-400 w-full"
            >
              <LogOut /> Déconnexion
            </button>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white w-full border-b">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md">
              <Menu />
            </button>
            <div>
              <h2 className="text-lg font-bold">Digiservices</h2>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
          <div>
            <button className="p-2 rounded-md">
              <LogOut />
            </button>
          </div>
        </div>

        {/* Mobile overlay sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden text-white">
            <div className="absolute inset-0 bg-black opacity-30 " onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white p-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Digiservices</h2>
                  <p className="text-sm text-gray-500">Admin Panel</p>
                </div>
                <button onClick={() => setSidebarOpen(false)}>
                  <X />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                <NavButton icon={<Home />} label="Accueil"  section="accueil" />
                <NavButton icon={<Users />} label="Utilisateurs" section="utilisateurs" />
                <NavButton icon={<Box />} label="Produits" section="produits" />
                <NavButton icon={<ShoppingCart />} label="Commandes" section="commandes" />
                <NavButton icon={<Settings />} label="Paramètres" section="parametres" />
              </nav>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Dashboard Admin</h1>

          {/* Accueil */}
          {activeSection === "accueil" && (
            <section className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-purple-400 rounded shadow">
                  <h3 className="text-lg font-semibold">Total Utilisateurs</h3>
                  <p className="text-3xl mt-4">{users.length}</p>
                </div>
                <div className="p-6 bg-green-400 rounded shadow">
                  <h3 className="text-lg font-semibold">Total Produits</h3>
                  <p className="text-3xl mt-4">{products.length}</p>
                </div>
                <div className="p-6 bg-yellow-400 rounded shadow">
                  <h3 className="text-lg font-semibold">Total Commandes</h3>
                  <p className="text-3xl mt-4">{commands.length}</p>
                </div>
                <div className="p-6 bg-digipurple rounded shadow">
                  <h3 className="text-lg font-semibold">Actions récentes</h3>
                  <p className="text-sm mt-4 text-black">Aucune action récente.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded shadow">
                  <h3 className="text-lg font-semibold mb-4">Statistiques Générales</h3>
                  <Bar
                    data={{
                      labels: ['Utilisateurs', 'Produits', 'Commandes'],
                      datasets: [
                        {
                          label: 'Total',
                          data: [users.length, products.length, commands.length],
                          backgroundColor: ['rgba(147, 51, 234, 0.6)', 'rgba(34, 197, 94, 0.6)', 'rgba(245, 158, 11, 0.6)'],
                          borderColor: ['rgba(147, 51, 234, 1)', 'rgba(34, 197, 94, 1)', 'rgba(245, 158, 11, 1)'],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top' as const,
                        },
                        title: {
                          display: true,
                          text: 'Aperçu des Données',
                        },
                      },
                    }}
                  />
                </div>

                <div className="p-6 bg-white rounded shadow">
                  <h3 className="text-lg font-semibold mb-4">Statut des Commandes</h3>
                  <Pie
                    data={{
                      labels: ['En attente', 'Validée', 'Annulée'],
                      datasets: [
                        {
                          label: 'Commandes',
                          data: [
                            commands.filter(c => c.status === 'en attente').length,
                            commands.filter(c => c.status === 'validée').length,
                            commands.filter(c => c.status === 'annulée').length,
                          ],
                          backgroundColor: [
                            'rgba(245, 158, 11, 0.6)',
                            'rgba(34, 197, 94, 0.6)',
                            'rgba(239, 68, 68, 0.6)',
                          ],
                          borderColor: [
                            'rgba(245, 158, 11, 1)',
                            'rgba(34, 197, 94, 1)',
                            'rgba(239, 68, 68, 1)',
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top' as const,
                        },
                        title: {
                          display: true,
                          text: 'Répartition des Statuts',
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Utilisateurs Section */}
          {activeSection === "utilisateurs" && (
            <section className="mb-16">
              <h2 className="text-3xl font-semibold mb-6 text-gray-700">Utilisateurs</h2>

              <div className="flex flex-wrap gap-3 mb-6 items-center">
                <input
                  type="text"
                  placeholder="Nom"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={editingUser ? handleUpdateUser : handleAddUser}
                  className={`px-5 py-2 rounded text-white font-semibold ${
                    editingUser ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
                  } transition`}
                >
                  {editingUser ? "Modifier" : "Ajouter"}
                </button>
              </div>

              <div className="overflow-x-auto rounded shadow-lg bg-white">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-purple-400  text-white uppercase text-sm">
                    <tr>
                      <th className="p-3">Nom</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Rôle</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3 capitalize">{user.role}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Produits Section */}
          {activeSection === "produits" && (
            <section>
              <h2 className="text-3xl font-semibold mb-6 text-gray-700">Produits</h2>

              <div className="flex flex-wrap gap-3 mb-6 items-center">
                <input
                  type="text"
                  placeholder="Type de produit"
                  value={newProduct["type de creation"] || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, "type de creation": e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Nom du produit"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="number"
                  placeholder="Prix"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                  className={`px-5 py-2 rounded text-white font-semibold ${
                    editingProduct ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
                  } transition`}
                >
                  {editingProduct ? "Modifier" : "Ajouter"}
                </button>
              </div>

              <div className="overflow-x-auto rounded shadow-lg bg-white">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
                    <tr>
                      <th className="p-3">Type</th>
                      <th className="p-3">Nom</th>
                      <th className="p-3">Prix</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-3">{product["type de creation"] || product.type}</td>
                        <td className="p-3">{product.name}</td>
                        <td className="p-3">{product.price}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Commandes Section */}
          {activeSection === "commandes" && (
            <section>
              <h2 className="text-3xl font-semibold mb-6 text-gray-700">Commandes</h2>

              <div className="flex flex-wrap gap-3 mb-6 items-center">
                <input
                  type="text"
                  placeholder="Rechercher des commandes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-5 py-2 rounded text-white font-semibold bg-digipurple hover:bg-purple-400 transition"
                >
                  Effacer
                </button>
              </div>

              <div className="mb-4">
                <p className="text-lg font-semibold">Nombre total de commandes: {filteredCommands.length}</p>
              </div>

              {editingCommandForEdit && (
                <div className="flex flex-wrap gap-3 mb-6 items-center">
                  <input
                    type="text"
                    placeholder="ID Client"
                    value={newCommand.clientId}
                    onChange={(e) => setNewCommand({ ...newCommand, clientId: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="Nom du produit"
                    value={newCommand.productName}
                    onChange={(e) => setNewCommand({ ...newCommand, productName: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="number"
                    placeholder="Prix"
                    value={newCommand.price}
                    onChange={(e) => setNewCommand({ ...newCommand, price: Number(e.target.value) })}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="date"
                    placeholder="Date"
                    value={newCommand.date}
                    onChange={(e) => setNewCommand({ ...newCommand, date: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <select
                    value={newCommand.status}
                    onChange={(e) => setNewCommand({ ...newCommand, status: e.target.value as "en attente" | "validée" | "annulée" })}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="en attente">En attente</option>
                    <option value="validée">Validée</option>
                    <option value="annulée">Annulée</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Nom du client"
                    value={newCommand.clientName}
                    onChange={(e) => setNewCommand({ ...newCommand, clientName: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="email"
                    placeholder="Email du client"
                    value={newCommand.clientEmail}
                    onChange={(e) => setNewCommand({ ...newCommand, clientEmail: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <textarea
                    placeholder="Détails"
                    value={newCommand.details}
                    onChange={(e) => setNewCommand({ ...newCommand, details: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={2}
                  />
                  <button
                    onClick={handleUpdateCommand}
                    className="px-5 py-2 rounded text-white font-semibold bg-yellow-500 hover:bg-yellow-600 transition"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => {
                      setEditingCommandForEdit(null);
                      setNewCommand({ clientId: "", productName: "", price: 0, date: "", status: "en attente", clientName: "", clientEmail: "", details: "" });
                    }}
                    className="px-5 py-2 rounded text-white font-semibold bg-gray-500 hover:bg-gray-600 transition"
                  >
                    Annuler
                  </button>
                </div>
              )}

              <div className="overflow-x-auto rounded shadow-lg bg-white">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
                    <tr>
                      <th className="p-3">Produit</th>
                      <th className="p-3">Prix</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommands.map((command) => (
                      <tr key={command.id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-3">{command.productName}</td>
                        <td className="p-3">{command.price} FCFA</td>
                        <td className="p-3">{command.date}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            command.status === "validée" ? "bg-green-100 text-green-800" :
                            command.status === "en attente" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {command.status}
                          </span>
                        </td>
                        <td className="p-3">{command.clientName}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => {
                              setEditingCommand(command);
                              setAdminMessage(command.adminMessage || "");
                            }}
                            className="bg-digipurple  text-white px-3 py-1 rounded transition"
                          >
                            Gérer
                          </button>
                          <button
                            onClick={() => {
                              setEditingCommandForEdit(command);
                              setNewCommand(command);
                              setActiveSection("commandes");
                            }}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDeleteCommand(command.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {editingCommand && (
                <div className="mt-6 p-6 bg-white rounded shadow">
                  <h3 className="text-xl font-semibold mb-4">Gérer la commande: {editingCommand.productName}</h3>
                  <p className="mb-2"><strong>Client:</strong> {editingCommand.clientName} ({editingCommand.clientEmail})</p>
                  <p className="mb-2"><strong>Détails:</strong> {editingCommand.details}</p>
                  <p className="mb-4"><strong>Statut actuel:</strong> {editingCommand.status}</p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message de l'admin</label>
                    <textarea
                      value={adminMessage}
                      onChange={(e) => setAdminMessage(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      rows={3}
                      placeholder="Ajouter un message pour le client..."
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Télécharger un fichier</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const formData = new FormData();
                          formData.append('file', file);
                          fetch('http://localhost:3000/upload', {
                            method: 'POST',
                            body: formData,
                          })
                          .then(response => response.json())
                          .then(data => {
                            setAdminMessage(prev => prev + (prev ? '\n' : '') + `Fichier téléchargé: ${data.fileUrl}`);
                          })
                          .catch(err => {
                            console.error(err);
                            Swal.fire("Erreur", "Impossible de télécharger le fichier", "error");
                          });
                        }
                      }}
                      className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!editingCommand.id) return;
                        try {
                          const downloadUrl = adminMessage.includes('Fichier téléchargé:') ? adminMessage.split('Fichier téléchargé:')[1].trim() : "https://example.com/download/" + editingCommand.id + ".pdf";
                          await CommandService.update(editingCommand.id, {
                            status: "validée",
                            adminMessage,
                            downloadUrl
                          });
                          Swal.fire("Succès", "Commande validée !", "success");
                          setEditingCommand(null);
                          setAdminMessage("");
                          fetchData();
                        } catch (err) {
                          console.error(err);
                          Swal.fire("Erreur", "Impossible de valider la commande", "error");
                        }
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                    >
                      Valider
                    </button>
                    <button
                      onClick={async () => {
                        if (!editingCommand.id) return;
                        try {
                          await CommandService.update(editingCommand.id, {
                            status: "annulée",
                            adminMessage
                          });
                          Swal.fire("Succès", "Commande annulée !", "success");
                          setEditingCommand(null);
                          setAdminMessage("");
                          fetchData();
                        } catch (err) {
                          console.error(err);
                          Swal.fire("Erreur", "Impossible d'annuler la commande", "error");
                        }
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => {
                        setEditingCommand(null);
                        setAdminMessage("");
                      }}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Paramètres */}
          {activeSection === "parametres" && (
            <section>
              <h2 className="text-3xl font-semibold mb-6 text-gray-700">Paramètres</h2>
              <div className="p-6 bg-white rounded shadow">
                <p className="text-gray-600">Ici vous pouvez ajouter des paramètres d'administration (ex: config, webhooks, etc.).</p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { getCurrentUser, getCurrentClientId } from "../Produits/ClientService";
import { getCommandsForClient, getProductsForClient, createCommandForClient, updateCommandForClient, deleteCommandForClient } from "../Produits/ProductClient";
import type { CommandForClient, ProductForClient } from "../Produits/ProductClient";
import CommandService from "../services/CommandService";
import Swal from "sweetalert2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ClientDashboard: React.FC = () => {
  const [products, setProducts] = useState<ProductForClient[]>([]);
  const [commands, setCommands] = useState<CommandForClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'commands' | 'history' | 'payments' | 'settings' | 'notifications'>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [newCommand, setNewCommand] = useState<CommandForClient>({ productId: "", productName: "", price: 0, clientId: "", date: new Date().toISOString().split('T')[0], status: "en attente" });
  const [editingCommand, setEditingCommand] = useState<CommandForClient | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [paymentCommand, setPaymentCommand] = useState<CommandForClient | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'wave' | 'orange'>('wave');
  const [phoneNumber, setPhoneNumber] = useState('');

  const user = getCurrentUser() || { name: "Test Client", email: "test@example.com" };
  const clientId = getCurrentClientId() || "m1k2Ypu"; // Default clientId for demo

  // Handlers for CRUD operations
  const handleCreateCommand = async () => {
    try {
      // Fetch all commands to check global limit
      const allCommands = await CommandService.getAll();
      if (allCommands.length >= 15) {
        Swal.fire("Erreur", "Le nombre maximum de commandes (15) a été atteint. Aucun autre client ne peut commander.", "error");
        return;
      }
      const commandToCreate = { ...newCommand, clientId };
      await createCommandForClient(commandToCreate);
      Swal.fire("Succès", "Commande créée avec succès !", "success");
      setNewCommand({ productId: "", productName: "", price: 0, clientId: "", date: new Date().toISOString().split('T')[0], status: "en attente" });
      setShowCreateForm(false);
      // Refresh commands
      const updatedCommands = await getCommandsForClient(clientId);
      setCommands(updatedCommands);
    } catch (err) {
      console.error(err);
      Swal.fire("Erreur", "Impossible de créer la commande", "error");
    }
  };

  const handleEditCommand = (command: CommandForClient) => {
    setEditingCommand(command);
    setNewCommand(command);
    setShowCreateForm(true);
  };

  const handleUpdateCommand = async () => {
    if (!editingCommand?.id) return;
    try {
      await updateCommandForClient(editingCommand.id, newCommand);
      Swal.fire("Succès", "Commande modifiée avec succès !", "success");
      setEditingCommand(null);
      setNewCommand({ productId: "", productName: "", price: 0, clientId: "", date: new Date().toISOString().split('T')[0], status: "en attente" });
      setShowCreateForm(false);
      // Refresh commands
      const updatedCommands = await getCommandsForClient(clientId);
      setCommands(updatedCommands);
    } catch (err) {
      console.error(err);
      Swal.fire("Erreur", "Impossible de modifier la commande", "error");
    }
  };

  const handleDeleteCommand = async (id: string) => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler"
    });
    if (result.isConfirmed) {
      try {
        await deleteCommandForClient(id);
        Swal.fire("Supprimé !", "La commande a été supprimée.", "success");
        // Refresh commands
        const updatedCommands = await getCommandsForClient(clientId);
        setCommands(updatedCommands);
      } catch (err) {
        console.error(err);
        Swal.fire("Erreur", "Impossible de supprimer la commande", "error");
      }
    }
  };

  useEffect(() => {
    console.log("ClientDashboard: useEffect triggered, clientId:", clientId);
    if (!clientId) {
      console.error("ClientDashboard: No clientId found, cannot load data");
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([getProductsForClient(), getCommandsForClient(clientId)])
      .then(([p, c]) => {
        console.log("ClientDashboard: Data loaded successfully", { products: p, commands: c });
        setProducts(p);
        setCommands(c);
      })
      .catch((err) => {
        console.error("ClientDashboard: Error loading data", err);
        // Afficher une erreur à l'utilisateur si nécessaire
      })
      .finally(() => setLoading(false));
  }, [clientId]);

  if (loading) {
    return (
      <p className="text-center mt-12 text-xl font-semibold text-gray-700">
        Chargement...
      </p>
    );
  }

  // Stats dynamiques à partir des commandes
  const stats = {
    servicesActifs: commands.filter((c) => c.status === "validée").length,
    paiementsEnCours: commands.filter((c) => c.status === "en attente").length,
    historiqueCommandes: commands.length,
    notificationsImportantes: commands.filter((c) => c.status === "en attente").length,
  };

  // Graphique bar (exemple simple)
  const barData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Services utilisés",
        data: [8, 10, 13, 9, 7, 11],
        borderRadius: 6,
        barThickness: 18,
      },
    ],
  };

  // Graphique pie (répartition des types de produits)
  const pieData = {
    labels: Array.from(new Set(products.map((p) => p.name))),
    datasets: [
      {
        data: products.map((p) => commands.filter((c) => c.productName === p.name).length),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const barChartData = {
    labels: ['Total Commandes', 'Validées', 'En attente'],
    datasets: [
      {
        label: 'Nombre',
        data: [
          commands.length,
          commands.filter(c => c.status === 'validée').length,
          commands.filter(c => c.status === 'en attente').length,
        ] as number[],
        backgroundColor: ['rgba(147, 51, 234, 0.6)', 'rgba(34, 197, 94, 0.6)', 'rgba(245, 158, 11, 0.6)'],
        borderColor: ['rgba(147, 51, 234, 1)', 'rgba(34, 197, 94, 1)', 'rgba(245, 158, 11, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['En attente', 'Validée', 'Annulée'],
    datasets: [
      {
        label: 'Commandes',
        data: [
          commands.filter(c => c.status === 'en attente').length,
          commands.filter(c => c.status === 'validée').length,
          commands.filter(c => c.status === 'annulée').length,
        ] as number[],
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
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-digipurple  text-white p-6 rounded-r-2xl shadow-lg">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">D</div>
            <div>
              <h3 className="font-semibold">Digiservices</h3>
              <p className="text-sm text-white/80">Tableau client</p>
            </div>
          </div>

          <nav className="space-y-3 text-sm">
            <a className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'dashboard' ? 'bg-purple-400' : 'hover:bg-purple-400'}`} onClick={() => setCurrentView('dashboard')}>🏠 Dashboard</a>
            <a className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'commands' ? 'bg-purple-400' : 'hover:bg-purple-400'}`} onClick={() => setCurrentView('commands')}>📦 Mes commandes</a>
            <a className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'notifications' ? 'bg-purple-400' : 'hover:bg-purple-400'}`} onClick={() => setCurrentView('notifications')}>🔔 Notifications</a>
            <a className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'history' ? 'bg-purple-400' : 'hover:bg-purple-400'}`} onClick={() => setCurrentView('history')}>🕘 Historique</a>
            <a className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'payments' ? 'bg-purple-400' : 'hover:bg-purple-400'}`} onClick={() => setCurrentView('payments')}>💳 Paiements</a>
            <a className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'settings' ? 'bg-purple-400' : 'hover:bg-purple-400'}`} onClick={() => setCurrentView('settings')}>⚙️ Paramètres</a>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          <header className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-semibold">Bonjour, {user.name}</h1>
              <p className=" text-digipurple text-2xl font-bold">Bienvenue sur ton espace client</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">👤</button>
              <button className="w-10 h-10 rounded-full bg-white/60 shadow relative" onClick={() => setShowNotifications(!showNotifications)}>
                🔔
                {commands.filter(c => c.status === "validée" && c.adminMessage).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {commands.filter(c => c.status === "validée" && c.adminMessage).length}
                  </span>
                )}
              </button>
            </div>
          </header>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute top-16 right-8 bg-white shadow-lg rounded-lg p-4 w-80 z-10">
              <h4 className="font-semibold mb-2">Messages de l'admin</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {commands.filter(c => c.status === "validée" && c.adminMessage).length > 0 ? (
                  commands.filter(c => c.status === "validée" && c.adminMessage).map((c) => (
                    <div key={c.id} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm font-medium">{c.productName}</p>
                      <p className="text-sm text-gray-700">{c.adminMessage}</p>
                      <p className="text-xs text-gray-500 mt-1">Validée le {c.date}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Aucun message.</p>
                )}
              </div>
            </div>
          )}

          {/* Content based on current view */}
          {currentView === 'dashboard' && (
            <>
              {/* KPI cards */}
              <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className=" p-6 bg-purple-400 rounded shadow">
                  <div className="text-2xl font-bold">{stats.servicesActifs}</div>
                  <div className="text-sm text-black font-bold">Services actifs</div>
                </div>
                <div className="bg-green-400 p-6 rounded shadow">
                  <div className="text-2xl font-bold">{stats.paiementsEnCours}</div>
                  <div className="text-sm text-black font-bold">Paiements en cours</div>
                </div>
                <div className="bg-yellow-400 p-6 rounded-xl shadow">
                  <div className="text-2xl font-bold">{stats.historiqueCommandes}</div>
                  <div className="text-sm text-black font-bold ">Historique de commandes</div>
                </div>
                <div className="bg-digipurple p-6 rounded-xl shadow">
                  <div className="text-2xl font-bold text-black">{stats.notificationsImportantes}</div>
                  <div className="text-sm text-black font-bold">Notifications importantes</div>
                </div>
              </section>

              {/* Charts */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
                  <h3 className="font-medium mb-4">Services utilisés par mois</h3>
                  <div style={{ height: 220 }}>
                    <Bar data={barData} options={{
                      plugins: { legend: { display: false } },
                      scales: { y: { beginAtZero: true, max: 15 } },
                    }} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                  <h3 className="font-medium mb-4">Répartition des types de services</h3>
                  <div style={{ height: 220 }} className="flex items-center justify-center">
                    <Pie data={pieData} options={{ plugins: { legend: { position: "right" } } }} />
                  </div>
                </div>
              </section>

              {/* Additional Charts */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 bg-white rounded-xl shadow">
                  <h3 className="text-lg font-semibold mb-4">Statistiques des Commandes</h3>
                  <div style={{ height: 220 }}>
                    <Bar
                      data={barChartData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top' as const,
                          },
                          title: {
                            display: true,
                            text: 'Aperçu des Commandes',
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="p-6 bg-white rounded-xl shadow">
                  <h3 className="text-lg font-semibold mb-4">Statut des Commandes</h3>
                  <div style={{ height: 220 }}>
                    <Pie
                      data={pieChartData}
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

              {/* Table */}
              <section className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-medium mb-4">Derniers services</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="text-sm text-gray-500 border-b">
                        <th className="py-3">Nom du service</th>
                        <th className="py-3">Date</th>
                        <th className="py-3">Statut</th>
                        <th className="py-3">Prix</th>
                        <th className="py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {commands.slice(0, 5).map((c) => (
                        <tr key={c.id} className="border-b hover:bg-gray-50">
                          <td className="py-4">{c.productName}</td>
                          <td className="py-4">{c.date}</td>
                          <td className="py-4 capitalize">{c.status}</td>
                          <td className="py-4">{c.price} F</td>
                        <td className="py-4 space-x-2">
                          {c.status === "validée" && c.downloadUrl && c.paymentStatus === "paid" ? (
                            <a href={c.downloadUrl} className="px-3 py-1 bg-green-500 text-white rounded-full text-sm" target="_blank">Télécharger</a>
                          ) : c.status === "validée" && c.paymentStatus !== "paid" ? (
                            <button
                              onClick={() => setPaymentCommand(c)}
                              className="px-3 py-1 bg-digipurple text-white rounded-full text-sm"
                            >
                              Payer pour télécharger
                            </button>
                          ) : (
                            <span className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm">Paiement requis</span>
                          )}
                        </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Messages de l'admin */}
              <section className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-medium mb-4">Messages de l'admin</h3>
                <div className="space-y-4">
                  {commands.filter(c => c.status === "validée" && c.adminMessage).length > 0 ? (
                    commands.filter(c => c.status === "validée" && c.adminMessage).map((c) => (
                      <div key={c.id} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm text-gray-700"><strong>Commande :</strong> {c.productName}</p>
                        <p className="text-sm text-gray-700"><strong>Message :</strong> {c.adminMessage}</p>
                        <p className="text-xs text-gray-500 mt-2">Validée le {c.date}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Aucun message de l'admin pour le moment.</p>
                  )}
                </div>
              </section>
            </>
          )}

          {currentView === 'commands' && (
            <section className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Mes commandes</h3>
                <button className="px-4 py-2 bg-digipurple text-white rounded-md" onClick={() => setShowCreateForm(true)}>Nouvelle commande</button>
              </div>
              {showCreateForm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">{editingCommand ? "Modifier la commande" : "Créer une nouvelle commande"}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={newCommand.productId}
                      onChange={(e) => {
                        const selectedProduct = products.find(p => p.id === e.target.value);
                        setNewCommand({
                          ...newCommand,
                          productId: e.target.value,
                          productName: selectedProduct?.name || "",
                          price: selectedProduct?.price || 0
                        });
                      }}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Sélectionner un produit</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>{p.name} - {p.price} F</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={newCommand.date}
                      onChange={(e) => setNewCommand({ ...newCommand, date: e.target.value })}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
                      onClick={editingCommand ? handleUpdateCommand : handleCreateCommand}
                    >
                      {editingCommand ? "Modifier" : "Créer"}
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-500 text-white rounded-md"
                      onClick={() => {
                        setShowCreateForm(false);
                        setEditingCommand(null);
                        setNewCommand({ productId: "", productName: "", price: 0, clientId: "", date: new Date().toISOString().split('T')[0], status: "en attente" });
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="text-sm text-gray-500 border-b">
                      <th className="py-3">Nom du service</th>
                      <th className="py-3">Date</th>
                      <th className="py-3">Statut</th>
                      <th className="py-3">Prix</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {commands.map((c) => (
                      <tr key={c.id} className="border-b hover:bg-gray-50">
                        <td className="py-4">{c.productName}</td>
                        <td className="py-4">{c.date}</td>
                        <td className="py-4 capitalize">{c.status}</td>
                        <td className="py-4">{c.price} F</td>
                        <td className="py-4 space-x-2">
                          <button className="px-3 py-1 border rounded-full text-sm" onClick={() => handleEditCommand(c)}>Modifier</button>
                          <button className="px-3 py-1 bg-red-500 text-white rounded-full text-sm" onClick={() => handleDeleteCommand(c.id!)}>Supprimer</button>
                          {c.status === "validée" && c.downloadUrl && c.paymentStatus === "paid" ? (
                            <a href={c.downloadUrl} className="px-3 py-1 bg-green-500 text-white rounded-full text-sm" target="_blank">Télécharger</a>
                          ) : c.status === "validée" && c.paymentStatus !== "paid" ? (
                            <button
                              onClick={() => setPaymentCommand(c)}
                              className="px-3 py-1 bg-purple-400 text-white rounded-full text-sm"
                            >
                              Payer pour télécharger
                            </button>
                          ) : (
                            <span className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm">Paiement requis</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {currentView === 'history' && (
            <section className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-medium mb-4">Historique des commandes</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="text-sm text-gray-500 border-b">
                      <th className="py-3">Nom du service</th>
                      <th className="py-3">Date</th>
                      <th className="py-3">Statut</th>
                      <th className="py-3">Prix</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {commands.filter(c => c.status === "validée").map((c) => (
                      <tr key={c.id} className="border-b hover:bg-gray-50">
                        <td className="py-4">{c.productName}</td>
                        <td className="py-4">{c.date}</td>
                        <td className="py-4 capitalize">{c.status}</td>
                        <td className="py-4">{c.price} F</td>
                        <td className="py-4 space-x-2">
                          {c.status === "validée" && c.downloadUrl && c.paymentStatus === "paid" ? (
                            <a href={c.downloadUrl} className="px-3 py-1 bg-green-500 text-white rounded-full text-sm" target="_blank">Télécharger</a>
                          ) : c.status === "validée" && c.paymentStatus !== "paid" ? (
                            <button
                              onClick={() => setPaymentCommand(c)}
                              className="px-3 py-1 bg-digipurple text-white rounded-full text-sm"
                            >
                              Payer pour télécharger
                            </button>
                          ) : (
                            <span className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-sm">Télécharger</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {currentView === 'payments' && (
            <section className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-medium mb-4">Paiements</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="text-sm text-gray-500 border-b">
                      <th className="py-3">Nom du service</th>
                      <th className="py-3">Date</th>
                      <th className="py-3">Statut</th>
                      <th className="py-3">Prix</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {commands.filter(c => c.status === "en attente").map((c) => (
                      <tr key={c.id} className="border-b hover:bg-gray-50">
                        <td className="py-4">{c.productName}</td>
                        <td className="py-4">{c.date}</td>
                        <td className="py-4 capitalize">{c.status}</td>
                        <td className="py-4">{c.price} F</td>
                        <td className="py-4 space-x-2">
                          <button
                            onClick={() => setPaymentCommand(c)}
                            className="px-3 py-1 bg-purple-400 text-white rounded-full text-sm"
                          >
                            Payer
                          </button>
                          <button className="px-3 py-1 border rounded-full text-sm">Voir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Modal de paiement */}
          {paymentCommand && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h4 className="font-semibold mb-4">Choisir une méthode de paiement</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Service: {paymentCommand.productName}<br />
                  Montant: {paymentCommand.price} F
                </p>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Méthode de paiement</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="wave"
                          checked={paymentMethod === 'wave'}
                          onChange={(e) => setPaymentMethod(e.target.value as 'wave' | 'orange')}
                          className="mr-2"
                        />
                        Wave
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="orange"
                          checked={paymentMethod === 'orange'}
                          onChange={(e) => setPaymentMethod(e.target.value as 'wave' | 'orange')}
                          className="mr-2"
                        />
                        Orange Money
                      </label>
                    </div>
                  </div>
                </div>

                {(paymentMethod === 'wave' || paymentMethod === 'orange') && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                      <input type="tel" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="78 900 00 90" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                  </div>
                )}




                <div className="mt-6 flex gap-2">
                  <button
                    onClick={async () => {
                      try {
                        const updateData: Partial<CommandForClient> = { paymentStatus: "paid", paymentMethod };
                        if (paymentMethod === 'wave' || paymentMethod === 'orange') {
                          updateData.phoneNumber = phoneNumber;
                        }
                        await updateCommandForClient(paymentCommand.id!, updateData);
                        Swal.fire("Succès", "Paiement soumis avec succès !", "success");
                        setPaymentCommand(null);
                        setPaymentMethod('wave'); // Reset to default
                        setPhoneNumber('');
                        // Refresh commands
                        const updatedCommands = await getCommandsForClient(clientId);
                        setCommands(updatedCommands);
                      } catch (err) {
                        console.error(err);
                        Swal.fire("Erreur", "Impossible de soumettre le paiement", "error");
                      }
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Soumettre le paiement
                  </button>
                  <button
                    onClick={() => {
                      setPaymentCommand(null);
                      setPaymentMethod('wave'); // Reset to default
                      setPhoneNumber('');
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentView === 'notifications' && (
            <section className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-medium mb-4">Messages de l'admin</h3>
              <div className="space-y-4">
                {commands.filter(c => c.status === "validée" && c.adminMessage).length > 0 ? (
                  commands.filter(c => c.status === "validée" && c.adminMessage).map((c) => (
                    <div key={c.id} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm text-gray-700"><strong>Commande :</strong> {c.productName}</p>
                      <p className="text-sm text-gray-700"><strong>Message :</strong> {c.adminMessage}</p>
                      <p className="text-xs text-gray-500 mt-2">Validée le {c.date}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Aucun message de l'admin pour le moment.</p>
                )}
              </div>
            </section>
          )}

          {currentView === 'settings' && (
            <section className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-medium mb-4">Paramètres</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input type="text" value={user.name} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" value={user.email} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" readOnly />
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Modifier le mot de passe</button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;

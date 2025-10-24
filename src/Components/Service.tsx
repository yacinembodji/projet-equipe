

type ServicesProps = {
  onRetour: () => void;
};

export default function Services({ onRetour }: ServicesProps) {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Nos services</h1>
      <p>Liste des services...</p>

      <button onClick={onRetour} className="mt-6 text-blue-500 underline">
        Retour à l'accueil
      </button>
    </div>
  );
}

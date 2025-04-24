export type Category = {
  "@id": string;
  "@type": "Categorie";
  id: number;
  label: string;
  hotels: Array<Hotel>;
};

export type Hotel = {
  // Définir la structure d'un objet Hotel si nécessaire
  id: number;
  name: string;
  // Ajoute d'autres propriétés pertinentes pour un hôtel
};

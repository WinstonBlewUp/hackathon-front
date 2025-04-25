export type SeoMetadata = {
    title: string;
    description: string;
    keywords?: string[];
  };
  
  export const seoData: Record<string, SeoMetadata> = {
    home: {
      title: "MatchRoom | Trouvez et négociez des chambres d'hôtel premium à prix exclusifs",
      description: "Réservez des chambres d'hôtel premium à prix négociés sur MatchRoom. Découvrez nos offres last minute et nos sélections personnalisées. Économisez jusqu'à 50% sur votre prochain séjour.",
      keywords: [
        "réservation hôtel à prix négocié",
        "chambres d'hôtel premium réduction",
        "hôtels 3-5 étoiles meilleur prix",
        "offres last minute hôtel",
        "chambre hôtel négociation directe",
        "réservation hôtel économie",
        "meilleures offres hôtels boutiques"
      ],
    },
    register: {
      title: "Inscription Voyageur | Rejoignez MatchRoom en moins de 10 minutes",
      description: "Créez votre compte MatchRoom en quelques secondes et accédez immédiatement à des offres d'hôtels négociables. Connexion rapide via Google disponible. Commencez à économiser dès maintenant !",
    },
    quiz: {
      title: "Quiz MatchRoom | Trouvez l'hôtel parfait selon vos préférences",
      description: "Notre quiz vous aide à trouver la chambre d'hôtel idéale selon vos critères. MatchRoom vous connecte aux établissements qui correspondent parfaitement à vos attentes et à votre budget.",
      keywords: [
        "trouver hôtel selon préférences",
        "quiz choix hôtel personnalisé",
        "chambre match préférences voyageur",
        "recherche personnalisée hôtel",
        "trouver hôtel idéal quiz",
        "hôtel correspondant à mes critères",
        "sélection hôtel sur mesure"
      ],
    },
    categories: {
      title: "Catégories d'hôtels | Découvrez notre sélection premium sur MatchRoom",
      description: "Explorez nos catégories d'hôtels soigneusement sélectionnés. Swipez, likez et négociez directement avec les établissements pour obtenir votre tarif personnalisé sur MatchRoom.",
      keywords: [
        "catégories hôtels premium",
        "sélection hôtels boutiques",
        "hôtels indépendants par catégorie",
        "découvrir hôtels de charme",
        "sélection établissements de luxe",
        "hôtels classés par catégorie",
        "types d'hébergement premium"
      ],
    },
    favorites: {
      title: "Mes Favoris | Gérez et négociez vos chambres d'hôtel préférées",
      description: "Retrouvez toutes vos chambres d'hôtel favorites et lancez une négociation directe avec l'établissement. Obtenez des réductions exclusives sur vos hôtels préférés avec MatchRoom.",
      keywords: [
        "chambres d'hôtel favorites",
        "hôtels enregistrés négociation",
        "favoris hôtels réduction",
        "négocier chambre hôtel préférée",
        "liste hôtels favoris",
        "réduction chambres sauvegardées",
        "gérer favoris hôtels"
      ],
    },
    filters: {
      title: "Filtres de recherche | Trouvez votre hôtel idéal sur MatchRoom",
      description: "Affinez votre recherche d'hôtel par type d'établissement, capacité ou nombre d'étoiles. Filtrez selon vos critères et négociez directement le meilleur prix avec MatchRoom.",
      keywords: [
        "filtrer recherche hôtel",
        "hôtel par nombre d'étoiles",
        "recherche par type d'établissement",
        "filtrer hôtels par capacité",
        "recherche avancée hôtel",
        "tri hôtels premium",
        "affiner recherche chambre hôtel"
      ],
    },
    roomDetail: {
      title: "[Nom de l'hôtel] | Chambre [Type] à [Ville] - Prix négociable",
      description: "Découvrez cette [type de chambre] à [nom de l'hôtel]: photos, description complète et localisation. Négociez directement avec l'hôtel pour un tarif personnalisé sur MatchRoom.",
      keywords: [
        "[nom hôtel] chambre [ville]",
        "réserver [type chambre] [nom hôtel]",
        "prix négociable chambre hôtel",
        "détails chambre [catégorie étoiles]",
        "réservation hôtel directe remise",
        "chambre hôtel localisation [quartier/ville]",
        "négocier prix chambre [type]"
      ],
    },
    roomAll: {
      title: "[Nom de l'hôtel] à [Ville] | Découvrez toutes les chambres disponibles",
      description: "Explorez toutes les chambres de [nom de l'hôtel], comparez avec des options similaires dans [ville/quartier] et réservez au meilleur prix après négociation directe sur MatchRoom.",
      keywords: [
        "chambres disponibles [nom hôtel]",
        "hôtel [ville] toutes options",
        "comparer chambres similaires [quartier]",
        "meilleures chambres [nom hôtel]",
        "options hébergement [ville/région]",
        "alternatives chambres même hôtel",
        "prix négociés [nom hôtel]"
      ],
    },
    lastMinute: {
      title: "Offres Last Minute | Chambres d'hôtel à prix négociés pour aujourd'hui et demain",
      description: "Profitez de nos offres de dernière minute à prix négociés ! Découvrez des chambres d'hôtel disponibles immédiatement avec des réductions exclusives jusqu'à 50%.",
      keywords: [
        "chambre hôtel last minute",
        "réservation dernière minute remise",
        "hôtel disponible aujourd'hui",
        "offre flash hôtel premium",
        "chambre immédiatement disponible",
        "promotion hôtel dernière minute",
        "réduction réservation urgente hôtel"
      ],
    },
    profile: {
      title: "Mon profil MatchRoom | Gérez vos réservations et préférences",
      description: "Gérez votre profil MatchRoom, consultez vos réservations passées et obtenez des badges exclusifs. Personnalisez votre expérience pour des offres d'hôtels toujours mieux ciblées.",
      keywords: [
        "gérer profil réservation hôtel",
        "historique réservations hôtels",
        "préférences voyageur hôtellerie",
        "badges fidélité réservation",
        "compte utilisateur MatchRoom",
        "paramètres personnels voyageur",
        "statistiques réservations personnelles"
      ],
    },
    dashboardHotel: {
      title: "Dashboard Hôtelier MatchRoom | Gérez vos offres et maximisez votre rentabilité",
      description: "Accédez à votre tableau de bord hôtelier, gérez vos demandes de négociation et suivez les performances de vos chambres. Optimisez votre stratégie tarifaire avec MatchRoom.",
      keywords: [
        "tableau de bord hôtelier",
        "gestion demandes négociation hôtel",
        "statistiques occupation chambres",
        "rentabilité hôtel optimisation",
        "gestion offres hôtelières",
        "performance hôtel analyse",
        "outil gestion établissement hôtelier"
      ],
    },
    negotiation: {
      title: "Négociation | Proposez votre prix pour cette chambre d'hôtel",
      description: "Faites une offre pour cette chambre d'hôtel et négociez directement avec l'établissement. Économisez jusqu'à 50% sur votre réservation grâce au système unique de MatchRoom.",
      keywords: [
        "négocier prix chambre hôtel",
        "faire offre réservation hôtel",
        "proposition tarif chambre",
        "réduction négociée hôtel",
        "économie réservation hôtel",
        "offre personnalisée hébergement",
        "remise chambre négociation directe"
      ],
    },
    booking: {
      title: "Réservation | Confirmez votre séjour à prix négocié chez [Nom de l'hôtel]",
      description: "Finalisez votre réservation au tarif négocié pour [nom de l'hôtel]. Récapitulatif complet de votre séjour et paiement sécurisé. Confirmation immédiate garantie.",
      keywords: [
        "confirmer réservation hôtel",
        "réservation prix négocié",
        "paiement sécurisé chambre hôtel",
        "récapitulatif séjour hôtel",
        "finaliser réservation remise",
        "réserver chambre tarif négocié",
        "confirmation réservation immédiate"
      ],
    },
  };
  
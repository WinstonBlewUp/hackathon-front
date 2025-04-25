export type CategoryData = {
  "@id": string;
  "@type": "Categorie";
  id: number;
  label: string;
  hotels: Array<HotelData>;
};

export type HotelData = {
  id: number;
  name: string;
};
export type RoomData = {
  roomId: number;
  roomName: string;
  roomDescription: string;
  roomBasePrice: number;
  roomMaxGuests: number;
  roomUsers: string[];
  hotelId: number;
  hotelName: string;
};

export type QuizRequestData = {
  startDate: Date | null;
  endDate: Date | null;
  maxGuests: number;
  criteriaHotel: {
    children: boolean;
    animal: boolean;
    typeCity: string | null;
    transport: string[]; // liste de moyens de transport (ex: ["train", "voiture"])
    restoration: "RESTAURANT" | "PENSION" | "PETIT" | null;
    wellness: string[]; // (ex: ["spa", "sauna"])
    business: string[]; // (ex: ["wifi", "bureau"])
    comfort: string[]; // (ex: ["tv", "clim"])
    addServices: string[]; // (ex: ["parking", "navette"])
    pmr: boolean;
    baby: boolean;
    category: string | null; // id ou nom de catégorie
  };
};

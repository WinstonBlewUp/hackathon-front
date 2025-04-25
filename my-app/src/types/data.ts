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

// export enum NegotiationStatus {
//   PENDING_HOTELIER = "pendingHotelier",
//   PENDING_CLIENT = "pendingClient",
//   ACCEPTED_HOTELIER = "acceptedHotelier",
//   REFUSED_HOTELIER = "refusedHotelier",
//   REFUSED_CLIENT = "refusedClient",
//   REFUSED_NO_DISP = "refusedNoDisp",
// }
export type NegotiationData = {
  id: number;
  requestedPrice: number;
  status: string; // tu peux ajuster selon tes enums réels
  createdAt: string; // ISO 8601 date string
  responseAt: string; // ISO 8601 date string
  challengePrice: number | null;
  isClose: boolean;
  user: string; // URI type, e.g., "/api/users/2"
  room: RoomData; // URI type, e.g., "/api/rooms/96"
};

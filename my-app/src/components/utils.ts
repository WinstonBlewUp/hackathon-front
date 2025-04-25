import { DateValue } from "@mantine/dates";

// Formater le temps restant en heures:minutes:secondes
export const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Calculer la durée du séjour en jours
export const calculateDuration = ({
  checkInDate,
  checkOutDate,
}: {
  checkInDate: Date;
  checkOutDate: Date;
}) => {
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Formater la date en format lisible
export const formatDate = (date: Date) => {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
export const toIso = (date: DateValue) => {
  return date ? date.toISOString().split(".")[0] : null;
};

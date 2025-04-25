import { getTotalNights } from "@/lib/axios";
import { Text } from "@mantine/core";
import { useEffect, useState } from "react";

export const NumberNight = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getTotalNights(2);
                if (response.success) {
                    setData(response.data);
                } else {
                    setError(response.error ?? "Error");
                }
            } catch (err) {
                setError("Erreur de connexion");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);
    if (error) {
        return <Text c="red">Erreur: {error}</Text>;
    }
    if (loading || data === undefined) {
        return <Text>Chargement...</Text>;
    }
    return <Text fw="bold" fz="h1" ta="center">{data} </Text>
}
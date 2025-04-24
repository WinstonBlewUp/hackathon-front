"use client"
import { getRoomRecommandation } from "@/lib/axios";
import { RoomData } from "@/types/category";
import { Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CurrentlyAvailable } from "../currentlyAvailable/CurrentlyAvailable";

export const Recommendation = () => {
    const { data: session } = useSession();

    const [data, setData] = useState<RoomData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (!session?.user) return
        const fetchCategories = async () => {
            try {
                const response = await getRoomRecommandation(session?.user.id);
                if (response.success) {
                    console.log(response.data)
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
    }, [session?.user]);
    if (error) {
        return <Text c="red">Erreur: {error}</Text>;
    }
    if (loading) {
        return <Text>Chargement...</Text>;
    }
    if (!data || !data.length) return <Text>Pas de reco</Text>
    return (
        <CurrentlyAvailable rooms={data.slice(0, 5)} />
    )
}
"use client"
import { SimpleGrid, Text } from "@mantine/core";
import { CardRoomComponent } from "@/components/CardRoomComponent";
import { useEffect, useState } from "react";
import { getRoomLike } from "@/lib/axios";
import { RoomData } from "@/types/category";
export const AllLike = () => {
    const [data, setData] = useState<RoomData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getRoomLike(2);
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
    }, []);
    if (error) {
        return <Text c="red">Erreur: {error}</Text>;
    }
    if (loading || !data.length) {
        return <Text>Chargement...</Text>;
    }
    return (
        <>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
                {data.slice(0, 5).map((room, index) =>
                    <CardRoomComponent key={index}  {...room} isLike />
                )}
            </SimpleGrid>

        </>
    );
}

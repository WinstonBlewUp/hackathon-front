"use client"
import { SimpleGrid, Text } from "@mantine/core";
import { CardRoomComponent } from "@/components/CardRoomComponent";
import { useEffect, useState } from "react";
import { getRoomLike } from "@/lib/axios";
import { RoomData } from "@/types/data";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export const AllLike = () => {
    const { data: session } = useSession();

    const [data, setData] = useState<RoomData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (!session?.user) redirect("/login")
        const fetchCategories = async () => {
            try {
                const response = await getRoomLike(session?.user.id);
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
    if (loading) {
        return <Text>Chargement...</Text>;
    }
    if (!data.length) return <Text>Pas de chambre like</Text >
    return (
        <>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
                {data.slice(0, 5).map((room, index) =>
                    <CardRoomComponent key={index}  {...room} h={400} />
                )}
            </SimpleGrid>

        </>
    );
}

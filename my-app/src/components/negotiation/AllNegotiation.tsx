"use client"
import { Box, Stack, Text, Title } from "@mantine/core";
import { CardNegotiation } from "./CardNegotiation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getOpenNegotiations } from "@/lib/axios";
import { NegotiationData } from "@/types/data";

export const AllNegotiation = () => {
    const { data: session } = useSession();
    const [data, setData] = useState<NegotiationData[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (!session?.user) return
        const fetchCategories = async () => {
            try {
                const response = await getOpenNegotiations(session.user.id);
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
    if (loading || !data?.length) {
        return <Text>Chargement...</Text>;
    }
    return (
        <Stack gap="xl">
            {data.slice(0, 5).map((negotiation, index) =>
                <CardNegotiation  {...negotiation} key={index} />
            )}
        </Stack>)
}
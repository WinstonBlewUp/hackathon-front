import { getUser } from "@/lib/axios";
import { UserData } from "@/types/data";
import { Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";

export const Name = ({ user_id }: { user_id: string }) => {
    const [data, setData] = useState<UserData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getUser(user_id);
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
    if (loading || !data) {
        return <Text>Chargement...</Text>;
    }
    return (<>
        <Title fw="bold" order={1}>{data.name} {data.firstname}</Title>
        <Text c="dimmed">{data.email}</Text>
    </>)
}
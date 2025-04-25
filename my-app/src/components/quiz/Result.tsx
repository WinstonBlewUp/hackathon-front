import { Button, Stack, Text } from "@mantine/core"
import { CardRoomComponent } from "../CardRoomComponent"
import placeholder from "../../assets/image.png"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { QuizRequestData, RoomData } from "@/types/data";
import { postQuiz } from "@/lib/axios";
export const Result = ({ request }: { request: QuizRequestData }) => {
    const { data: session } = useSession();
    const [data, setData] = useState<RoomData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (!session?.user) return
        const fetchCategories = async () => {
            try {
                const response = await postQuiz(request);
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
    return (
        <Stack>
            <Text tt="uppercase" ta="center" size="xl" fw="bold">C'est un Match !</Text>
            <CardRoomComponent info={{ price: 100, name: "Novotel" }} picture={placeholder.src} h="65vh" />
            <Button>Voir la chambre</Button>
            <Button variant="outline">Regénérer</Button>
        </Stack>
    )
}
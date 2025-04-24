import { Box, Center, SimpleGrid, Text, Title } from "@mantine/core";
import { getCategories } from "@/lib/axios";
import { Category } from "@/types/category";
import { useEffect, useState } from "react";
export const CategoriesLayout = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                if (response.success) {
                    setCategories(response.data);
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
    if (loading || !categories.length) {
        return <Text>Chargement...</Text>;
    }
    return (
        <Box>
            <Title order={2} mb="md">Trouver votre voyage idéal</Title>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
                {categories.map((category, key) =>
                    <Center
                        key={key}
                        w="100%"
                        sx={{
                            borderRadius: "var(--mantine-radius-md)",
                            border: `1px solid var(--mantine-color-gray-3)`
                        }}
                        py="lg"
                    >
                        <Text tt="capitalize">{category.label}</Text>
                    </Center>
                )}
            </SimpleGrid>
        </Box>
    )
}
"use client"
import { getCategories } from "@/lib/axios";
import { CategoryData, QuizRequestData } from "@/types/data";
import { Chip, Group, Text } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const CategoriesQuizComponent = ({ data: dataQuiz, setData: setDataQuiz }: { setData: Dispatch<SetStateAction<QuizRequestData>>, data: QuizRequestData }) => {
    const [data, setData] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
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
    if (loading || !data.length) {
        return <Text>Chargement...</Text>;
    }
    const handleChange = (value: string) => {
        setDataQuiz((prev) => ({
            ...prev!,
            criteriaHotel: {
                ...prev?.criteriaHotel,
                category: value,
            },
        }));
    };
    return (
        <Chip.Group
            value={String(dataQuiz.criteriaHotel.category) ?? null}
            onChange={(value) => handleChange(value as string)
            }>
            <Group>
                {data.map((category, key) =>
                    <Chip value={String(category.id)} key={key}>{category.label}</Chip>
                )}
            </Group>
        </Chip.Group>)
}
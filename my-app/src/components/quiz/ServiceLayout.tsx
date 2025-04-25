"use client"

import { QuizRequestData } from "@/types/data";
import { Accordion, Box, Chip, Group, Stack, Text, Title } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { hotelAmenities } from "./data";

export const ServiceLayout = ({
    data,
    setData,
}: {
    setData: Dispatch<SetStateAction<QuizRequestData>>;
    data: QuizRequestData;
}) => {
    const handleChange = (key: keyof QuizRequestData["criteriaHotel"], values: string[]) => {
        setData((prev) => ({
            ...prev!,
            criteriaHotel: {
                ...prev?.criteriaHotel,
                [key]: values,
            },
        }));
    };

    const handleBooleanChange = (key: "pmr" | "baby", checked: boolean) => {
        setData((prev) => ({
            ...prev!,
            criteriaHotel: {
                ...prev?.criteriaHotel,
                [key]: checked,
            },
        }));
    };


    return (
        <Stack gap="xl">
            <Box>
                <Text>Quel type de restauration recherchez-vous ?</Text>
                <Chip.Group
                    value={data.criteriaHotel?.restoration}
                    onChange={(val) => handleChange("restoration", val as string[])}
                >
                    <Group>
                        <Chip value="RESTAURANT">Restaurant gastronomique</Chip>
                        <Chip value="PENSION">Pension complète</Chip>
                        <Chip value="PETIT">Petit déjeuner</Chip>
                    </Group>
                </Chip.Group>
            </Box>

            <Box>
                <Text>Quelles installations considérez-vous comme essentielles ?</Text>
                <Accordion>
                    {hotelAmenities.map((amenitie, index) => (
                        <Accordion.Item value={amenitie.label} key={index}>
                            <Accordion.Control>{amenitie.label}</Accordion.Control>
                            <Accordion.Panel>
                                <Chip.Group
                                    multiple
                                    value={Array.isArray(data?.criteriaHotel?.[amenitie.key as keyof QuizRequestData["criteriaHotel"]])
                                        ? data.criteriaHotel[amenitie.key as keyof QuizRequestData["criteriaHotel"]] as string[]
                                        : []}
                                    onChange={(val) =>
                                        handleChange(amenitie.key as keyof QuizRequestData["criteriaHotel"], val)
                                    }
                                >
                                    <Group>
                                        {amenitie.items.map((item, idx) => (
                                            <Chip value={item} key={idx}>
                                                {item}
                                            </Chip>
                                        ))}
                                    </Group>
                                </Chip.Group>
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Box>

            <Box>
                <Title order={2} size="md" mb="md">
                    Besoin d'équipements particuliers ?
                </Title>
                <Chip.Group multiple>
                    <Group>
                        <Chip
                            value="pmr"
                            checked={data?.criteriaHotel?.pmr}
                            onChange={(checked) => handleBooleanChange("pmr", checked)}
                        >
                            Accessibilité PMR
                        </Chip>
                        <Chip
                            value="baby"
                            checked={data?.criteriaHotel?.baby}
                            onChange={(checked) => handleBooleanChange("baby", checked)}
                        >
                            Lit bébé
                        </Chip>
                    </Group>
                </Chip.Group>
            </Box>
        </Stack>
    );
};

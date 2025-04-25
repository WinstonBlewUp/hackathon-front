"use client";
import { Box, Card, Flex, Group, Stack, Text, Title } from "@mantine/core"

import { IconCalendar, } from "@tabler/icons-react";
import { calculateDuration, formatDate } from "../../utils";
import { NegotiationData } from "@/types/data";
import { CardRoomComponent } from "@/components/CardRoomComponent";

export const CardReservation = ({ room, status, createdAt, responseAt, challengePrice }: NegotiationData) => {
    // Dates de réservation fixes
    const checkInDate = new Date(2025, 4, 18); // 15 mai 2025
    const checkOutDate = new Date(2025, 4, 18); // 18 mai 2025 




    return (
        <Card shadow="md" p="sm" w="100%"
            radius="md"
            h={{ base: "fit-content", lg: "100%" }}
            sx={(theme) => ({
                [`@media (min-width: ${theme.breakpoints.lg})`]: {
                    flexDirection: 'row',
                    alignItems: "stretch"
                },
                flexDirection: 'column',
                gap: 'var(--mantine-spacing-md)'
            })}
        >
            <CardRoomComponent {...room}
                h={{ base: 200, lg: "auto" }}
                w={{ base: "100%", lg: 400 }}
                style={{ flexShrink: 0 }}

            />
            <Stack gap="sm" w="100%">
                <Box>
                    <Title order={2} fw={700} size="xl">{room.roomName} </Title>
                    <Text size="sm" c="dimmed">
                        {room.roomDescription}
                    </Text>
                </Box>

                {/* Affichage des dates de réservation */}
                <Box bg="gray.1" p="xs" sx={{ borderRadius: "var(--mantinue-radius-sm)" }} >
                    <Group gap="xs" mb="xs">
                        <IconCalendar size={16} />
                        <Text size="sm" fw={500}>Dates de séjour</Text>
                    </Group>
                    <Group>
                        <Box>
                            <Text size="xs" c="dimmed">Arrivée</Text>
                            <Text size="sm">{formatDate(checkInDate)}</Text>
                        </Box>
                        <Box>
                            <Text size="xs" c="dimmed">Départ</Text>
                            <Text size="sm">{formatDate(checkOutDate)}</Text>
                        </Box>
                        <Box>
                            <Text size="xs" c="dimmed">Durée</Text>
                            <Text size="sm">{calculateDuration({ checkInDate, checkOutDate })} nuits</Text>
                        </Box>
                    </Group>
                </Box>

                <Flex justify="space-between" align="center" mt="xs">
                    <Text fw={700} size="lg">
                        {room.roomBasePrice}€ <Text component="span" size="sm" fw={400} c="dimmed">/ nuit</Text>
                    </Text>
                </Flex>
            </Stack>
        </Card >
    )
}
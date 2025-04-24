"use client";
import { Alert, Box, Button, Card, CardSection, Flex, Grid, GridCol, Group, Loader, Progress, Stack, Text, Title } from "@mantine/core"
import { CardRoomComponent, CardRoomComponentProps } from "../CardRoomComponent"
import placeholder from "../../assets/image.png"
import { useEffect, useState } from "react";
import { IconAlertCircle, IconBuildingSkyscraper, IconCalendar, IconClock, IconThumbDown, IconX } from "@tabler/icons-react";
import { calculateDuration, formatDate, formatTime } from "./utils";

const STATUS = {
    AVAILABLE: "available",
    PENDING: "pending",
    REJECTED_NOT_AVAILABLE: "rejected_not_available",
    REJECTED_BY_HOTEL: "rejected_by_hotel"
};

export const CardNegotiation = ({ picture, isLike, info, description }: CardRoomComponentProps & { description: string }) => {

    const [status, setStatus] = useState(STATUS.AVAILABLE);

    // Temps restant pour l'offre en secondes 
    const totalTime = 10800
    const [timeLeft, setTimeLeft] = useState(totalTime);

    // Dates de réservation fixes
    const checkInDate = new Date(2025, 4, 15); // 15 mai 2025
    const checkOutDate = new Date(2025, 4, 18); // 18 mai 2025

    // Simulation du changement d'état pour la démo
    const handleReservation = () => {
        setStatus(STATUS.PENDING);
        // Pour la démo, on simule une réponse après 3 secondes
        setTimeout(() => {
            // Ici on pourrait ajouter un choix aléatoire entre les deux types de rejet
            // ou basé sur d'autres conditions
            setStatus(STATUS.REJECTED_NOT_AVAILABLE);
            // Pour tester l'autre type de rejet, décommenter la ligne suivante et commenter celle au-dessus
            // setStatus(STATUS.REJECTED_BY_HOTEL);
        }, 3000);
    };

    // Décliner l'offre
    const handleDecline = () => {
        alert("Offre déclinée. Vous serez redirigé vers d'autres options.");
    };

    // Comptes à rebours
    useEffect(() => {
        if ((status === STATUS.AVAILABLE || status === STATUS.PENDING) && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft, status]);

    // Calcul du pourcentage de temps écoulé pour la barre de progression
    const calculateResponseProgress = () => {
        const elapsedTime = totalTime - timeLeft;
        return 100 - Math.round((elapsedTime / totalTime) * 100);
    };

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
            <CardRoomComponent picture={placeholder.src}
                h={{ base: 200, lg: "auto" }}
                w={{ base: "100%", lg: 400 }}
                style={{ flexShrink: 0 }}

            />
            <Stack gap="sm" w="100%">
                <Box>
                    <Title order={2} fw={700} size="xl">{info?.name}</Title>
                    <Text size="sm" c="dimmed">
                        {description}
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
                        {info?.price}€ <Text component="span" size="sm" fw={400} c="dimmed">/ nuit</Text>
                    </Text>

                    {status === STATUS.AVAILABLE && (
                        <Group gap="xs" c="green">
                            <IconClock size={16} />
                            <Text size="sm">Expire dans: {formatTime(timeLeft)}</Text>
                        </Group>
                    )}

                    {status === STATUS.PENDING && (
                        <Group gap="xs" c="blue">
                            <Loader size="xs" />
                            <Text size="sm">Réponse dans: {formatTime(timeLeft)}</Text>

                        </Group>
                    )}

                    {(status === STATUS.REJECTED_NOT_AVAILABLE || status === STATUS.REJECTED_BY_HOTEL) && (
                        <Group gap="xs" c="red">
                            <IconX size={16} />
                            <Text size="sm">Indisponible</Text>
                        </Group>
                    )}
                </Flex>

                {/* État AVAILABLE */}
                {status === STATUS.AVAILABLE && (
                    <Stack gap="xs">
                        <Button
                            leftSection={<IconCalendar size={18} />}
                            fullWidth
                            onClick={handleReservation}
                        >
                            Réserver maintenant
                        </Button>
                        <Button
                            variant="subtle"
                            color="gray"
                            leftSection={<IconThumbDown size={18} />}
                            onClick={handleDecline}
                        >
                            Décliner cette offre
                        </Button>
                    </Stack>
                )}

                {/* État PENDING avec décompte */}
                {status === STATUS.PENDING && (
                    <Button
                        disabled
                        fullWidth
                    >
                        En cours de traitement...
                    </Button>
                )}

                {/* État REJECTED_NOT_AVAILABLE */}
                {status === STATUS.REJECTED_NOT_AVAILABLE && (
                    <Stack gap="xs">
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            title="Chambre non disponible"
                            color="red"
                            variant="light"
                        >
                            Désolé, cette chambre n'est plus disponible aux dates sélectionnées.
                        </Alert>
                    </Stack>
                )}

                {/* État REJECTED_BY_HOTEL */}
                {status === STATUS.REJECTED_BY_HOTEL && (
                    <Stack gap="xs">
                        <Alert
                            icon={<IconBuildingSkyscraper size={16} />}
                            title="Offre refusée par l'hôtelier"
                            color="orange"
                            variant="light"
                        >
                            L'hôtelier n'a pas pu accepter votre réservation pour cette période.
                            Nous vous recommandons d'essayer d'autres dates ou un autre hôtel.
                        </Alert>

                    </Stack>
                )}
                {(status === STATUS.PENDING || status === STATUS.AVAILABLE) && (
                    <Box>
                        <Progress
                            value={calculateResponseProgress()}
                            color={status === STATUS.PENDING ? "blue" : "green"}
                            h={10}
                            striped
                        />
                    </Box>
                )}
            </Stack>
        </Card >
    )
}
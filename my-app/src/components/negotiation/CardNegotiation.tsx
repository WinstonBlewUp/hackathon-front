"use client";
import { Alert, Box, Button, Card, Center, Flex, Group, Loader, Paper, Progress, Stack, Text, Title } from "@mantine/core"
import { CardRoomComponent } from "../CardRoomComponent"
import { useEffect, useState } from "react";
import { IconAlertCircle, IconBuildingSkyscraper, IconCalendar, IconClock, IconThumbDown, IconX } from "@tabler/icons-react";
import { calculateDuration, formatDate, formatTime } from "../utils";
import { NegotiationData } from "@/types/data";
import { getNegotiationAccept, postNegotiationClientUpdate } from "@/lib/axios";
const STATUS = {
    PENDING_HOTELIER: 'pendingHotelier',
    PENDING_CLIENT: 'pendingClient',
    REFUSED_HOTELIER: 'refusedHotelier',
    REFUSED_CLIENT: 'refusedClient',
    REFUSED_NO_DISP: 'refusedNoDisp',
};
const SECONDS = {
    HOUR: 3600,
    DAY: 86400,
};
export const CardNegotiation = ({ room, negociationId, status, requestedPrice, createdAt, responseAt, challengePrice }: NegotiationData) => {
    console.log(status, room.hotelName, room.roomBasePrice)

    const createdAtDate = new Date(createdAt);
    const responseAtDate = new Date(responseAt);
    const now = new Date();
    // Temps restant pour l'offre en secondes 
    const limitTime = status === STATUS.PENDING_HOTELIER
        ? createdAtDate.getTime() + 3 * SECONDS.HOUR * 1000
        : responseAtDate.getTime() + SECONDS.DAY * 1000;

    const initialTimeLeft = Math.max(0, Math.floor((limitTime - now.getTime()) / 1000));
    const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

    // Dates de réservation fixes
    const checkInDate = new Date(2025, 4, 18); // 15 mai 2025
    const checkOutDate = new Date(2025, 4, 18); // 18 mai 2025

    // Décliner l'offre
    const handleDecline = async () => {
        try {
            await postNegotiationClientUpdate({
                status: STATUS.REFUSED_CLIENT,
                isClose: true,
                negociationId,
            });
            // tu peux déclencher une notif ou autre ici
        } catch (error) {
            console.error("Erreur lors du refus de l'offre :", error);
            // afficher une notification ou un message d'erreur
        }
    };

    const handleClose = async () => {
        try {
            await postNegotiationClientUpdate({
                status,
                isClose: true,
                negociationId,
            })
            // tu peux déclencher une notif ou autre ici
        } catch (error) {
            console.error("Erreur lors du refus de l'offre :", error);
            // afficher une notification ou un message d'erreur
        }

    };


    const handleAccept = async () => {
        try {
            await getNegotiationAccept(String(negociationId))

            // tu peux déclencher une notif ou autre ici
        } catch (error) {
            console.error("Erreur lors du refus de l'offre :", error);
            // afficher une notification ou un message d'erreur
        }

        // REDIRECTION
    };
    // Comptes à rebours
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            (async () => {
                try {
                    await postNegotiationClientUpdate({
                        status: status === STATUS.PENDING_HOTELIER
                            ? STATUS.REFUSED_HOTELIER
                            : STATUS.REFUSED_CLIENT,
                        isClose: status === STATUS.REFUSED_CLIENT,
                        negociationId,
                    });
                } catch (error) {
                    console.error("Erreur lors du changement automatique de statut :", error);
                }
            })();
        }
    }, [timeLeft]);


    const totalTime = status === STATUS.PENDING_HOTELIER ? 3 * SECONDS.HOUR : SECONDS.DAY;


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
                <Group>
                    <Box bg="gray.1" p="xs" sx={{ borderRadius: "var(--mantinue-radius-md)" }} h="100%">
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
                    <Alert bg="blue.0" c="white" radius="sm" p="xs" w={{ base: "100%", lg: "fit-content", }} h="100%">
                        <Text size="xs">Prix soumis</Text>
                        <Text size="xl">{requestedPrice}<Text span> €/nuit</Text> </Text>

                    </Alert>

                </Group>

                <Flex justify="space-between" align="center" mt="xs">
                    <Text fw={700} size="lg">
                        <Text component="span" size="sm" fw={400} c="dimmed">Prix final : </Text>
                        {challengePrice ?? requestedPrice}€
                        <Text component="span" size="sm" fw={400} c="dimmed">/ nuit</Text>
                    </Text>

                    {status === STATUS.PENDING_CLIENT && (
                        <Group gap="xs" c="green">
                            <IconClock size={16} />
                            <Text size="sm">Expire dans: {formatTime(timeLeft)}</Text>
                        </Group>
                    )}

                    {status === STATUS.PENDING_HOTELIER && (
                        <Group gap="xs" c="blue">
                            <Loader size="xs" />
                            <Text size="sm">Réponse dans: {formatTime(timeLeft)}</Text>

                        </Group>
                    )}

                    {(status === STATUS.REFUSED_HOTELIER || status === STATUS.REFUSED_NO_DISP) && (
                        <Group gap="xs" c="red">
                            <IconX size={16} />
                            <Text size="sm">Indisponible</Text>
                        </Group>
                    )}
                </Flex>

                {/* État AVAILABLE */}
                {status === STATUS.PENDING_CLIENT && (
                    <Stack gap="xs">
                        <Button
                            leftSection={<IconCalendar size={18} />}
                            fullWidth
                            onClick={handleAccept}
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
                {status === STATUS.PENDING_HOTELIER && (
                    <Button
                        disabled
                        fullWidth
                    >
                        En cours de traitement...
                    </Button>
                )}

                {/* État REJECTED_NOT_AVAILABLE */}
                {status === STATUS.REFUSED_NO_DISP && (
                    <Stack gap="xs">
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            title="Chambre non disponible"
                            color="red"
                            variant="light"
                        >
                            Désolé, cette chambre n'est plus disponible aux dates sélectionnées.
                            <Button
                                variant="subtle"
                                color="red"
                                leftSection={<IconThumbDown size={18} />}
                                onClick={handleClose}
                            >
                                Fermer l'offre
                            </Button>
                        </Alert>
                    </Stack>
                )}

                {/* État REJECTED_BY_HOTEL */}
                {status === STATUS.REFUSED_HOTELIER && (
                    <Stack gap="xs">
                        <Alert
                            icon={<IconBuildingSkyscraper size={16} />}
                            title="Offre refusée par l'hôtelier"
                            color="orange"
                            variant="light"
                        >
                            L'hôtelier n'a pas pu accepter votre réservation pour cette période.
                            Nous vous recommandons d'essayer d'autres dates ou un autre hôtel.
                            <Button
                                variant="subtle"
                                color="red"
                                leftSection={<IconThumbDown size={18} />}
                                onClick={handleClose}
                            >
                                Fermer l'offre
                            </Button>
                        </Alert>

                    </Stack>
                )}
                {(status === STATUS.PENDING_HOTELIER || status === STATUS.PENDING_CLIENT) && (
                    <Box>
                        <Progress
                            value={calculateResponseProgress()}
                            color={status === STATUS.PENDING_HOTELIER ? "blue" : "green"}
                            h={10}
                            striped
                        />
                    </Box>
                )}
            </Stack>
        </Card >
    )
}
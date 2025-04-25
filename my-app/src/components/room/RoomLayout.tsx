"use client"
import { Carousel, CarouselSlide } from '@mantine/carousel';

import { Box, Button, Center, Flex, Group, Image, NumberInput, Paper, Stack, Text, Title, } from "@mantine/core";
import placeholder from "../../assets/image.png"
import { IconArrowRight, IconCalendar, IconTestPipe } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { PostNegotiationData, RoomData } from '@/types/data';
import { getRoom, postNegotiation } from '@/lib/axios';
import { DatePickerInput } from '@mantine/dates';
import { toIso } from '../utils';

export const RoomLayout = ({ id }: { id: string }) => {
    const { data: session } = useSession();
    const [data, setData] = useState<RoomData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [requestData, setRequestData] = useState<PostNegotiationData>({ user_id: 0, room_id: null, startDate: null, endDate: null, price: 0 })

    const [showNegotiation, setShowNegotiation] = useState(false);
    const [proposedPrice, setProposedPrice] = useState('');
    useEffect(() => {
        if (!session?.user) return
        const fetchCategories = async () => {
            try {
                const response = await getRoom(id);
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

    const handleNegotiate = async () => {
        if (!data || !requestData || requestData.user_id === 0) return;

        try {
            await postNegotiation({
                price: requestData.price,
                room_id: data.roomId,
                user_id: requestData.user_id,
                startDate: requestData.startDate,
                endDate: requestData.endDate
            });

        } catch (error) {
            console.error("Erreur lors du refus de l'offre :", error);
        }
    };
    if (error) {
        return <Text c="red">Erreur: {error}</Text>;
    }
    if (loading) {
        return <Text>Chargement...</Text>;
    }
    return (
        <Box mt="xl">
            <Carousel
                withIndicators
                height={500}
                slideSize={{ base: "100%", md: "33.3333%" }}
                slideGap="md"
                loop
                align="center"
                slidesToScroll={1}
            >
                <CarouselSlide>
                    <Image src={placeholder.src} radius="md" h="100%" />
                </CarouselSlide>
                <CarouselSlide>
                    <Image src={placeholder.src} radius="md" h="100%" />
                </CarouselSlide>
                <CarouselSlide>
                    <Image src={placeholder.src} radius="md" h="100%" />
                </CarouselSlide>
                <CarouselSlide>
                    <Image src={placeholder.src} radius="md" h="100%" />
                </CarouselSlide>
                <CarouselSlide>
                    <Image src={placeholder.src} radius="md" h="100%" />
                </CarouselSlide>
            </Carousel>
            <Paper shadow='md' sx={{ borderTopLeftRadius: 'var(--mantine-radius-xl)', borderTopRightRadius: 'var(--mantine-radius-xl)', position: "relative" }} p="xl" mt={-10} >
                <Flex justify="space-between" align="start" gap="md" >
                    <Group gap={0}>
                        <Title fw="bold" size="xl" order={2}>
                            {data?.roomName} -
                        </Title>
                        <Text>{" "}{data?.hotelName}</Text>
                    </Group>

                    <Text fw="bold" fz="h2" fs="italic">{data?.roomBasePrice}<Text span fs="normal">€/nuit</Text></Text>
                </Flex>
                <Text>{data?.roomDescription}</Text>
                <Flex align="center" gap="xs" mt="md">
                    <Text size="sm" fw={500}>
                        découvrir l'hôtel
                    </Text>
                    <IconArrowRight size={16} />
                </Flex>
                <Box mt="md">
                    <Text fw="bold" fz="lg">Les + de la chambre</Text>
                    <Group p="lg" gap="xl" justify="center">
                        <Stack justify="center" gap={5} mx="md">
                            <IconTestPipe />
                            Test
                        </Stack>
                        <Stack justify="center" gap={5} mx="md">
                            <IconTestPipe />
                            Test
                        </Stack>
                        <Stack justify="center" gap={5} mx="md">
                            <IconTestPipe />
                            Test
                        </Stack>
                        <Stack justify="center" gap={5} mx="md">
                            <IconTestPipe />
                            Test
                        </Stack>
                    </Group>
                </Box>
                <Center mt="lg">
                    {!showNegotiation ? (
                        <Stack gap="sm" w="100%" maw={400}>
                            <DatePickerInput
                                leftSection={<IconCalendar size={18} stroke={1.5} />}
                                type="range"
                                label="Pick dates range"
                                placeholder="Pick dates range"
                                withAsterisk
                                value={[
                                    requestData?.startDate ? new Date(requestData.startDate) : null,
                                    requestData?.endDate ? new Date(requestData.endDate) : null,]}
                                onChange={(value) => setRequestData((prev) => ({
                                    ...prev, startDate: toIso(value[0]), endDate: toIso(value[1])
                                }))}
                                clearable
                            />
                            <NumberInput placeholder="Proposition de prix (€)"
                                value={requestData.price} onChange={(value) => setRequestData((prev) => ({ ...prev, price: Number(value) ?? 0 }))} />
                            <Button size="md" color="dark" onClick={handleNegotiate}>
                                Négocier
                            </Button>
                        </Stack>
                    ) : (
                        <Stack gap="sm" w="100%" maw={400}>
                            <Text fz="sm">
                                L'hôtelier vous répondra sous 3 heures. Attention, si votre offre est acceptée, vous n'aurez que 24h pour confirmer votre commande et réserver définitivement.
                            </Text>
                            <NumberInput
                                hideControls
                                placeholder="Proposition de prix (€)"
                                value={proposedPrice}
                                onChange={(val) => setProposedPrice(val?.toString() || '')}
                            />
                            <Button /* onClick={handleSubmit}  */ component='a' href='/profile/negotiations'>Soumettre ma proposition</Button>
                        </Stack>
                    )}
                </Center>
            </Paper>
        </Box>
    );
}

"use client"
import { Carousel, CarouselSlide } from '@mantine/carousel';

import { Box, Button, Center, Flex, Group, Image, NumberInput, Paper, Stack, Text, Title, } from "@mantine/core";
import placeholder from "../../assets/image.png"
import { IconArrowRight, IconTestPipe } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { RoomData } from '@/types/data';
import { getRoom } from '@/lib/axios';

export const RoomLayout = ({ id }: { id: string }) => {
    const { data: session } = useSession();
    const [data, setData] = useState<RoomData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
    if (error) {
        return <Text c="red">Erreur: {error}</Text>;
    }
    if (loading) {
        return <Text>Chargement...</Text>;
    }
    console.log(data)
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
                        <Button onClick={() => setShowNegotiation(true)}>Faire une proposition !</Button>
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

"use client"
import { Carousel, CarouselSlide } from '@mantine/carousel';

import { Box, Button, Center, Flex, Group, Image, Paper, Stack, Text, Title, } from "@mantine/core";
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
    }, [session?.user]);
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
                            {data?.name} -
                        </Title>
                        <Text>{" "}{data?.hotel}</Text>
                    </Group>

                    <Text fw="bold" fz="h2" fs="italic">{data?.basePrice}<Text span fs="normal">€/nuit</Text></Text>
                </Flex>
                <Text>{data?.description}</Text>
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
                <Center>
                    <Button mx="auto">Faire une proposition !</Button>
                </Center>
            </Paper>
        </Box>
    );
}

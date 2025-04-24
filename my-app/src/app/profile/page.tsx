"use client"
import { Box, Button, Flex, Group, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconArrowRight, IconCalendar, IconHeart, IconHeartHandshake } from "@tabler/icons-react";
// OPEN GDS
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Profile() {
    const { data: session } = useSession();

    return (
        <>
            <Group justify="space-between">
                <Box>
                    <Title fw="bold" order={1}>Nom prénom</Title>
                    <Text c="dimmed">{session?.user?.email}</Text>
                </Box>
                <Flex align="center" gap="xs" component={Link} href={"/profile/update"} c="black" sx={{ textDecoration: "none" }}>
                    <Text size="sm" fw={500}>
                        modifier mon profil
                    </Text>
                    <IconArrowRight size={16} />
                </Flex>
            </Group>
            <Group bg="black" c='white' p="lg" sx={{ borderRadius: "var(--mantine-radius-md)" }} justify="center" gap="xl">
                <Stack align="center" maw={300}>
                    <Text fw="bold" fz="h1" ta="center">10</Text>
                    <Text ta="center">réservations effectués</Text>
                </Stack>
                <Stack align="center" maw={300}>
                    <Text fw="bold" fz="h1" ta="center">30%</Text>
                    <Text ta="center">d'économie en moyenne</Text>
                </Stack>
                <Stack align="center" maw={300}>
                    <Text fw="bold" fz="h1" ta="center">20</Text>
                    <Text ta="center">nuits passés dans nos hotels partenaires</Text>
                </Stack>
            </Group>
            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "inherit" }} shadow="lg" w="100%" py="xl" component={Link} href={"/profile/likes"}>
                    <IconHeart size={50} />
                    <Text mt="md">Favoris</Text>
                </Paper >
                <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "inherit" }} shadow="lg" w="100%" py="xl" component={Link} href={"/profile/reservations"}>
                    <IconCalendar size={50} />
                    <Text mt="md">Réservations</Text>
                </Paper>
                <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "inherit" }} shadow="lg" w="100%" py="xl" component={Link} href={"/profile/negotiations"}>
                    <IconHeartHandshake size={50} />
                    <Text mt="md">Négociations</Text>
                </Paper>
            </SimpleGrid>
            <Button onClick={() => signOut()} fullWidth>Deconnexion</Button>
        </>
    );
}

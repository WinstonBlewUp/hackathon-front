'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Box, Button, Center, Flex, Group,
  Image, NumberInput, Paper, Stack, Text, Title
} from "@mantine/core";
import { IconArrowRight, IconTestPipe } from '@tabler/icons-react';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import placeholder from '../../../assets/image.png';
import { StripeCheckoutButton } from '@/components/root/stripe/StripeCheckoutButton';


interface Room {
  roomId: number;
  roomName: string;
  hotelName: string;
  roomDescription: string;
  roomBasePrice: number;
  image?: string;
}

export default function RoomPage() {
  const { id } = useParams();
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('searchResults');
    if (stored) {
      const parsed = JSON.parse(stored) as Room[];
      const found = parsed.find((r) => String(r.roomId) === String(id));
      if (found) setRoom(found);
    }
  }, [id]);

  if (!room) return <Text>Chargement ou chambre introuvable</Text>;

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
        {[...Array(5)].map((_, i) => (
          <CarouselSlide key={i}>
            <Image
              src={room.image || placeholder.src}
              radius="md"
              h="100%"
            />
          </CarouselSlide>
        ))}
      </Carousel>

      <Paper
        shadow="md"
        sx={{
          borderTopLeftRadius: 'var(--mantine-radius-xl)',
          borderTopRightRadius: 'var(--mantine-radius-xl)',
          position: "relative"
        }}
        p="xl"
        mt={-10}
      >
        <Flex justify="space-between" align="start" gap="md">
          <Group gap={0}>
            <Title fw="bold" size="xl" order={2}>
              {room.roomName} -
            </Title>
            <Text>{" "}{room.hotelName}</Text>
          </Group>
          <Text fw="bold" fz="h2" fs="italic">
            {room.roomBasePrice}<Text span fs="normal">€/nuit</Text>
          </Text>
        </Flex>

        <Text mt="md">{room.roomDescription}</Text>

        <Flex align="center" gap="xs" mt="md">
          <Text size="sm" fw={500}>découvrir l'hôtel</Text>
          <IconArrowRight size={16} />
        </Flex>

        <Box mt="md">
          <Text fw="bold" fz="lg">Les + de la chambre</Text>
          <Group p="lg" gap="xl" justify="center">
            {Array(4).fill(null).map((_, i) => (
              <Stack key={i} justify="center" gap={5} mx="md">
                <IconTestPipe />
                Test
              </Stack>
            ))}
          </Group>
        </Box>

        <Center mt="lg">
          <Stack gap="sm" w="100%" maw={400}>
            <Text fz="sm">
              L'hôtelier vous répondra sous 3 heures. Attention, si votre offre est acceptée, vous n'aurez que 24h pour confirmer votre commande et réserver définitivement.
            </Text>
            <NumberInput
              hideControls
              placeholder="Proposition de prix (€)"
            />
            <Button component='a' href='/profile/negotiations'>
              Soumettre ma proposition
            </Button>
            {/* <Stack gap="sm" w="100%" maw={400}>
              <Text fz="sm">
                Test paiement direct via Stripe Checkout
              </Text>

              <StripeCheckoutButton
                roomId={room.roomId}
                roomName={room.roomName}
                amount={room.roomBasePrice}
                userId={1} // fix temporaire tant qu'on a pas tout raccordé 
              />

            </Stack> */}
          </Stack>
        </Center>
      </Paper>
    </Box>
  );
}

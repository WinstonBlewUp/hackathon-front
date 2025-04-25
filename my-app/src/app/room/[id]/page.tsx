'use client';

import { Carousel, CarouselSlide } from '@mantine/carousel';
import {
  Box, Button, Center, Flex, Group,
  Image, NumberInput, Paper, Stack, Text, Title
} from "@mantine/core";
import { IconArrowRight, IconTestPipe } from '@tabler/icons-react';
import { useState } from 'react';

import placeholder from "../../../assets/image.png";
import rooms from "../../../data/rooms.json";

type Props = {
  params: {
    id: string;
  };
};

export default function Room({ params }: Props) {
  const room = rooms[Number(params.id) - 1];
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [proposedPrice, setProposedPrice] = useState('');

  const handleSubmit = () => {
    console.log('Proposition envoyée :', proposedPrice);
  };

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
            <Image src={placeholder.src} radius="md" h="100%" style={{ filter: showNegotiation ? 'blur(4px)' : 'none', transition: 'filter 0.3s ease' }} />
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
            {room.price}<Text span fs="normal">€/nuit</Text>
          </Text>
        </Flex>

        {!showNegotiation && (
          <>
            <Text>{room.description}</Text>

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
          </>
        )}

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

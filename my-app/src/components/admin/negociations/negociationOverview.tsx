'use client';

import { Box, Button, Divider, Flex, Stack, Text, TextInput, Title } from '@mantine/core';
import rooms from '@/data/rooms.json';
import rawNegotiations from '@/data/negotiations.json';
import { useState } from 'react';

interface Negotiation {
  id: number;
  roomId: number;
  guestName: string;
  proposedPrice: number;
  basePrice: number;
  status: 'pending' | 'accepted' | 'refused';
}

const roomMap = Object.fromEntries(rooms.map(room => [room.id, room.roomName]));

const AUTO_ACCEPT_THRESHOLD = 0.9;
const AUTO_REFUSE_THRESHOLD = 0.7;

const enrichNegotiations = (raw: Negotiation[]): Negotiation[] => {
  return raw.map((n) => {
    const ratio = n.proposedPrice / n.basePrice;
    if (ratio >= AUTO_ACCEPT_THRESHOLD) return { ...n, status: 'accepted' };
    if (ratio <= AUTO_REFUSE_THRESHOLD) return { ...n, status: 'refused' };
    return n;
  });
};

export const NegotiationOverview = () => {
    const [negotiations, setNegotiations] = useState<Negotiation[]>(() => enrichNegotiations(rawNegotiations));
  const [responses, setResponses] = useState<Record<number, string>>({});

  const handleInputChange = (id: number, value: string) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const updateNegotiationStatus = (id: number, status: 'accepted' | 'refused') => {
    setNegotiations((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status } : n
      )
    );
  };

  const handleCounterOffer = (id: number) => {
    const newPrice = parseFloat(responses[id]);
    if (!isNaN(newPrice)) {
      setNegotiations((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, proposedPrice: newPrice } : n
        )
      );
      setResponses((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const currentNegotiations = negotiations.filter((n) => n.status === 'pending');
  const pastNegotiations = negotiations.filter((n) => n.status !== 'pending');

  const renderNegotiation = (n: Negotiation, isPending = false) => (
    <Box
      key={n.id}
      p="md"
      radius="md"
      bg="gray.0"
      sx={{ border: '1px solid #e0e0e0' }}
    >
      <Text fw={500}>
        {n.guestName} a proposé {n.proposedPrice}€ (prix initial : {n.basePrice}€)
        pour la chambre {roomMap[n.roomId] ?? `#${n.roomId}`}
      </Text>
      <Text size="sm" color="dimmed" mb="sm">
        Statut : {n.status === 'pending' ? 'En attente' : n.status === 'accepted' ? 'Acceptée' : 'Refusée'}
      </Text>

      {isPending && (
        <Stack gap="xs">
          <Flex gap="sm">
            <TextInput
              placeholder="Contre-offre (optionnelle)"
              value={responses[n.id] || ''}
              onChange={(e) => handleInputChange(n.id, e.currentTarget.value)}
              w="100%"
            />
            <Button size="xs" variant="outline" onClick={() => handleCounterOffer(n.id)}>
              Envoyer
            </Button>
          </Flex>
          <Flex gap="sm">
            <Button size="xs" color="green" onClick={() => updateNegotiationStatus(n.id, 'accepted')}>
              Accepter
            </Button>
            <Button size="xs" color="red" onClick={() => updateNegotiationStatus(n.id, 'refused')}>
              Refuser
            </Button>
          </Flex>
        </Stack>
      )}
    </Box>
  );

  return (
    <Stack gap="xl">
      <Box>
        <Title order={2}>Négociations en cours</Title>
        <Stack mt="md">
          {currentNegotiations.length > 0
            ? currentNegotiations.map((n) => renderNegotiation(n, true))
            : <Text color="dimmed">Aucune négociation en cours.</Text>}
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Title order={2}>Historique des négociations</Title>
        <Stack mt="md">
          {pastNegotiations.length > 0
            ? pastNegotiations.map((n) => renderNegotiation(n, false))
            : <Text color="dimmed">Aucune négociation passée.</Text>}
        </Stack>
      </Box>
    </Stack>
  );
};

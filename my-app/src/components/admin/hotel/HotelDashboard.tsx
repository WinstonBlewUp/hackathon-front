'use client';

import React from 'react';
import { Container, Stack, Title, Divider } from '@mantine/core';
import { CurrentlyAvailable } from '@/components/currentlyAvailable/CurrentlyAvailable';
import { NegotiationOverview } from '../negociations/negociationOverview';

const HotelDashboard = () => {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={1}>Tableau de bord Hôtelier</Title>
        <Divider label="Chambres disponibles" labelPosition="center" />
        <CurrentlyAvailable hideTitle />
        <Divider label="Négociations" labelPosition="center" />
        <NegotiationOverview />
        <Divider label="Notifications" labelPosition="center" />
      </Stack>
    </Container>
  );
};

export default HotelDashboard;

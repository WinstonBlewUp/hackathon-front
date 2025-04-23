'use client';

import React from 'react';
import { Container, Stack, Title, Divider } from '@mantine/core';
import { CurrentlyAvailable } from '@/components/root/currentlyAvailable/CurrentlyAvailable';

const HotelDashboard = () => {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={1}>Tableau de bord Hôtelier</Title>
        <Divider label="Chambres disponibles" labelPosition="center" />
        <CurrentlyAvailable hideTitle />
        <Divider label="Négociations" labelPosition="center" />
        <Divider label="Notifications" labelPosition="center" />
      </Stack>
    </Container>
  );
};

export default HotelDashboard;

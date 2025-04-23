// src/app/components/Home.tsx
'use client';

import React, { useState } from 'react';
import {
  Container,
  Stack,
  Title,
  Text,
  TextInput,
  Card,
  Image,
  ScrollArea,
  Group,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import rooms from '@/data/rooms.json';
import placeholder from '@/assets/image.png';
import { FlashLayout } from '@/components/root/FlashLayout';

import { IconArrowRight } from '@tabler/icons-react';
import { Flex} from '@mantine/core';

export default function Home() {
  const [search, setSearch] = useState('');
  const filtered = rooms.filter((r) =>
    r.roomName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Stack gap="xs">
          <Title order={1} fz="36px">
            Matchroom
          </Title>
          <Text size="lg" color="dimmed">
            Matchez avec votre Hôtel
          </Text>
        </Stack>

        <TextInput
          placeholder="Rechercher une salle…"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        <FlashLayout 
        title='vente flash'
        direction='row'
        badge={
          <Flex align="center" gap="xs">
            <Text size="sm" fw={500}>
             voir tout
            </Text>
            <IconArrowRight size={16} />
          </Flex>
        }/>

      </Stack>
    </Container>
  );
}

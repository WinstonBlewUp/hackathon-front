// src/app/components/Home.tsx
'use client';

import React, { useState } from 'react';
import {
  Stack,
  Title,
  Text,
  TextInput,
  Box,
} from '@mantine/core';
import rooms from '@/data/rooms.json';
import { FlashLayout } from '@/components/root/FlashLayout';
import { CurrentlyAvailable } from '../currentlyAvailable/CurrentlyAvailable';

import { IconArrowRight, IconSearch } from '@tabler/icons-react';

import { Flex } from '@mantine/core';
import { CategoriesLayout } from '../CategoriesLayout';

export default function Home() {
  const [search, setSearch] = useState('');
  const filtered = rooms.filter((r) =>
    r.roomName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box w="100%" py="xl">
      <Stack gap="xl">
        <Stack gap="xs">
          <Title
            order={1}
            fz="90px"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              lineHeight: 0.7,
              gap: 0,
            }}
          >
            <span style={{ whiteSpace: 'nowrap' }}>Match</span>
            <span style={{ whiteSpace: 'nowrap' }}>room</span>
          </Title>
          <Text size="lg" color="dimmed">
            Matchez avec votre Hôtel
          </Text>
        </Stack>

        <TextInput
          placeholder="Rechercher une salle…"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          rightSection={<IconSearch size={16} />}
          leftSectionWidth={32}
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
          } />
        <CategoriesLayout />
        <CurrentlyAvailable />

      </Stack>
    </Box>
  );
}

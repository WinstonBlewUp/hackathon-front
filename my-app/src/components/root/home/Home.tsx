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
import { SearchBar } from '../searchbar/Searchbar';

import { IconArrowRight, IconSearch } from '@tabler/icons-react';

import { Flex } from '@mantine/core';
import { CategoriesLayout } from '../CategoriesLayout';
import { link } from 'fs';
import Link from 'next/link';

export default function Home() {
  const [search, setSearch] = useState('');
  const filtered = rooms.filter((r) =>
    r.roomName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box w="100%">
      <Stack gap="xl">
        <Stack pos='relative' py={75} c="white" gap="xl">
          <Box w="150%" bg="black" h="100%" pos='absolute' left='-30%' top="0" c="white" sx={{ zIndex: -1 }} />

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

        <SearchBar />


            <Text>Recherchez une chambre disponible aux dates et destinations de votre choix.</Text>
            <Text fw="bold" fz="xl">Négociez et Réservez.</Text>
          </Box>
        </Stack>
        <FlashLayout
          title='Last minute'
          direction='row'
          badge={
            <Link href="/results" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Flex align="center" gap="xs">
                <Text size="sm" fw={500}>
                  voir tout
                </Text>
                <IconArrowRight size={16} />
              </Flex>
            </Link>
          } ></FlashLayout>
        <CategoriesLayout />
        <CurrentlyAvailable />

      </Stack>
    </Box>
  );
}

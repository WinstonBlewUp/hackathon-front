'use client';

import { Box, Flex, TextInput, Button, Drawer, Group, ActionIcon } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconSearch, IconCalendar, IconMenu2 } from '@tabler/icons-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import dayjs from 'dayjs';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (date) params.append('date', dayjs(date).format('YYYY-MM-DD'));

    router.push(`/results?${params.toString()}`);
    if (opened) close();
  };

  // Le formulaire de recherche (utilisé dans les deux vues)
  const searchForm = (
    <Flex
      gap="md"
      direction={isMobile ? "column" : "row"}
      align={isMobile ? "stretch" : "center"}
      w="100%"
    >
      <Flex
        sx={{
          border: `1px solid var(--mantine-color-gray-1)`,
          borderRadius: "var(--mantine-radius-sm)"
        }}
        w="100%"
        direction={isMobile ? "column" : "row"}
      >
        <TextInput
          variant="unstylled"
          placeholder="Rechercher un hôtel, une chambre..."
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          w="100%"
          suppressHydrationWarning
        />
        <DatePickerInput
          variant='filled'
          value={date}
          onChange={setDate}
          placeholder="Choisir une date"
          leftSection={<IconCalendar size={16} />}
          w={isMobile ? "100%" : 250}
          styles={{ input: { borderRadius: 'var(--mantine-radius-xs)' } }}
          suppressHydrationWarning
        />
      </Flex>
      <Button
        onClick={handleSearch}
        color={isMobile ? "dark" : 'white'}
        c={isMobile ? "white" : "dark"}
        miw={isMobile ? "100%" : 125}
      >
        Rechercher
      </Button>
    </Flex>
  );

  // Version mobile
  if (isMobile) {
    return (
      < >
        <Flex gap="md" align="center">
          <TextInput
            variant="filled"
            placeholder="Rechercher..."
            leftSection={<IconSearch size={16} />}
            onClick={open}
            readOnly
            w="100%"
            suppressHydrationWarning
          />
          <ActionIcon variant="light" size="lg" onClick={open}>
            <IconMenu2 size={20} />
          </ActionIcon>
        </Flex>

        <Drawer
          opened={opened}
          onClose={close}
          title="Recherche"
          position="bottom"
        ><Box mr="15vw">

            {searchForm}
          </Box>
        </Drawer >
      </ >
    );
  }

  // Version desktop (originale)
  return (
    <Box>
      {searchForm}
    </Box>
  );
};
'use client';

import { Box, Flex, TextInput, Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconSearch, IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (date) params.append('date', dayjs(date).format('YYYY-MM-DD'));

    router.push(`/results?${params.toString()}`);
  };

  return (
    <Box>
      <Flex gap="md" align="center" wrap="wrap">
        <TextInput
          placeholder="Rechercher un hôtel, une chambre..."
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          w="250px"
        />
        <DatePickerInput
          value={date}
          onChange={setDate}
          placeholder="Choisir une date"
          leftSection={<IconCalendar size={16} />}
        />
        <Button onClick={handleSearch}>
          Rechercher
        </Button>
      </Flex>
    </Box>
  );
};

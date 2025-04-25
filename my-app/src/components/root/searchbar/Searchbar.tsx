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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (date) params.append('date', dayjs(date).format('YYYY-MM-DD'));

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}rooms/search/${encodeURIComponent(query || '')}`;
    console.log('[FRONT] Envoi de la requête vers :', apiUrl);

    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error('Erreur réseau');
      const data = await res.json();
      console.log('[FRONT] Données reçues :', data);

      router.push(`/results?${params.toString()}`);
    } catch (err) {
      console.error('[FRONT] Erreur lors de la requête :', err);
    } finally {
      setLoading(false);
    }
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
        <Button onClick={handleSearch} loading={loading}>
          Rechercher
        </Button>
      </Flex>
    </Box>
  );
};

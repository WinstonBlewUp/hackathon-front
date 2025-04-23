'use client';

import { useEffect, useState } from 'react';
import { Text, Stack, Title } from '@mantine/core';
import { getTestapiList } from '@/lib/axios';

interface Testapi {
  id: number;
  nom: string;
  age: number;
}

export default function TestRequest() {
  const [list, setList] = useState<Testapi[]>([]);

  useEffect(() => {
    getTestapiList()
      .then(setList)
      .catch((err) => console.error('Erreur API Testapi', err));
  }, []);

  return (
    <Stack>
      <Title order={3}>Test API Platform</Title>
      {list.map((item) => (
        <Text key={item.id}>
          {item.nom} — {item.age} ans
        </Text>
      ))}
    </Stack>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { Stack, Title, SimpleGrid, Text, Group } from '@mantine/core';
import { CardNegotiation } from '@/components/negotiation/CardNegotiation';
import { useSession } from 'next-auth/react';
import { NegotiationData } from '@/types/data';
import { redirect } from 'next/navigation';
import { getAdminNegotiationsOpen } from '@/lib/axios';

const HotelDashboard = () => {
  const { data: session } = useSession();

  const [data, setData] = useState<NegotiationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!session?.user) redirect("/login")
    const fetchCategories = async () => {
      try {
        const response = await getAdminNegotiationsOpen(session?.user.id);
        if (response.success) {
          console.log(response.data)
          setData(response.data);
        } else {
          setError(response.error ?? "Error");
        }
      } catch (err) {
        setError("Erreur de connexion");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  if (error) {
    return <Text c="red">Erreur: {error}</Text>;
  }
  if (loading) {
    return <Text>Chargement...</Text>;
  }
  if (!data.length) return <Text>Pas de chambre like</Text >
  return (
    <Stack gap="xl" w="100%" mt="xl">
      <Title order={1}>Vos négociations en attente</Title>
      <Stack gap='xl'>
        {data.map((nego, index) => <CardNegotiation {...nego} key={index} />
        )}
      </Stack>
    </Stack>
  );
};

export default HotelDashboard;

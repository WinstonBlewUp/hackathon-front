/* 'use client';

import { Title, Card, Image, Text, Stack, Box } from '@mantine/core';
import { GridLayout } from '../grid/Grid';
import rooms from '@/data/rooms.json';
import placeholder from '@/assets/image.png';
import { CardRoomComponent } from '@/components/CardRoomComponent';
import Link from 'next/link';

export const CurrentlyAvailable = () => {
  return (
    <Stack gap="xl">
      <Title order={2}>Actuellement disponibles</Title>

      <GridLayout cols={{ base: 1, sm: 2, lg: 3 }}>
        {rooms.slice(0, 5).map((room, index) => (
          <Box component={Link} key={index} href={`/room/${room.id}`} sx={{
            transition: "transform 0.3s ease",
            display: "block",
            "&:hover": { transform: "scale(1.1)" },
            textDecoration: "none"
          }}  >
            <CardRoomComponent price={room.price} name={room.hotelName} picture={placeholder.src} h={200} />
          </Box>
        ))}
      </GridLayout>
    </Stack >
  );
};
 */

'use client';

import { Title, Stack, Box } from '@mantine/core';
import { GridLayout } from '@/components/root/grid/Grid';
import { CardRoomComponent } from '@/components/CardRoomComponent';
import Link from 'next/link';
import defaultRooms from '@/data/rooms.json';

interface Room {
  id: number;
  hotelName: string;
  price: number;
  image?: string;
  status?: string;
}

interface CurrentlyAvailableProps {
  rooms?: Room[];
  hideTitle?: boolean;
}


export const CurrentlyAvailable = ({ rooms, hideTitle = false }: CurrentlyAvailableProps) => {
  const data = rooms ?? defaultRooms.filter((r) => r.status === 'free');

  return (
    <Stack gap="xl">
      {!hideTitle && <Title order={2}>Actuellement disponibles</Title>}
      <GridLayout cols={{ base: 1, sm: 2, lg: 3 }}>
        {data.map((room) => (
          <Box
            component={Link}
            key={room.id}
            href={`/room/${room.id}`}
            sx={{
              transition: 'transform 0.3s ease',
              display: 'block',
              '&:hover': { transform: 'scale(1.1)' },
              textDecoration: 'none',
            }}
          >
            <CardRoomComponent
              price={room.price}
              name={room.hotelName}
              picture={room.image || '/placeholder.png'}
              h={200}
            />
          </Box>
        ))}
      </GridLayout>
    </Stack>
  );
};

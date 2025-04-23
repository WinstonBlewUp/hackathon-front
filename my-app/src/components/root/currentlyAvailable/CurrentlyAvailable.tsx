'use client';

import { Title, Card, Image, Text, Stack } from '@mantine/core';
import { GridLayout } from '../../root/grid/Grid';
import rooms from '@/data/rooms.json';
import placeholder from '@/assets/image.png';

export const CurrentlyAvailable = () => {
  return (
    <Stack gap="xl">
      <Title order={2}>Actuellement disponibles</Title>

      <GridLayout cols={{ base: 2, sm: 2, lg: 3 }}>
        {rooms.map((room, index) => (
          <Card
            key={index}
            shadow="md"
            radius="md"
            padding="md"
            style={{ transition: 'transform 150ms ease' }}
            component="div"
          >
            <Card.Section mb="md">
              <Image src={placeholder.src} height={160} alt={room.roomName} />
            </Card.Section>

            <Text fw={500}>{room.roomName}</Text>
            <Text size="sm" color="dimmed">
              {room.description}
            </Text>
          </Card>
        ))}
      </GridLayout>
    </Stack>
  );
};

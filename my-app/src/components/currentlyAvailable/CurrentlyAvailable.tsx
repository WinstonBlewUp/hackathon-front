'use client';

import { Title, Stack } from '@mantine/core';
import { GridLayout } from '@/components/root/grid/Grid';
import { CardRoomComponent } from '@/components/CardRoomComponent';
import { RoomData } from '@/types/data';


interface CurrentlyAvailableProps {
  rooms: RoomData[];
  hideTitle?: boolean;
}

export const CurrentlyAvailable = ({ rooms, hideTitle = false }: CurrentlyAvailableProps) =>

(
  <Stack gap="xl">
    {!hideTitle && <Title order={2}>Nos recommendations</Title>}
    <GridLayout cols={{ base: 1, sm: 2, lg: 3 }}>
      {rooms.map((room, key) => (
        <CardRoomComponent
          key={key}
          {...room}
          h={200}
        />

      ))}
    </GridLayout>
  </Stack>
);


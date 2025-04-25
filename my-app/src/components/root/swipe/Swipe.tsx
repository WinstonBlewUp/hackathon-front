'use client';

import { Box,Button, Flex, Group, Image, Paper, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight, IconTestPipe } from '@tabler/icons-react';
import { useState } from 'react';
import { useDrag } from '@use-gesture/react';
import placeholder from '@/assets/image.png';
import rooms from '@/data/rooms.json';

type Room = typeof rooms[number];

interface RoomMatchCardProps {
  room: Room;
  onLike?: () => void;
  onDislike?: () => void;
  onNegotiate?: () => void;
}

export const RoomMatchCard = ({ room, onLike, onDislike, onNegotiate }: RoomMatchCardProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const bind = useDrag(({ down, movement: [mx, my], direction: [dx, dy] }) => {
    setPos(down ? { x: mx, y: my } : { x: 0, y: 0 });

    if (!down) {
      if (mx > 100) return onLike?.();
      if (mx < -100) return onDislike?.();
      if (my < -100) return onNegotiate?.();
    }
  });

  if (isMobile) {
    return (
      <Stack gap="xs" pt="lg">
        <div
          {...bind()}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: pos.x === 0 && pos.y === 0 ? 'transform 0.3s ease' : 'none',
            touchAction: 'none',
            position: 'relative',
          }}
        >
          <Image
            src={placeholder.src}
            alt={room.roomName}
            radius="md"
            h={400}
            w="100%"
            style={{ objectFit: 'cover', userSelect: 'none' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              padding: '0.75rem 1rem',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              color: 'white',
            }}
          >
            <Text fw={700} fz="lg">{room.roomName}</Text>
            <Text fz="sm">{room.hotelName} - Paris</Text>
            <Text fw={700} fz="lg">{room.price}€<Text span fz="sm">/nuit</Text></Text>
          </div>
        </div>

        <Flex justify="center" gap="md" mt="sm">
          <Button variant="outline" size="lg" color="gray" onClick={onDislike} w="calc(50% - 0.5rem)">
          <img src="/dislike.svg" alt="Like" width={24} height={24} />
          </Button>
          <Button variant="outline" size="lg" color="gray" onClick={onLike} w="calc(50% - 0.5rem)">
          <img src="/like.svg" alt="Like" width={24} height={24} />
          </Button>
        </Flex>

        <Button size="md" fullWidth color="dark" onClick={onNegotiate}>Négocier</Button>
      </Stack>
    );
  }

  return (
    <Box pt="lg">
        <Flex gap="xl" h={570}>
        <div
            {...bind()}
            style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: pos.x === 0 && pos.y === 0 ? 'transform 0.3s ease' : 'none',
            touchAction: 'none',
            }}
        >
            <Image
            src={placeholder.src}
            alt={room.roomName}
            w={700}
            h="100%"
            radius="md"
            style={{ objectFit: 'cover', flexShrink: 0, userSelect: 'none' }}
            />
        </div>

        <Paper p="xl" radius="md" style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
            <Flex direction="column" justify="space-between" h="100%">
            <Stack gap="xs">
                <Title order={2}>{room.roomName}</Title>
                <Text size="lg" fw={600}>{room.hotelName} - Paris</Text>
                <Text fw="bold" fz="h1">
                {room.price}<Text span fz="lg" fw={400}>€/nuit</Text>
                </Text>

                <Text size="sm">{room.description}</Text>

                <Flex align="center" gap="xs" mt="xs">
                <Text size="sm" fw={500}>Découvrir l’hôtel</Text>
                <IconArrowRight size={16} />
                </Flex>

                <Box mt="md">
                <Text fw="bold" fz="lg">Les + de la chambre</Text>
                <Group p="lg" gap="xl" justify="center">
                    {Array(4).fill(null).map((_, i) => (
                    <Stack key={i} justify="center" gap={5} mx="md">
                        <IconTestPipe />
                        Test
                    </Stack>
                    ))}
                </Group>
                </Box>
            </Stack>

            <Stack mt="md" gap="xs">
                <Flex justify="center" gap="md">
                <Button variant="outline" size="lg" color="gray" onClick={onDislike} w="calc(50% - 0.5rem)">
                <img src="/dislike.svg" alt="Dislike" width={24} height={24} />
                </Button>
                <Button variant="outline" size="lg" color="gray" onClick={onLike} w="calc(50% - 0.5rem)">
                <img src="/like.svg" alt="Like" width={24} height={24} />
                </Button>
                </Flex>

                <Button size="md" color="dark" onClick={onNegotiate}>Négocier</Button>
            </Stack>
            </Flex>
        </Paper>
        </Flex>
    </Box>
  );
};

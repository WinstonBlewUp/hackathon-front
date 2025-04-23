'use client';

import {
  ActionIcon,
  Box,
  Button,
  Card,
  CardSection,
  Flex,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconBolt } from '@tabler/icons-react';
import rooms from '@/data/rooms.json';
import placeholder from '@/assets/image.png';
import Link from 'next/link';

interface FlashLayoutProps {
  title?: string;
  buttonLabel?: string;
  badge?: React.ReactNode;
  maxItems?: number;
  direction?: 'row' | 'column';
}

export const FlashLayout = ({
  title = 'Départ de dernière minute ?',
  buttonLabel = 'Voir toutes les ventes flash',
  badge = <IconBolt />,
  maxItems = 5,
  direction = 'row',
}: FlashLayoutProps) => {
    console.log('direction', direction);
  return (
    <Stack component="article" gap="xl" w="100%" style={{ maxWidth: '100vw' }}>
      <Box px="xs" w="100%">
        <Flex align="center" justify="space-between" w="100%">
          <Title order={2}>{title}</Title>
          {badge}
        </Flex>
      </Box>

      {direction === 'row' ? (
        <Box
          w="100%"
          style={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '2rem',
          }}
        >
          <Group
            wrap="nowrap"
            gap="md"
            px="xs"
            style={{
              width: 'max-content',
              minWidth: '100%',
            }}
          >
            {rooms.slice(0, maxItems).map((room) => (
              <Card
                key={room.id}
                w={250}
                component={Link}
                href={`/room/${room.id}`}
                shadow="md"
                radius="md"
                sx={{
                  flex: '0 0 auto',
                  transition: 'transform 150ms ease',
                  '&:hover': { transform: 'scale(1.05)', zIndex: 10 },
                }}
              >
                <CardSection mb="md" pos="relative">
                  <ActionIcon top={10} right={10} pos="absolute" radius="xl">
                    <IconBolt size={16} />
                  </ActionIcon>
                  <Image src={placeholder.src} height={160} />
                </CardSection>
                <Text fw={500}>{room.roomName}</Text>
              </Card>
            ))}
          </Group>
        </Box>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 3, lg: 5 }} w="100%" px="xs">
          {rooms.slice(0, maxItems).map((room) => (
            <Card
              key={room.id}
              w="100%"
              shadow="md"
              component={Link}
              href={`/room/${room.id}`}
              sx={{
                transition: 'transform 150ms ease',
                '&:hover': { transform: 'scale(1.05)', zIndex: 10 },
              }}
            >
              <CardSection mb="md" pos="relative">
                <ActionIcon top={10} right={10} pos="absolute" radius="xl">
                  <IconBolt size={16} />
                </ActionIcon>
                <Image src={placeholder.src} height={160} />
              </CardSection>
              <Text fw={500}>{room.roomName}</Text>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {/* <Box px="xs" w="100%">
        <Button w={300} component={Link} href="/room">
          {buttonLabel}
        </Button>
      </Box> */}
    </Stack>
  );
};

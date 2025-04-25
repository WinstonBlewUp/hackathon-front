/* 'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Title } from '@mantine/core';
import { RoomMatchCard } from '@/components/root/swipe/Swipe';
import { SwipeRoomWrapper } from '@/components/root/swipe/SwipeRoomWrapper';
import rooms from '@/data/rooms.json';

export default function SwipePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedRooms, setLikedRooms] = useState<number[]>([]);
  const router = useRouter();

  const currentRoom = rooms[currentIndex];

  const handleLike = () => {
    console.log('Like !', currentRoom);
    setLikedRooms((prev) => [...prev, currentRoom.id]);
    goToNextRoom();
  };

  const handleDislike = () => {
    console.log('Dislike !', currentRoom);
    goToNextRoom();
  };

  const handleNegotiate = () => {
    router.push(`/room/${currentRoom.id}`);
  };

  const goToNextRoom = () => {
    setCurrentIndex((prev) => (prev + 1 < rooms.length ? prev + 1 : 0));
  };

  if (!currentRoom) {
    return <div>Plus de chambres à afficher.</div>;
  }

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="lg">Trouvez la chambre idéale</Title>
      <Box>
        <RoomMatchCard
          room={currentRoom}
          onLike={handleLike}
          onDislike={handleDislike}
          onNegotiate={handleNegotiate}
        />
      </Box>
    </Container>
  );
}
 */

'use client';

import { SwipeRoomWrapper } from '@/components/root/swipe/SwipeRoomWrapper';

export default function SwipePage() {
  return <SwipeRoomWrapper />;
}

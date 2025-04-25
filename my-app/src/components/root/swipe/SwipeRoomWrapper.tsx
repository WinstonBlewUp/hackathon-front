'use client';

import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { Box } from '@mantine/core';
import { useState } from 'react';
import rooms from '@/data/rooms.json';
import { RoomMatchCard } from './Swipe';

export const SwipeRoomWrapper = () => {
  const [index, setIndex] = useState(0);
  const room = rooms[index];

  const [{ x, y, rot, scale }, api] = useSpring(() => ({
    x: 0, y: 0, rot: 0, scale: 1, config: { tension: 300, friction: 20 },
  }));

  const goToNext = () => {
    setIndex((prev) => (prev + 1 < rooms.length ? prev + 1 : 0));
  };

  const handleLike = () => {
    console.log('Liked:', room);
    goToNext();
  };

  const handleDislike = () => {
    console.log('Disliked:', room);
    goToNext();
  };

  const handleNegotiate = () => {
    console.log('Negotiate:', room);
    window.location.href = `/room/${room.id}`;
  };

  const bind = useDrag(
    ({ down, movement: [mx, my], direction: [dx, dy], velocity, cancel }) => {
      const trigger = velocity > 0.3;

      if (!down && trigger) {
        if (dx > 0.5) {
          handleLike();
          cancel?.();
          return;
        } else if (dx < -0.5) {
          handleDislike();
          cancel?.();
          return;
        } else if (dy < -0.5) {
          handleNegotiate();
          cancel?.();
          return;
        }
      }

      api.start({
        x: down ? mx : 0,
        y: down ? my : 0,
        rot: down ? mx / 20 : 0,
        scale: down ? 1.05 : 1,
      });
    },
    { filterTaps: true }
  );

  if (!room) return <Box>Plus de chambres disponibles</Box>;

  return (
    <RoomMatchCard
      room={room}
      onLike={handleLike}
      onDislike={handleDislike}
      onNegotiate={handleNegotiate}
      swipeProps={{ bind, animatedProps: { x, y, scale, rot } }}
    />
  );
};

'use client';

import { useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import rooms from '@/data/rooms.json';
import { RoomMatchCard } from './Swipe';
import { useEffect, useState } from 'react';
import { PostNegotiationData, RoomData } from '@/types/data';
import { getCategoryRoom, postNegotiation } from '@/lib/axios';
import { Text } from '@mantine/core';
import { useSession } from 'next-auth/react';

export const SwipeRoomWrapper = ({ id }: { id: string }) => {
  const { data: sessions } = useSession()
  const [data, setData] = useState<RoomData[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [requestData, setRequestData] = useState<PostNegotiationData>({ user_id: 0, room_id: null, startDate: null, endDate: null, price: 0 })

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
  const [{ x, y, rot, scale }, api] = useSpring(() => ({
    x: 0, y: 0, rot: 0, scale: 1, config: { tension: 300, friction: 20 },
  }));
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoryRoom(id);
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
  }, [id]);
  useEffect(() => {
    if (sessions?.user?.id) {
      setRequestData(prev => ({
        ...prev,
        user_id: Number(sessions.user.id),
      }));
    }
  }, [sessions]);
  if (error) {
    return <Text c="red">Erreur: {error}</Text>;
  }
  if (loading || !data?.length) {
    return <Text>Chargement...</Text>;
  }


  const room = data[index];


  const goToNext = () => {
    setIndex((prev) => (prev + 1 < data.length ? prev + 1 : 0));
  };

  const handleLike = () => {
    console.log('Liked:', room);
    goToNext();
  };

  const handleDislike = () => {
    console.log('Disliked:', room);
    goToNext();
  };

  const handleNegotiate = async () => {
    if (!room || !requestData || requestData.user_id === 0) return;

    try {
      await postNegotiation({
        price: requestData.price,
        room_id: room.roomId,
        user_id: requestData.user_id,
        startDate: requestData.startDate,
        endDate: requestData.endDate
      });

    } catch (error) {
      console.error("Erreur lors du refus de l'offre :", error);
    }
    goToNext()
  };
  if (index >= data.length) {
    return <Text>Plus de chambres disponibles.</Text>;
  }


  if (!room) return <Text>Aucune chambre à afficher.</Text>;

  return (
    <RoomMatchCard
      onLike={handleLike}
      onDislike={handleDislike}
      onNegotiate={handleNegotiate}
      room={room}
      setRequestData={setRequestData}
      requestData={requestData}
      swipeProps={{ bind, animatedProps: { x, y, scale, rot } }}
    />
  );
};

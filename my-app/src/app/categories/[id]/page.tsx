'use client';
import { SwipeRoomWrapper } from '@/components/root/swipe/SwipeRoomWrapper';
import React from 'react';
type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function SwipePage({ params }: Props) {
  const { id } = React.use(params);

  return <SwipeRoomWrapper id={id} />;
}

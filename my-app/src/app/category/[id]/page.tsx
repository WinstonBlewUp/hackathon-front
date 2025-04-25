'use client';
import { SwipeRoomWrapper } from '@/components/root/swipe/SwipeRoomWrapper';
type Props = {
  params: {
    id: string;
  };
};
export default function SwipePage({ params }: Props) {
  return <SwipeRoomWrapper id={params.id} />;
}

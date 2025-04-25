'use client';

import { RoomLayout } from "@/components/room/RoomLayout";
import React from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function Room({ params }: Props) {
  const { id } = React.use(params);
  return <RoomLayout id={id} />
}

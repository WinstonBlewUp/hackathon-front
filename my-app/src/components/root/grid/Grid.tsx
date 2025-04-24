'use client';

import { SimpleGrid } from '@mantine/core';
import React from 'react';

interface GridLayoutProps {
  cols?: Record<string, number>;
  spacing?: number | string;
  children: React.ReactNode;
}

export const GridLayout = ({
  cols = { base: 1, sm: 2 },
  spacing = 'md',
  children,
}: GridLayoutProps) => {
  return (
    <SimpleGrid
      cols={cols}
      spacing={spacing}
    >
      {children}
    </SimpleGrid>
  );
};

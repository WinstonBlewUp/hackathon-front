'use client';

import { Box, Flex, Paper, Title } from '@mantine/core';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CurrentlyAvailable } from '@/components/currentlyAvailable/CurrentlyAvailable';
import rooms from '@/data/rooms.json';
import { useMediaQuery } from '@mantine/hooks';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

interface ResultsComponentProps {
  query?: string;
}

export const ResultsComponent = ({ query }: ResultsComponentProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const availableRooms = rooms.filter((room) => room.status === 'free');
  const filteredRooms = query
    ? availableRooms.filter((r) =>
      r.hotelName.toLowerCase().includes(query.toLowerCase()) ||
      r.roomName.toLowerCase().includes(query.toLowerCase())
    )
    : availableRooms;

  const defaultPosition: [number, number] = [43.2965, 5.3698];

  return (
    <Flex
      h='100%'
      direction={{
        base: 'column', lg: "row"
      }}
      mt="xl"
      gap="xl"
    >
      <Box
        w={{ base: "100%", lg: "50%" }}
        style={{
          overflowY: isDesktop ? 'scroll' : 'visible',
        }}
        h="100%"
      >
        <Title order={2} mb="md">
          {query ? `Résultats pour "${query}"` : 'Chambres disponibles'}
        </Title>
        <CurrentlyAvailable rooms={filteredRooms} hideTitle />
      </Box>

      <Paper
        h={{ lg: "80vh", base: "40vh" }}
        my="auto"
        w={{ base: "100%", lg: "50%" }}
        shadow="md"
        radius="md"
        sx={{ overflow: "hidden" }}
      >
        <MapContainer
          center={defaultPosition}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredRooms.map((room) => (
            <Marker key={room.id} position={room.coordinates || defaultPosition}>
              <Popup>
                <strong>{room.hotelName}</strong><br />
                {room.price} €
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Paper>
    </Flex>
  );
};

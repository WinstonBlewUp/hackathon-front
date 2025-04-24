'use client';

import { Box, Title } from '@mantine/core';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CurrentlyAvailable } from '@/components/root/currentlyAvailable/CurrentlyAvailable';
import rooms from '@/data/rooms.json';
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
  const availableRooms = rooms.filter((room) => room.status === 'free');
  const filteredRooms = query
    ? availableRooms.filter((r) =>
        r.hotelName.toLowerCase().includes(query.toLowerCase()) ||
        r.roomName.toLowerCase().includes(query.toLowerCase())
      )
    : availableRooms;

  const defaultPosition: [number, number] = [43.2965, 5.3698];

  return (
    <Box style={{ display: 'flex', height: '100vh' }}>
      <Box w="50%" p="lg" style={{ overflowY: 'scroll', borderRight: '1px solid #eee' }}>
        <Title order={2} mb="md">
          {query ? `Résultats pour "${query}"` : 'Chambres disponibles'}
        </Title>
        <CurrentlyAvailable rooms={filteredRooms} hideTitle />
      </Box>

      <Box w="50%" style={{ position: 'sticky', top: 0, height: '100vh' }}>
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
      </Box>
    </Box>
  );
};

'use client';

import { useEffect, useState } from 'react';
import { Box, Title, Text } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { useMediaQuery } from '@mantine/hooks';
import { CurrentlyAvailable } from '@/components/root/currentlyAvailable/CurrentlyAvailable';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

export interface Room {
  roomId: number;
  roomName: string;
  roomDescription: string;
  roomBasePrice: number;
  roomMaxGuests: number;
  hotelId: number;
  hotelName: string;
  coordinates?: [number, number];
  image?: string;
}

export const ResultsComponent = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [L, setLeaflet] = useState<any>(null);

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const defaultPosition: [number, number] = [43.2965, 5.3698];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}rooms/search/${encodeURIComponent(query)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        const data = await res.json();

        localStorage.setItem('searchResults', JSON.stringify(data));
        setRooms(data);
        setError(null);
      } catch (err: any) {
        console.error('[RESULTS] Erreur lors de la récupération des chambres :', err);
        setError('Impossible de charger les résultats. Veuillez réessayer.');
      }
    };

    if (query) fetchRooms();
  }, [query]);

  useEffect(() => {
    import('leaflet').then((leaflet) => {
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      });
      setLeaflet(leaflet);
      setShowMap(true);
    });
  }, []);

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

        {error && <Text color="red">{error}</Text>}
        {!error && rooms.length === 0 && (
          <Text>Aucun résultat trouvé pour « {query} ».</Text>
        )}
        {!error && <CurrentlyAvailable rooms={rooms} hideTitle />}
      </Box>

      <Paper
        h={{ lg: "80vh", base: "40vh" }}
        my="auto"
        w={{ base: "100%", lg: "50%" }}
        shadow="md"
        radius="md"
        sx={{ overflow: "hidden" }}
      >
        {showMap && L && (
          <MapContainer center={defaultPosition} zoom={12} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {rooms.map((room) => (
              <Marker key={room.roomId} position={room.coordinates || defaultPosition}>
                <Popup>
                  <strong>{room.hotelName}</strong><br />
                  {room.roomBasePrice} €
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </Box>
    </Box>
  );
};

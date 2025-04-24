'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box } from '@mantine/core';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export const MapView = () => {
  const position: [number, number] = [48.8566, 2.3522];

  return (
    <Box h={400} w="100%">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Vous êtes ici
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

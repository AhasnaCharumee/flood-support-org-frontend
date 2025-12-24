'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

interface GoogleMapComponentProps {
  zoom?: number;
  center?: {
    lat: number;
    lng: number;
  };
  width?: string;
  height?: string;
  location?: { lat: number; lng: number };
  onLocationSelect?: (coords: { lat: number; lng: number }) => void;
}

const containerStyle = {
  width: '100%',
  height: '400px',
};

export default function GoogleMapComponent({
  zoom = 10,
  center = { lat: 6.9, lng: 79.9 },
  height = '400px',
  location,
  onLocationSelect,
}: GoogleMapComponentProps) {
  const mapContainerStyle = useMemo(
    () => ({
      ...containerStyle,
      height,
    }),
    [height]
  );

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
        <p className="text-red-600">Google Maps API key is not configured</p>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location || center}
        zoom={zoom}
        onClick={onLocationSelect ? (e => {
          if (e.latLng) {
            onLocationSelect({ lat: e.latLng.lat(), lng: e.latLng.lng() });
          }
        }) : undefined}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </LoadScript>
  );
}

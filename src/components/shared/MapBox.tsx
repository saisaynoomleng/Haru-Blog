'use client';

import Map, { Marker } from 'react-map-gl/mapbox';

import { env } from '@/lib/env/client';
import clsx from 'clsx';

import 'mapbox-gl/dist/mapbox-gl.css';
import Bounded from './Bounded';

const MAPBOX_TOKEN = env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Mapbox({
  className,
  lat,
  long,
}: {
  className?: string;
  lat: number;
  long: number;
}) {
  return (
    <Bounded padding="none">
      <div
        className={clsx('overflow-hidden hidden md:block mx-auto', className)}
      >
        <Map
          initialViewState={{
            latitude: lat,
            longitude: long,
            zoom: 13,
          }}
          style={{ width: 1000, height: 500 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
          scrollZoom={false}
        >
          <Marker longitude={long} latitude={lat} color="red" />
        </Map>
      </div>

      <div
        className={clsx('overflow-hidden block md:hidden mx-auto', className)}
      >
        <Map
          initialViewState={{
            latitude: lat,
            longitude: long,
            zoom: 13,
          }}
          style={{ width: 500, height: 500 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
          scrollZoom={false}
        >
          <Marker longitude={long} latitude={lat} color="red" />
        </Map>
      </div>
    </Bounded>
  );
}

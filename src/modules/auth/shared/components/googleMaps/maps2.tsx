"use client";

import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getCoordinates } from "../../helpers/geocode";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coordinates = await getCoordinates(process.env.NEXT_PUBLIC_STORE_ADDRESS as string);
      setLocation(coordinates);
    };

    fetchCoordinates();
  }, []);

  if (!isLoaded || !location) return <p>Cargando mapa...</p>;

  return (
    <div className="w-full h-[500px]">
      <GoogleMap
        zoom={15}
        center={location}
        mapContainerClassName="w-full h-full rounded-lg"
      >
        <Marker position={location} />
      </GoogleMap>
    </div>
  );
};

export default Map;

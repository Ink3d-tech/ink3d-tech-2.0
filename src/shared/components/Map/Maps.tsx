"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ✅ Definir el icono correctamente con L.icon()
const customIcon = L.icon({
  iconUrl: "/marcador-de-posicion.png", // Ruta del icono (asegúrate de tener este archivo en /public)
  iconSize: [40, 40], // Tamaño del icono
  iconAnchor: [20, 40], // Punto de anclaje
  popupAnchor: [0, -40], // Posición del popup respecto al icono
});

// ✅ Hook para actualizar la vista cuando cambian las coordenadas
const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 17);
  }, [center, map]);
  return null;
};

const Map = () => {
  // 📌 Coordenadas exactas de david jaja 
  const position: [number, number] = [-34.5526706, -58.7121091];

  return (
    <div className="w-full h-[500px] rounded-lg border shadow-lg">
      <MapContainer
        center={position}
        zoom={17}
        scrollWheelZoom={false}
        className="w-full h-full rounded-lg"
        style={{ height: "500px", width: "100%" }}
      >
        <ChangeView center={position} />

        {/* Mapa con OpenStreetMap */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 📍 Marcador en la ubicación deseada */}
        <Marker position={position} icon={customIcon as L.Icon}>
          <Popup>
            📍 <strong>Ubicación:</strong> Gelly y Obes 1014, Muñiz, Buenos Aires
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;

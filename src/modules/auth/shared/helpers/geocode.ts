export const getCoordinates = async (address: string) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      {
        headers: {
          "User-Agent": "TuNombreApp/1.0 (tucorreo@example.com)", // Cambia por un nombre real
        },
      }
    );
  
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
  
    const data = await response.json();
  
    if (data.length === 0) {
      throw new Error("No se encontraron coordenadas para la dirección.");
    }
  
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  };
  
import {Geolocation} from '@capacitor/geolocation';

const reverseGeocode = async (lat: number, lng: number) => {
  // Option 1: Using Nominatim (OpenStreetMap) - Free, no API key needed
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Makitta', // Required by Nominatim
    },
  });

  const result: { display_name?: string; } = await response.json();

  if (result && result.display_name) {
    return result.display_name;
  }

};

export default async function getCurrentLocation() {

  // Request permission and get coordinates
  const coordinates = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  });

  const lat = coordinates.coords.latitude;
  const lng = coordinates.coords.longitude;

  // Convert coordinates to address using reverse geocoding
  return await reverseGeocode(lat, lng);
};

import { useEffect, useState } from "react";

interface ILocation {
  latitude: number;
  longitude: number;
}

export const useGeolocation = (options = {}) => {
  const [location, setLocation] = useState<ILocation>();
  const [error, setError] = useState<string>("");

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setLocation({ latitude, longitude });
  };

  const handleError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error };
};

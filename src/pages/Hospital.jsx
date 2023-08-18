import React, { useState, useEffect } from "react";
import axios from "axios";

const hospitalIconUrl =
  "https://cdn.mapmarker.io/api/v1/pin?size=50&background=%2313457a&text=H&icon=fa-hospital-o&hoffset=1";

const Hospital = () => {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const loadMap = () => {
      const map = new window.Microsoft.Maps.Map("#myMap", {
        center: new window.Microsoft.Maps.Location(37.783366, -122.402325),
        zoom: 5,
      });
      setMap(map);
    };

    if (window.Microsoft && window.Microsoft.Maps) {
      loadMap();
    } else {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.bing.com/api/maps/mapcontrol?key=${process.env.REACT_APP_BING_MAPS_API_KEY}&callback=loadMap`;
      script.async = true;
      script.defer = true;
      window.loadMap = loadMap;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (map) {
      // Get user's current location
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
  }, [map]);

  useEffect(() => {
    if (map && userLocation) {
      axios
        .get("https://trueway-places.p.rapidapi.com/FindPlacesNearby", {
          params: {
            location: `${userLocation.lat},${userLocation.lng}`,
            type: "hospital",
            radius: "2000",
            language: "en",
          },
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_TRUEWAY_PLACES,
            "X-RapidAPI-Host": "trueway-places.p.rapidapi.com",
          },
        })
        .then((response) => {
          const places = response.data.results;
          setPlaces(places);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [map, userLocation]);

  useEffect(() => {
    if (map && places.length > 0) {
      const infobox = new window.Microsoft.Maps.Infobox(
        new window.Microsoft.Maps.Location(0, 0),
        {
          visible: false,
        }
      );
      infobox.setMap(map);

      const pins = places.map((place) => {
        const loc = new window.Microsoft.Maps.Location(
          place.location.lat,
          place.location.lng
        );

        const pin = new window.Microsoft.Maps.Pushpin(loc, {
          icon: hospitalIconUrl,
          title: "Hospital",
        });

        window.Microsoft.Maps.Events.addHandler(pin, "mouseover", () => {
          infobox.setOptions({
            title: place.name,
            description: place.address,
            location: loc,
            visible: true,
          });
        });

        window.Microsoft.Maps.Events.addHandler(pin, "mouseout", () => {
          infobox.setOptions({
            visible: false,
          });
        });

        map.entities.push(pin);
        return pin;
      });

      const bounds = window.Microsoft.Maps.LocationRect.fromShapes(pins);
      map.setView({ bounds: bounds });
    }
  }, [map, places]);

  return <div id="myMap" style={{ height: "100vh" }}></div>;
};

export default Hospital;

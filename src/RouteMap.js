// components/RouteMap.jsx
import { GoogleMap, Marker, Polyline, LoadScript } from '@react-google-maps/api';
import { useState, useMemo } from 'react';

const RouteMap = ({ route }) => {
  const [map, setMap] = useState(null);
  const [activeStop, setActiveStop] = useState(null);

  // Default center point (falls back to first stop)
  const center = useMemo(() => (
    route.stops[Math.floor(route.stops.length / 2)]?.position || 
    { lat: 0, lng: 0 }
  ), [route]);

  // Map options
  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  }), []);

  // Polyline options
  const lineOptions = {
    strokeColor: "#0056b3",
    strokeOpacity: 0.8,
    strokeWeight: 4,
    icons: [{
      icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
      offset: "100%",
      repeat: "150px"
    }]
  };

  return (
    <div className="route-map-container">
      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerClassName="route-map"
          center={center}
          zoom={7}
          options={options}
          onLoad={map => setMap(map)}
        >
          {/* Route Line */}
          <Polyline
            path={route.stops.map(stop => stop.position)}
            options={lineOptions}
          />

          {/* Stops */}
          {route.stops.map((stop, index) => (
            <Marker
              key={index}
              position={stop.position}
              label={{
                text: `${index + 1}`,
                color: "white",
                fontSize: "12px"
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: activeStop === index ? "#FF0000" : "#0056b3",
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 8
              }}
              onClick={() => {
                setActiveStop(index);
                map.panTo(stop.position);
                map.setZoom(12);
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Stop Info Panel */}
      {activeStop !== null && (
        <div className="stop-info">
          <h3>{route.stops[activeStop].name}</h3>
          <p>Arrival: {route.stops[activeStop].arrivalTime}</p>
          <p>Departure: {route.stops[activeStop].departureTime}</p>
        </div>
      )}
    </div>
  );
};

export default RouteMap;
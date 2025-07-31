import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import { onlineMapState } from "@/types/app/product";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const MapGoogle = ({
  onlineMap,
  handleProduct,
}: {
  handleProduct: (type: string, value: onlineMapState) => void;
  onlineMap: onlineMapState;
}) => {
  const { center, markers, road } = onlineMap;
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [directions, setDirections] = useState<any>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [checkPlace, setCheckPlace] = useState(false);

  const handleAutocompleteLoad = (auto: google.maps.places.Autocomplete) =>
    setAutocomplete(auto);

  useEffect(() => {
    if (markers.length < 1) setDirections(null);
  }, [markers]);

  useEffect(() => {
    if (road) calculateRoute();
  }, [road]);

  useEffect(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      if (center) {
        handleProduct("onlineMap", {
          ...onlineMap,
          center: {
            lat: center.lat(),
            lng: center.lng(),
          },
        });
      }
    }
  }, [mapRef.current?.getCenter()?.lat(), mapRef.current?.getCenter()?.lng()]);

  useEffect(() => {
    handleProduct("onlineMap", {
      ...onlineMap,
      road: directions !== null,
    });
  }, [directions]);

  const handlePlaceChanged = () => {
    if (!autocomplete || !autocomplete.getPlace()) return;
    const place = autocomplete.getPlace();
    const location = place.geometry?.location;
    if (!location) return;
    const lat = location.lat();
    const lng = location.lng();
    mapRef.current?.panTo({ lat, lng });
    mapRef.current?.setZoom(17);
    handleProduct("onlineMap", {
      ...onlineMap,
      markers: [
        ...markers,
        { lat, lng, address: place.formatted_address || "" },
      ],
    });
  };
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    handleProduct("onlineMap", {
      ...onlineMap,
      markers: [...markers, { lat, lng }],
    });
  };
  const getAddress = async (lat: number, lng: number): Promise<string> => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve) => {
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        resolve(
          status === "OK" && results?.[0]
            ? results[0].formatted_address
            : "Address not found"
        );
      });
    });
  };
  const handleMarkerClick = async (id: number) => {
    const marker = markers.find((_, index) => index === id);
    if (!marker) return;
    const address = await getAddress(marker.lat, marker.lng);
    if (!marker.address)
      handleProduct("onlineMap", {
        ...onlineMap,
        markers: markers.map((m, index) =>
          index === id ? { ...m, address } : m
        ),
      });
    setSelectedId(id);
  };
  const handleRemoveMarker = (id: number) => {
    handleProduct("onlineMap", {
      ...onlineMap,
      markers: markers.filter((_, index) => index !== id),
    });
    setSelectedId(null);
  };
  const calculateRoute = () => {
    if (markers.length < 2) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: markers[0],
        destination: markers[markers.length - 1],
        waypoints: markers.slice(1, -1).map((m) => ({
          location: { lat: m.lat, lng: m.lng },
          stopover: true,
        })),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result: any, status: any) => {
        if (status === "OK") setDirections(result);
        else console.error("Directions request failed due to " + status);
      }
    );
  };
  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyAuWnWUzDMvJAdazO5p5SMYkYYRqPL0hTI"
        libraries={["places"]}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{ position: "absolute", zIndex: 10, top: 10, right: 100 }}
          >
            <Autocomplete
              onLoad={handleAutocompleteLoad}
              onPlaceChanged={handlePlaceChanged}
            >
              <input
                type="text"
                placeholder="Search for a place..."
                style={{
                  width: "300px",
                  height: "40px",
                  padding: "0 12px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </Autocomplete>
          </div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={(map) => {
              mapRef.current = map;
            }}
            onClick={(e) => (checkPlace ? handleMapClick(e) : null)}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => handleMarkerClick(index)}
                icon={{
                  url: "/assets/images/icon/marker-icon.png",
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              >
                {selectedId === index && marker.address && (
                  <InfoWindow onCloseClick={() => setSelectedId(null)}>
                    <div>
                      <p>{marker.address}</p>
                      <button
                        onClick={() => handleRemoveMarker(index)}
                        style={{
                          marginTop: "5px",
                          padding: "4px 8px",
                          background: "#c00",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
            {directions && (
              <>
                <DirectionsRenderer directions={directions} />
                <Marker
                  position={markers[0]}
                  icon={{
                    url: "/assets/images/icon/marker-b.png",
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                />
                <Marker
                  position={markers[markers.length - 1]}
                  icon={{
                    url: "/assets/images/icon/marker-b.png",
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                />
              </>
            )}
          </GoogleMap>
        </div>
      </LoadScript>
      <button
        className="btn btn-primary btn-block w-10 me-3"
        type="button"
        onClick={() => setCheckPlace(!checkPlace)}
      >
        {checkPlace ? "Click to Add Points" : "Add a point"}
      </button>
      {checkPlace && (
        <>
          <button
            className="btn btn-primary btn-block w-10 mx-3"
            type="button"
            onClick={calculateRoute}
          >
            Make road
          </button>
          <button
            className="btn btn-primary btn-block w-10 mx-3"
            type="button"
            onClick={() => setDirections(null)}
          >
            Delete road
          </button>
        </>
      )}
    </>
  );
};

export default MapGoogle;

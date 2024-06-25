import React, { useRef, useEffect } from "react";
import mapboxgl, { Map as MapboxMap, Marker as MapboxMarker } from "mapbox-gl";
import config from "@/config";
import type { Coordinate } from "@/types";
import useStore from "@/store/postions";
import { toast } from "@/components/toast";
mapboxgl.accessToken = config.mapboxToken;

const Map: React.FC = () => {
  const { currentPositions, currentPosition, isShowPrevious, positionAverage } =
    useStore();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);

  const currentMarker = useRef<MapboxMarker | null>(null);
  const averageMarker = useRef<MapboxMarker | null>(null);
  const previousMarkers = useRef<MapboxMarker[]>([]);

  useEffect(() => {
    if (map.current) return; // If map is already initialized, don't reinitialize it
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      // style: config.mapBoxStyle,
      center: [4.9041, 52.3676], // Initial center position
      zoom: 3, // Initial zoom level
    });
    map.current.scrollZoom.disable();
    map.current.doubleClickZoom.disable();
    map.current.boxZoom.disable();

    currentMarker.current = new mapboxgl.Marker({ color: "blue" })
      .setLngLat([0, 0])
      .addTo(map.current);
    const currentMarkerElement = currentMarker.current.getElement();
    currentMarkerElement.style.zIndex = "900";

    averageMarker.current = new mapboxgl.Marker({ color: "orange" })
      .setLngLat([0, 0])
      .addTo(map.current);
    averageMarker.current.getElement().style.zIndex = "800";
  }, []);

  const addMarker = (color: string, position: Coordinate) => {
    if (map.current) {
      return new mapboxgl.Marker({ color: color })
        .setLngLat({ lng: position.lng, lat: position.lat })
        .addTo(map.current);
    }
  };

  useEffect(() => {
    // show previous marker position
    if (isShowPrevious && map.current) {
      if (previousMarkers.current.length == 0) {
        currentPositions.forEach((coord) => {
          if (map.current) {
            const marker = addMarker("grey", coord)!;
            previousMarkers.current.push(marker);
          }
        });
      } else {
        const marker = addMarker("grey", currentPosition)!;
        previousMarkers.current.push(marker);
      }
    }

    // change current/average position
    currentMarker.current!.setLngLat([
      currentPosition.lng,
      currentPosition.lat,
    ]);
    averageMarker.current!.setLngLat([
      positionAverage.lng,
      positionAverage.lat,
    ]);
  }, [currentPosition]);

  useEffect(() => {
    if (!isShowPrevious) {
      previousMarkers.current.forEach((marker) => marker.remove());
      previousMarkers.current = [];
    }
  }, [isShowPrevious]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
};

export default Map;

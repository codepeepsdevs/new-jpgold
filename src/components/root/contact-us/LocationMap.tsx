/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useTheme } from "@/store/theme.store";
import { useEffect, useRef, useState, useMemo } from "react";

// Define type for window with google property
declare global {
  interface Window {
    google: any;
    initMap?: () => void; // Make initMap optional with the ? operator
  }
}

// Define the location coordinates
const LOCATION = {
  lat: 5.581056, // Approximate coordinates for McCarthy Hills, Accra
  lng: -0.296489, // You'll need to replace these with the exact coordinates
  address: "JaPaul LTD, Plot 2, Mccarthy Hills SVD, Accra, Ghana",
};

// Your Google Maps API key
const API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY!;

// Map styles for light and dark themes
const createMapStyles = () => {
  const lightMapStyle: any[] = []; // Default Google Maps style
  const darkMapStyle: any[] = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];

  return { lightMapStyle, darkMapStyle };
};

export default function LocationMap() {
  const theme = useTheme();
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Use useMemo to prevent recreation of map styles on every render
  const { lightMapStyle, darkMapStyle } = useMemo(() => createMapStyles(), []);

  // Load the Google Maps API script
  useEffect(() => {
    // Skip if already loaded
    if (window.google?.maps) {
      setMapLoaded(true);
      return;
    }

    // Skip if already trying to load
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      return;
    }

    // Create a callback function that Google Maps will call when loaded
    window.initMap = () => {
      setMapLoaded(true);
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      setMapError(true);
    };

    document.head.appendChild(script);

    // Cleanup function to remove the global callback
    return () => {
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  // Initialize map when loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !window.google?.maps) return;

    try {
      const mapOptions = {
        center: LOCATION,
        zoom: 15,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: theme === "dark" ? darkMapStyle : lightMapStyle,
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      // Add a marker for the location
      const marker = new window.google.maps.Marker({
        position: LOCATION,
        map: map,
        title: "JaPaul LTD",
      });

      // Add an info window with the address
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><strong>JaPaul LTD</strong><br>${LOCATION.address}</div>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      // Open info window by default
      infoWindow.open(map, marker);
    } catch (err) {
      console.error("Error initializing map:", err);
      setMapError(true);
    }
  }, [mapLoaded, theme, darkMapStyle, lightMapStyle]);

  return (
    <div className="w-full relative space-y-5">
      <div className="mx-auto relative z-10">
        <div className="flex flex-col gap-0.5 xs:gap-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#050706] dark:text-white">
            Locate Us
          </h2>
          <p className="text-base xs:text-lg text-[#323232] dark:text-gray-300">
            {LOCATION.address}
          </p>
        </div>
      </div>

      <div className="w-full h-[400px] relative rounded-lg overflow-hidden">
        {mapError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
            <p className="text-lg text-red-500">
              Error loading map. Please check your API key and console.
            </p>
          </div>
        ) : !mapLoaded ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
            <p className="text-lg">Loading map...</p>
          </div>
        ) : (
          <div ref={mapRef} className="w-full h-full" />
        )}
      </div>
    </div>
  );
}

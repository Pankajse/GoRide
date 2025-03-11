import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const containerStyle = {
    width: '100%',
    height: '700px', // Fixed height
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);

    useEffect(() => {
        // Get the initial position
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            console.log('Current Position:', latitude, longitude); // Debugging
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        // Watch for position changes
        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            console.log('Updated Position:', latitude, longitude); // Debugging
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        // Cleanup the watchPosition on unmount
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
                mapId="698577c72b40832f" // Replace with your Map ID
                style={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <AdvancedMarker position={currentPosition} />
            </Map>
        </APIProvider>
    );
};

export default LiveTracking;
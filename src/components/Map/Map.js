import "./Map.css"
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMapEvents } from 'react-leaflet/hooks'
import { Marker, Popup } from 'react-leaflet'

export function Map({ position, setLatitude, setLongitude }) {
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setLatitude(e.latlng.lat);
                setLongitude(e.latlng.lng);
            },
        })
        return null;
    }

    return (
        <MapContainer className="Map" center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Chosen location.
                </Popup>
            </Marker>
            <LocationMarker />
        </MapContainer>
    );
}
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = () => {
  return (
    <>
      <div className="main">
        <Header />
        <div>
          <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="mx-auto">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Map;

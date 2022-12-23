import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = () => {
  return (
    <>
      <div className="main">
        <Header />
        <div>
          <MapContainer center={[46, 17]} zoom={5} scrollWheelZoom={false} className="mx-auto my-5 rounded-4">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[p.lat, p.long]}>
              <Popup>
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars"></div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.firstName}</b>
                  </span>
                  <span className="date">{p.createdAt}</span>
                </div>
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

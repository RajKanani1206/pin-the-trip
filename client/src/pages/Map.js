import React, { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { MapContainer, Popup, TileLayer, useMapEvent } from "react-leaflet";
import axios from "axios";
import CreatePin from "../components/Pins/CreatePin";
import PinDetails from "../components/Pins/PinDetails";
import Info from "../components/Layout/Info";
import { Container } from "react-bootstrap";
import { BASE_URL } from "../helper/helper";

const Map = () => {
  const [pins, setPins] = useState([]);
  const [popup, setPopup] = useState(false);
  const [position, setPosition] = useState({});

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/getAllPins`);
        setPins(res.data.pins);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const MapEventContainer = () => {
    useMapEvent("click", (e) => {
      setPosition(e.latlng);
      setPopup(true);
    });
    return null;
  };

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
            <PinDetails pins={pins} />
            <MapEventContainer />
            {popup && (
              <Popup position={[position.lat, position.lng]}>
                <CreatePin position={position} pins={pins} setPins={setPins} setPopup={setPopup} />
              </Popup>
            )}
          </MapContainer>
        </div>
        <div className="pt-1">
          <Container>
            <Info />
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Map;

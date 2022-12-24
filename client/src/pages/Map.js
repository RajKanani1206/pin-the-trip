import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import * as L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import axios from "axios";

const Map = () => {
  const [pins, setPins] = useState([]);
  const [popup, setPopup] = useState(false);
  const [lat, setLat] = useState();
  const [long, setlong] = useState();

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/getAllPins");
        console.log("resresres", res);
        setPins(res.data.pins);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const LeafIcon = L.Icon.extend({
    options: {},
  });

  // const redIcon = new LeafIcon({
  //   iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF6347&chf=a,s,ee00FFFF",
  // });

  const slateBlueIcon = new LeafIcon({
    iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|6A5ACD&chf=a,s,ee00FFFF",
  });

  const MapEventContainer = () => {
    useMapEvent("click", (e) => {
      console.log("clicked");
      const { lat, lng } = e.latlng;
      setLat(lat);
      setlong(lng);
      setPopup(true);
    });
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked inside submit");
    const newPin = {
      firstName: "eeee",
      lastName: "eeee",
      title: "eeee",
      desc: "eee",
      rating: 3,
      lat,
      long,
    };

    try {
      const res = await axios.post("http://localhost:4000/api/createPin", newPin);
      console.log("res", res);
      setPins([...pins, res.data.newPin]);
      setPopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main">
        <Header />
        <div>
          <MapContainer
            center={[46, 17]}
            zoom={5}
            scrollWheelZoom={false}
            className="mx-auto my-5 rounded-4"
            onClick={() => console.log("SDFfdsfds")}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pins &&
              pins?.map((p, index) => (
                <Marker position={[p.lat, p.long]} icon={slateBlueIcon} key={index}>
                  <Popup closeOnClick={true}>
                    <div className="d-flex flex-column justify-content-around pin-details">
                      <label>Place</label>
                      <h4 className="m-0 fw-bold text-capitalize">{p.title}</h4>
                      <label>Review</label>
                      <p className="m-0 desc">{p.desc}</p>
                      <label>Rating</label>
                      {/* <div className="stars"></div> */}
                      {/* <div className="Stars" aria-label="Rating"></div> */}
                      <label>Information</label>
                      <span className="username">
                        Created by <b>{p.firstName}</b>
                      </span>
                      <span className="date">{p.createdAt}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            <MapEventContainer />
            {popup && (
              <Popup position={[lat, long]}>
                <div>
                  <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input type="text" placeholder="Enter a title" />
                    <label>Review</label>
                    <textarea name="review" rows="2" placeholder="Say us something about this place" />
                    {/* rating */}
                    <button type="submit" className="submitButton">
                      Add Pin
                    </button>
                  </form>
                </div>
              </Popup>
            )}
          </MapContainer>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Map;

import React from "react";
import * as L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import useUser from "../../hooks/useUser";

const PinDetails = ({ pins }) => {
  const { user } = useUser();

  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const redIcon = new LeafIcon({
    iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF6347&chf=a,s,ee00FFFF",
  });

  const slateBlueIcon = new LeafIcon({
    iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|6A5ACD&chf=a,s,ee00FFFF",
  });
  return (
    <>
      {pins &&
        pins?.map((p, index) => (
          <Marker position={[p.lat, p.long]} icon={user.username === p.username ? redIcon : slateBlueIcon} key={index}>
            <Popup closeOnClick={true}>
              <div className="d-flex flex-column justify-content-around pin-container">
                <label className="pin-details-heading">Title</label>
                <h4 className="m-0 fw-bold text-capitalize">{p.title}</h4>
                <label className="pin-details-heading">Review</label>
                <p className="m-0 fs-14">{p.desc}</p>
                <label className="pin-details-heading">Rating</label>
                <div>
                  {[...Array(5)].map((star, index) => {
                    index += 1;
                    return <span className={`fs-1 ${index <= p.rating ? "on" : "off"}`}>&#9733;</span>;
                  })}
                </div>
                <label className="pin-details-heading">Information</label>
                <span className="fs-14">
                  Created by <b>{p.username}</b>
                </span>
                <span className="fs-12">{p.createdAt}</span>
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
};

export default PinDetails;

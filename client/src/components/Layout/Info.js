import React from "react";
import CreatePin from "../../assets/createPin.png";
import ViewPin from "../../assets/viewPin.png";

const Info = () => {
  return (
    <div className="row my-5">
      <div className="col-md-6 text-center">
        <h3 className="info-heading fst-italic fw-bold">Create a Pin</h3>
        <p className="my-4 fst-italic">
          To create a pin, Click on the location where you would like to create a pin and a popup will appear. Fill in
          the details and click "Add Pin".
        </p>
        <img src={CreatePin} alt="Create Pin" className="w-100 rounded-4" />
      </div>
      <div className="col-md-6 text-center mt-5 mt-md-0">
        <h3 className="info-heading fst-italic fw-bold">View a Pin</h3>
        <p className="my-4 fst-italic">
          To view a pin, Click on the pin for which you would like to view details for and a popup will appear as shown
          below with all the details.
        </p>
        <img src={ViewPin} alt="View Pin" className="w-100 rounded-4" />
      </div>
    </div>
  );
};

export default Info;

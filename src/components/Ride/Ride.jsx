import React from "react";
import "./ride.css";
import { useState, useEffect } from "react";
const Ride = ({ ride, user }) => {
  let text = "[" + ride.station_path.toString() + "]";
  const [distance, setDistance] = useState(-1);
  useEffect(() => {
    let mini = 10000;
    ride.station_path.forEach((stat_code) => {
      mini = Math.min(mini, Math.abs(user.station_code - stat_code));
    });
    setDistance(mini);
  }, [ride, user.station_code]);

  return (
    <div className="irideContainer">
      <div className="irideInfoContainer">
        <div className="irideImageContainer">
          <img src={ride.map_url} alt="" className="irideImage" />
        </div>
        <div className="iridetextConainer">
          <div className="iridetextInfo">Ride Id: {ride.id} </div>
          <div className="iridetextInfo">
            Origin Station:{ride.origin_station_code}
          </div>
          <div className="iridetextInfo">station_path: {text}</div>
          <div className="iridetextInfo">Date: {ride.date}</div>
          <div className="iridetextInfo">Distance: {distance}</div>
        </div>
      </div>

      <div className="irideLocationContainer">
        <div className="irideCity">City: {ride.city}</div>
        <div className="irideState">State: {ride.state}</div>
      </div>
    </div>
  );
};

export default Ride;

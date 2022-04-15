import React from "react";
import Ride from "../Ride/Ride";
import "./rides.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FilterList } from "@material-ui/icons";

const Rides = ({ user }) => {
  const [rides, setRides] = useState([]);
  const [ridesOrder, setridesOrder] = useState("nearest");
  const [totalRides, setTotalRides] = useState([]);
  const [isFilterClicked, setisFilterClicked] = useState(false);
  const [filterCity, setFilterCity] = useState("");
  const [filterState, setFilterState] = useState("");

  useEffect(() => {
    const fetchRides = async () => {
      const { data } = await axios.get("https://assessment.api.vweb.app/rides");

      data.sort((ride1, ride2) => {
        let mini1 = 10000;
        ride1.station_path.forEach((stat_code) => {
          mini1 = Math.min(mini1, Math.abs(user.station_code - stat_code));
        });
        let mini2 = 10000;
        ride2.station_path.forEach((stat_code) => {
          mini2 = Math.min(mini2, Math.abs(user.station_code - stat_code));
        });
        if (mini1 > mini2) return 1;
        else if (mini1 < mini2) return -1;
        return 0;
      });
      setRides(data);
      setTotalRides(data);
    };
    fetchRides();
  }, [user.station_code]);

  useEffect(() => {
    if (ridesOrder === "nearest") {
      setRides((prev) => [
        ...totalRides.sort((ride1, ride2) => {
          let mini1 = 10000;
          ride1.station_path.forEach((stat_code) => {
            mini1 = Math.min(mini1, Math.abs(user.station_code - stat_code));
          });
          let mini2 = 10000;
          ride2.station_path.forEach((stat_code) => {
            mini2 = Math.min(mini2, Math.abs(user.station_code - stat_code));
          });
          if (mini1 > mini2) return 1;
          else if (mini1 < mini2) return -1;
          return 0;
        }),
      ]);
    } else if (ridesOrder === "upcoming") {
      setRides((prev) => [
        ...totalRides.filter((ride) => {
          const currDate = new Date();
          const rideDate = new Date(ride.date);
          console.log(currDate, rideDate, rideDate > currDate);
          return rideDate > currDate;
        }),
      ]);
    } else {
      setRides((prev) => [
        ...totalRides.filter((ride) => {
          const currDate = new Date();
          const rideDate = new Date(ride.date);
          console.log(currDate, rideDate, rideDate > currDate);
          return currDate > rideDate;
        }),
      ]);
    }
  }, [ridesOrder, totalRides, user.station_code]);
  const addClass = (e) => {
    if (e === ridesOrder) return "chosenrideTime ";
    return "";
  };
  return (
    <div className="ridesContainer">
      <div className="rideInfo">
        <div className="rideTimeContainer">
          <button
            className={addClass("nearest") + "rideTime"}
            onClick={() => setridesOrder("nearest")}
          >
            Nearest Rides
          </button>
          <button
            className={addClass("upcoming") + "rideTime"}
            onClick={() => setridesOrder("upcoming")}
          >
            Upcoming Rides
          </button>
          <button
            className={addClass("past") + "rideTime"}
            onClick={() => setridesOrder("past")}
          >
            Past Rides
          </button>
        </div>

        <div className="filterContainer">
          <div className="filters">
            <div>
              <FilterList
                className={isFilterClicked && "filterClicked"}
                onClick={() => {
                  setFilterCity("");
                  setFilterState("");
                  setisFilterClicked((prev) => !prev);
                }}
              />
            </div>
            <div className={isFilterClicked && "filterClicked"}>Filters</div>
            {isFilterClicked && (
              <div className="popupContainer">
                <div className="filterText">
                  <input
                    type="text"
                    placeholder="Enter State"
                    onChange={(e) => setFilterState(e.target.value)}
                  />
                </div>
                <div className="filterText">
                  <input
                    type="text"
                    placeholder="Enter City"
                    onChange={(e) => setFilterCity(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="rides">
        {!isFilterClicked &&
          rides.map((ride, index) => {
            return <Ride key={index} ride={ride} user={user} />;
          })}
        {isFilterClicked &&
          rides
            .filter(
              (ride) =>
                (filterCity === "" || ride.city === filterCity) &&
                (filterState === "" || ride.state === filterState)
            )
            .map((ride, index) => <Ride key={index} ride={ride} user={user} />)}
      </div>
    </div>
  );
};
export default Rides;

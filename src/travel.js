import React, { useState } from "react";
import "./assets/css/travel.css";

// Import vehicle images
import sedanImg from "./assets/images/vehicles/sedan.jpg";
import suvImg from "./assets/images/vehicles/suv.jpg";
import luxuryImg from "./assets/images/vehicles/luxury.jpg";
import autoImg from "./assets/images/vehicles/auto.jpg";
import eAutoImg from "./assets/images/vehicles/e-auto.jpg";
import miniBusImg from "./assets/images/vehicles/mini-bus.jpg";
import luxuryBusImg from "./assets/images/vehicles/luxury-bus.jpg";
import pickupImg from "./assets/images/vehicles/pickup.jpg";
import containerImg from "./assets/images/vehicles/container.jpg";

const vehicleData = {
  Cabs: [
    { name: "Sedan", price: 10, img: sedanImg },
    { name: "SUV", price: 15, img: suvImg },
    { name: "Luxury", price: 25, img: luxuryImg },
  ],
  Autos: [
    { name: "Standard Auto", price: 8, img: autoImg },
    { name: "Electric Auto", price: 10, img: eAutoImg },
  ],
  Buses: [
    { name: "Mini Bus", price: 20, img: miniBusImg },
    { name: "Luxury Bus", price: 50, img: luxuryBusImg },
  ],
  Trucks: [
    { name: "Pickup Truck", price: 30, img: pickupImg },
    { name: "Container Truck", price: 60, img: containerImg },
  ],
};

function Travel() {
  const [selectedTab, setSelectedTab] = useState("Cabs");
  const [selectedPackage, setSelectedPackage] = useState("Instant");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [waitingTime, setWaitingTime] = useState("");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handlePackageChange = (event) => {
    setSelectedPackage(event.target.value);
    // Reset dynamic fields on package change
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setWaitingTime("");
  };

  return (
    <div className="travel-app">
      {/* Left: Map Section */}
      <div className="travel-map">
        <h2>Map Placeholder</h2>
      </div>

      {/* Right: Form Section */}
      <div className="travel-form">
        

        {/* Ride Type Dropdown */}
        <div className="travel-package-selector">
          <label htmlFor="rideType" className="package-label">
            Ride Type
          </label>
          <select
            id="rideType"
            value={selectedPackage}
            onChange={handlePackageChange}
            className="ride-type-dropdown"
          >
            <option value="Instant">Instant</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Rental">Rental</option>
            <option value="Reserve">Reserve</option>
          </select>
        </div>

        {/* Common Pickup and Drop Inputs */}
        <div className="travel-locations">
          <label>
            Pickup Location
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="Enter pickup location"
              className="input-field"
            />
          </label>
          <label>
            Drop Location
            <input
              type="text"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              placeholder="Enter drop location"
              className="input-field"
            />
          </label>
        </div>

        {/* Conditional Fields Based on Selected Ride Type */}
        {selectedPackage === "Scheduled" && (
          <div className="travel-datetime">
            <label>
              Date
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              Time
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="input-field"
              />
            </label>
          </div>
        )}

        {selectedPackage === "Rental" && (
          <div className="travel-datetime">
            <label>
              Start Date
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              Start Time
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              End Date
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              End Time
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="input-field"
              />
            </label>
          </div>
        )}

        {selectedPackage === "Reserve" && (
          <div className="travel-datetime">
            <label>
              Waiting Time (in minutes)
              <input
                type="number"
                value={waitingTime}
                onChange={(e) => setWaitingTime(e.target.value)}
                placeholder="Enter waiting time"
                className="input-field"
              />
            </label>
          </div>
        )}

        {/* Tabs Section */}
        <div className="travel-vehicle-tabs">
          {Object.keys(vehicleData).map((tab) => (
            <button
              key={tab}
              className={`tab-button ${
                selectedTab === tab ? "active-tab" : ""
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Vehicle List */}
        <div className="travel-vehicle-prices">
          {vehicleData[selectedTab].map((vehicle) => (
            <div className="vehicle-container" key={vehicle.name}>
              <img
                src={vehicle.img}  // The image is now imported directly
                alt={vehicle.name}
                className="vehicle-image"
              />
              <p>{vehicle.name}</p>
              <p>₹{vehicle.price} per km</p>
            </div>
          ))}
        </div>

        {/* Book Now Button */}
        <button className="book-now">Book Now</button>
      </div>
    </div>
  );
}

export default Travel;

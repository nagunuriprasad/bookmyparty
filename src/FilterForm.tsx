import React, { useState } from "react";  
import "./assets/css/FilterForm.css";

const FilterForm: React.FC = () => {
  const [category, setCategory] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [eventService, setEventService] = useState("");
  const [packageType, setPackageType] = useState("");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState(25000000); // Default ₹25 Cr

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      category,
      subscriptionType,
      eventService,
      packageType,
      guests,
      budget,
    });
  };

  // Convert numeric value to readable string (K, L, Cr)
  const formatBudget = (value: number): string => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
    return `₹${(value / 1000).toFixed(1)} K`;
  };

  return (
    <div className="filter-container">
      <h2 className="filter-title">Filters</h2>
      <form onSubmit={handleSearch} className="filter-form">
        {/* Category and Subscription Type */}
        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select</option>
              <option value="private">Private</option>
              <option value="corporate">Corporate</option>
              <option value="educational">Educational</option>
              <option value="sports">Sports</option>
              <option value="public">Public</option>
              <option value="movie">Movie</option>
            </select>
          </div>

          <div className="form-group">
            <label>Subscription Type</label>
            <select
              value={subscriptionType}
              onChange={(e) => setSubscriptionType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="vip">VIP</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>

        {/* Event Service */}
        <div className="form-group">
          <label>Event Service</label>
          <select
            value={eventService}
            onChange={(e) => setEventService(e.target.value)}
          >
            <option value="">Select</option>
            <option value="packages">Packages</option>
            <option value="venues">Venues</option>
            <option value="caterers">Caterers</option>
            <option value="decorations">Decorations</option>
            <option value="photo-vediography">Photo/Vediography</option>
          </select>
        </div>

        {/* Package (conditional) */}
        {eventService === "packages" && (
          <div className="form-group">
            <label>Package</label>
            <select
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="engagement">Engagement</option>
              <option value="reunion">Reunion</option>
              <option value="get-together">Get Together</option>
            </select>
          </div>
        )}

        {/* Guests */}
        <div className="form-group">
          <label>No. of Guests</label>
          <input
            type="number"
            placeholder="Enter number of guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        {/* Budget */}
        <div className="form-group">
          <label>Budget Range</label>
          <div className="budget-labels">
            <span>₹5K</span>
            <span>₹50Cr</span>
          </div>
          <input
            type="range"
            min="5000"
            max="500000000"
            step="50000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
          <div className="budget-value">
            Selected: {formatBudget(budget)}
          </div>
        </div>

        {/* Search */}
        <div className="search-btn-container">
          <button type="submit" className="search-btn">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;

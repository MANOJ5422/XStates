import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch all countries on component mount
  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
        .then((response) => setStates(response.data))
        .catch((error) => console.error("Error fetching states:", error));
    } else {
      setStates([]);
      setSelectedState("");
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((response) => setCities(response.data))
        .catch((error) => console.error("Error fetching cities:", error));
    } else {
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedState, selectedCountry]);

  return (
    <div>
      <h2>Select Location</h2>

      {/* Country Dropdown */}
      <label>
        Select Country:
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>

      {/* State Dropdown */}
      <label>
        Select State:
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">-- Select State --</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>

      {/* City Dropdown */}
      <label>
        Select City:
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">-- Select City --</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>

      {/* Display Selection */}
      {selectedCity && selectedState && selectedCountry && (
        <p>
          You Selected {selectedCity}, {selectedState}, {selectedCountry}.
        </p>
      )}
    </div>
  );
};

export default LocationSelector;

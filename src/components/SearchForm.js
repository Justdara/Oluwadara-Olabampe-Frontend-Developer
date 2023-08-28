import React, { useState } from "react";
import { fetchCapsules } from "../services/api";
import "./SearchForm.css";

const SearchForm = ({ onSearch }) => {
  const [status, setStatus] = useState("");
  const [capsuleSerial, setcapsuleSerial] = useState(""); // Changed state name
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch capsules data from the API
      const capsules = await fetchCapsules(
        status,
        capsuleSerial.toUpperCase(),
        type
      );

      // Pass the filtered data to the parent component
      onSearch(capsules);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="search-form">
      <h2 className="search-header">Search for Capsules</h2>
      <form onSubmit={handleSubmit} className="form-columns">
        <div className="form-group">
          <div className="flex-row">
            <div className="form-item">
              <label for="status">Status:</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">select status</option>
                <option value="active">active</option>
                <option value="retired">retired</option>
                <option value="destroyed">destroyed</option>
                <option value="unknown">unknown</option>
              </select>
            </div>
            <div className="form-item">
              <label for="serial">Capsule Serial:</label> {/* Changed label */}
              <input
                id="serial"
                type="text"
                value={capsuleSerial}
                onChange={(e) => setcapsuleSerial(e.target.value)} // Changed state
              />
            </div>
          </div>
          <div className="flex-row">
            <div className="form-item">
              <label for="type">Type:</label>
              <input
                id="type"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit">Search</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;

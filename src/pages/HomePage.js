import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import SearchForm from "../components/SearchForm";
import DataGrid from "../components/DataGrid";
import { fetchCapsules } from "../services/api";

const HomePage = () => {
  const [missions, setMissions] = useState([]); // State to store fetched missions
  const [filteredMissions, setFilteredMissions] = useState([]);

  useEffect(() => {
    // Fetch all missions when the component mounts
    fetchCapsules().then((data) => {
      setMissions(data);
    });
  }, []);

  const handleSearch = (filteredData) => {
    setFilteredMissions(filteredData);
  };

  return (
    <div>
      <Banner />
      <SearchForm onSearch={handleSearch} />

      {/* Display fetched missions using DataGrid */}
      <DataGrid missions={missions} filteredMissions={filteredMissions} />
    </div>
  );
};

export default HomePage;

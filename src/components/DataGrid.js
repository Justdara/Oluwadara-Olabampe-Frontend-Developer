import React, { useState } from "react";
import "./DataGrid.css";
import ReactPaginate from "react-paginate";
import ItemPopup from "./ItemPopup";

const DataGrid = ({ missions, filteredMissions }) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedMission, setSelectedMission] = useState(null); // New state for selected mission

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;

  // Determine the missions to display based on search or all data
  const displayedMissions =
    filteredMissions.length > 0 ? filteredMissions : missions;
  const missionsToDisplay = displayedMissions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Function to handle opening the popup
  const handleMissionClick = (mission) => {
    setSelectedMission(mission);
  };

  // Function to handle closing the popup
  const handleClosePopup = () => {
    setSelectedMission(null);
  };

  return (
    <>
      <div className="mission-list">
        {missionsToDisplay.map((mission, index) => (
          <div
            key={index}
            onClick={() => handleMissionClick(mission)}
            className="mission-item"
          >
            <h3>Capsule Serial: {mission.capsule_serial || "N/A"}</h3>
            <p>Status: {mission?.status || "N/A"}</p>
            <p>Type: {mission?.type || "N/A"}</p>
            <p>Details: {mission?.details || "N/A"}</p>
            <p>Launch Date & Time: {mission?.original_launch || "N/A"}</p>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={Math.ceil(missions.length / itemsPerPage)}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        pageClassName={"pagination__page"}
      />
      {selectedMission && (
        <ItemPopup mission={selectedMission} onClose={handleClosePopup} />
      )}
    </>
  );
};

export default DataGrid;

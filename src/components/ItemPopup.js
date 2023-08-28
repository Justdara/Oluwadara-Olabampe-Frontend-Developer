// ItemPopup.js
import React from "react";
import "./ItemPopup.css";

const ItemPopup = ({ mission, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          <span>x</span>
        </button>
        <h2>Capsule Details</h2>
        <p>Capsule Serial: {mission?.capsule_serial || "N/A"}</p>
        <p>Capsule ID: {mission?.capsule_id || "N/A"}</p>
        <p>Number of capsule Landings: {mission?.landings || "N/A"}</p>
        <p>Reuse Counts of Capsule: {mission?.reuse_count || "N/A"}</p>
        <p>Capsule Status: {mission?.status || "N/A"}</p>
        <p>Capsule Type: {mission?.type || "N/A"}</p>
        <p>Capsule Details: {mission?.details || "N/A"}</p>
        <p>
          Launch Date & Time of capsule: {mission?.original_launch || "N/A"}
        </p>
        <div>
          <h3>Missions:</h3>
          {mission?.missions.length > 0 ? (
            <ul>
              {mission?.missions.map((missionItem, index) => (
                <li key={index}>
                  Mission {index + 1}: Name: {missionItem.name}, Flight:{" "}
                  {missionItem.flight}
                </li>
              ))}
            </ul>
          ) : (
            <p>No Missions</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemPopup;

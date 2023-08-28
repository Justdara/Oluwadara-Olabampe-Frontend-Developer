import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DataGrid from "../components/DataGrid";

describe("DataGrid component", () => {
  const missions = [
    {
      capsule_serial: "C101",
      status: "retired",
      original_launch: "2010-12-08T15:43:00.000Z",
      original_launch_unix: 1291822980,
      missions: [{ name: "COTS 1", flight: 7 }],
      landings: 1,
      type: "Dragon 1.0",
      details: "Reentered after three weeks in orbit",
      reuse_count: 0,
    },
    {
      capsule_serial: "C102",
      status: "retired",
      original_launch: "2012-05-22T07:44:00.000Z",
      original_launch_unix: 1335944640,
      missions: [{ name: "COTS 2", flight: 8 }],
      landings: 1,
      type: "Dragon 1.0",
      details: "First Dragon spacecraft",
      reuse_count: 0,
    },
    // ... Other mock mission data ...
  ];
  const filteredMissions = [
    {
      capsule_serial: "C101",
      status: "retired",
      original_launch: "2010-12-08T15:43:00.000Z",
      original_launch_unix: 1291822980,
      missions: [{ name: "COTS 1", flight: 7 }],
      landings: 1,
      type: "Dragon 1.0",
      details: "Reentered after three weeks in orbit",
      reuse_count: 0,
    },
    // ... Other mock filtered mission data ...
  ];
  it("renders mission items correctly", () => {
    const { container } = render(
      <DataGrid missions={missions} filteredMissions={[]} />
    );

    const missionItems = container.querySelectorAll(".mission-item");
    expect(missionItems.length).toBe(missions.length);
  });

  it("displays correct details when mission item is clicked", () => {
    const { container } = render(
      <DataGrid missions={missions} filteredMissions={[]} />
    );

    const missionItem = container.querySelector(".mission-item");
    fireEvent.click(missionItem);

    const missionDetails = container.querySelector(".popup-content");
    expect(missionDetails).toBeInTheDocument();
  });

  it("opens ItemPopup when mission item is clicked", () => {
    const { container } = render(
      <DataGrid missions={missions} filteredMissions={[]} />
    );

    const missionItem = container.querySelector(".mission-item");
    fireEvent.click(missionItem);

    const itemPopup = container.querySelector(".popup-content");
    expect(itemPopup).toBeInTheDocument();
  });

  it("closes ItemPopup when it is closed", () => {
    const { container } = render(
      <DataGrid missions={missions} filteredMissions={[]} />
    );

    const missionItem = container.querySelector(".mission-item");
    fireEvent.click(missionItem);

    const closeButton = container.querySelector(".close-button");
    fireEvent.click(closeButton);

    const closedItemPopup = container.querySelector(".item-popup");
    expect(closedItemPopup).toBeNull();
  });
});

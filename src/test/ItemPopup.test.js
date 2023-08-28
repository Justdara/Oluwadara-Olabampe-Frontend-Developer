import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ItemPopup from "../components/ItemPopup";

describe("ItemPopup component", () => {
  const mockMission = {
    capsule_serial: "C101",
    capsule_id: "123",
    landings: 1,
    reuse_count: 1,
    status: "active",
    type: "Dragon 2.0",
    details: "Sample details",
    original_launch: "2021-01-01T00:00:00.000Z",
    missions: [{ name: "Test Mission", flight: 1 }],
  };

  it("renders capsule details correctly", () => {
    const { getByText } = render(
      <ItemPopup mission={mockMission} onClose={() => {}} />
    );

    expect(getByText("Capsule Serial: C101")).toBeInTheDocument();
    expect(getByText("Capsule ID: 123")).toBeInTheDocument();
    expect(getByText("Number of capsule Landings: 1")).toBeInTheDocument();
    expect(getByText("Reuse Counts of Capsule: 1")).toBeInTheDocument();
    expect(getByText("Capsule Status: active")).toBeInTheDocument();
    expect(getByText("Capsule Type: Dragon 2.0")).toBeInTheDocument();
    expect(getByText("Capsule Details: Sample details")).toBeInTheDocument();
    expect(
      getByText("Launch Date & Time of capsule: 2021-01-01T00:00:00.000Z")
    ).toBeInTheDocument();
  });

  it("renders mission details correctly", () => {
    const { getByText } = render(
      <ItemPopup mission={mockMission} onClose={() => {}} />
    );

    expect(
      getByText("Mission 1: Name: Test Mission, Flight: 1")
    ).toBeInTheDocument();
  });

  it("renders 'No Missions' when there are no missions", () => {
    const missionWithoutMissions = { ...mockMission, missions: [] };
    const { getByText } = render(
      <ItemPopup mission={missionWithoutMissions} onClose={() => {}} />
    );

    expect(getByText("No Missions")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <ItemPopup mission={mockMission} onClose={onCloseMock} />
    );

    const closeButton = getByText("x");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});

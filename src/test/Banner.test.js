import React from "react";
import { render } from "@testing-library/react";
import Banner from "../components/Banner";

describe("Banner component", () => {
  it("renders SpaceX logo", () => {
    const { getByAltText } = render(<Banner />);
    const spacexLogo = getByAltText("SpaceX Logo");
    expect(spacexLogo).toBeInTheDocument();
  });

  it("renders company name", () => {
    const { getByText } = render(<Banner />);
    const companyName = getByText("Space Exploration Technologies Corp.");
    expect(companyName).toBeInTheDocument();
  });

  it("renders company description", () => {
    const { getByText } = render(<Banner />);
    const companyDescription = getByText(
      "SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft."
    );
    expect(companyDescription).toBeInTheDocument();
  });

  it("renders rocket capsule image", () => {
    const { getByAltText } = render(<Banner />);
    const rocketImage = getByAltText("Rocket Capsule");
    expect(rocketImage).toBeInTheDocument();
  });
});

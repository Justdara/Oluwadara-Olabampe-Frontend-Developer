import React from "react";
import spacexLogo from "../images/spacex-logo.png";
import spacexbg from "../images/rocket-bg1.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="content">
        <img src={spacexLogo} alt="SpaceX Logo" />
        <h1>Space Exploration Technologies Corp.</h1>
        <p>
          SpaceX designs, manufactures, and launches the world's most advanced
          rockets and spacecraft.
        </p>
      </div>
      <div className="rocket">
        <img src={spacexbg} alt="Rocket Capsule" />
      </div>
    </div>
  );
};

export default Banner;

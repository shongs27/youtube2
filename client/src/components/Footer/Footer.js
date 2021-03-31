import React from "react";
// import { Icon } from "antd";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // fontSize: "1rem",
      }}
    >
      <p style={{ paddingTop: "20px" }}>
        코딩은 즐겁게 !{" "}
        <i class="fab fa-apple" style={{ fontSize: "31px" }}></i>
      </p>
    </div>
  );
};

export default Footer;

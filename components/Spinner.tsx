import React from "react";

const Spinner: React.FC = () => (
  <div style={spinnerStyle}>
    <div style={spinnerDot}></div>
    <div style={spinnerDot}></div>
    <div style={spinnerDot}></div>
    <div style={spinnerDot}></div>
  </div>
);

const spinnerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const spinnerDot: React.CSSProperties = {
  width: "12px",
  height: "12px",
  margin: "0 5px",
  backgroundColor: "#333",
  borderRadius: "50%",
  animation: "spin 1.2s infinite ease-in-out",
};

export default Spinner;

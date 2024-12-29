import React from "react";

const Platforms = ({ title, image, description }) => {
  return (
    <div
      style={{
        width: "320px",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease-in-out", // Smooth transition for hover effect,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)"; // On hover: scale the card
        e.currentTarget.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)"; // On hover: stronger shadow
        e.currentTarget.style.backgroundColor = "#f9fafb"; // On hover: background color change
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)"; // Reset scale
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; // Reset shadow
        e.currentTarget.style.backgroundColor = "transparent"; // Reset background color
      }}
    >
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <img
          src={image}
          alt="Platform Logo"
          style={{
            width: "72px",
            height: "42px",
            borderRadius: "20%",
            objectFit: "cover",
            alignSelf: "center",
          }}
        />
        <h2 style={{ margin: "8px 0 0 0", textAlign: "center", fontSize: "18px", fontWeight: "600", color: "rgb(61, 78, 35)" }}>
          {title}
        </h2>
        <p style={{ color: "black", fontSize: "14px", lineHeight: "1.5",fontWeight: "550", textAlign: "center" }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default Platforms;

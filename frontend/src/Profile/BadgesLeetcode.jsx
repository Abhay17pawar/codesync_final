import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card"; // Import MUI Card component
import CardContent from "@mui/material/CardContent"; // Import MUI CardContent component
import Typography from "@mui/material/Typography"; // Import MUI Typography for text
import Grid from "@mui/material/Grid"; // Import MUI Grid component for responsive layout

function BadgeIcons() {
  const [badges, setBadges] = useState([]); // State to store the badges

  useEffect(() => {
    // Fetch the data from the API
    axios
      .get("https://alfa-leetcode-api.onrender.com/kunal0612/badges")
      .then((response) => {
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const filteredBadges = response.data.badges.filter((badge) =>
          !months.some((month) => badge.displayName.includes(month))
        );
        setBadges(filteredBadges); // Update the badges state with filtered data
      })
      .catch((error) => {
        console.error("Error fetching badges:", error);
      });
  }, []); // Run only once when the component mounts

  return (
    <div style={{ textAlign: "center", marginTop: "20px", translate: "130px -1050px" }}>
      {badges.length > 0 ? (
        <Card
          sx={{
            textAlign: "center",
            boxShadow: 3,
            borderRadius: 2,
            margin: "20px",
            padding: "20px",
            maxWidth: "1000px", // Set max width for the single card
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "100px" }}>
              Badges
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {badges.map((badge) => {
                // Hardcoded image URLs for specific badges
                let badgeImage = badge.icon;
                if (badge.displayName === "Guardian") {
                  badgeImage = "https://fastly.jsdelivr.net/gh/doocs/leetcode@main/images/Guardian.gif"; 
                }
                if (badge.displayName === "Knight") {
                  badgeImage = "https://fastly.jsdelivr.net/gh/doocs/leetcode@main/images/Knight.gif"; 
                }

                return (
                  <Grid item key={badge.id} xs={12} sm={6} md={4} lg={3}>
                    <div
                      style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={badgeImage}
                        alt={badge.displayName}
                        style={{
                          width: "60px",  // Decrease the image width
                          height: "60px", // Decrease the image height
                          objectFit: "contain",
                        }}
                      />
                      <Typography
                        variant="body2" // Use smaller font size
                        sx={{
                          marginTop: "10px",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        {badge.displayName}
                      </Typography>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <p>No badges available</p> // Show "No badges available" if no badges are found
      )}
    </div>
  );
}

export default BadgeIcons;

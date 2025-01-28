import { Box, Typography } from "@mui/material";
const NonDesktop = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          minHeight: "10%",
          width: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px 24px",
          backgroundColor: "#f8d7da",
          color: "#721c24",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="body1" fontSize="1.3rem">
          To ensure the best experience, please use desktops.
        </Typography>
      </Box>
    </Box>
  );
};

export default NonDesktop;

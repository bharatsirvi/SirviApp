import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
const drawerWidth = 240;
function Body() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: {
          sm: `calc(100% - ${drawerWidth}px)`,
          marginTop: "20px"
        }
      }}
    >
      <Outlet />
    </Box>
  );
}

export default Body;

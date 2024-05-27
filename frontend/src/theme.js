import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b28704",
      // main: "#5a98fc",

      light: "#63a4ff"
    },
    secondary: {
      main: "#dc004e", // Change this to your secondary color
      light: "#ff5c8d"
    },
    error: {
      main: "#f44336",
      light: "#e57373"
    },
    background: {
      default: "#fsfsfs"
    }
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#333"
        }
      }
    }
  }
});

export default theme;

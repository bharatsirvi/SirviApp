import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import store from "./store/index.js";
import { Provider } from "react-redux";
import theme from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import SirviApp from "./components/SirviApp.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoginAndSignUp from "./components/Loginandsignup.jsx";
import Profile from "./components/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/sirviApp",
    element: <SirviApp />,
    children: [
      {
        path: "/sirviApp",
        element: <Profile />
      },
      {
        path: "/sirviApp/profile",
        element: <Profile />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginAndSignUp />,
    children: [
      {
        path: "/login",
        element: <Login />
      }
    ]
  },
  {
    path: "/signup",
    element: <LoginAndSignUp />,
    children: [
      {
        path: "/signup",
        element: <SignUp />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider>
          <CssBaseline />
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);

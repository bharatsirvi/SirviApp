import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import LandingPage from "./components/LandingPage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const istoken = localStorage.getItem("token") !== "" ? true : false;

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (istoken) {
      navigate("/sirviApp");
    }
  }, [navigate]);

  return <>{!istoken && <LandingPage />}</>;
}

export default App;

//App.jsx:14 You should call navigate() in a React.useEffect(), not when your component is first rendered.

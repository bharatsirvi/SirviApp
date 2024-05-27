import Navbar from "./Navbar";
import { Box } from "@mui/material";
import Body from "./Body";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { userDataSliceAction } from "../store/userDataSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function SirviApp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const istoken = localStorage.getItem("token") !== "" ? true : false;
  const userId = localStorage.getItem("userId");

  const userData = useSelector((state) => state.userData.userInfo);
  console.log(
    ">>>>>>>>>>>>>>>>>>>>>....>>>>>>>>>>>>>..... DATA in USER SLICE .......................",
    userData
  );
  useEffect(() => {
    if (!istoken) {
      navigate("/");
      return;
    }
    if (istoken) {
      axios
        .get(`http://localhost:8080/user/${userId}`)
        .then((response) => {
          console.log(
            "................................responseof getby id.......................",
            response.data
          );
          dispatch(userDataSliceAction.setUser(response.data));

          axios
            .get(`http://localhost:8080/user/${userId}/profile_pic`, {
              responseType: "blob"
            })
            .then((response) => {
              const imageUrl = URL.createObjectURL(response.data);
              dispatch(userDataSliceAction.setProfilePic(imageUrl));
            })
            .catch((error) => {
              console.log("Failed to fetch user Image:", error);
            });
        })
        .catch((error) => {
          console.log("Failed to fetch user data:", error);
        });
    }
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar page="home" />
        <SideBar />
        <Body />
      </Box>
    </>
  );
}

export default SirviApp;

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
///////////////////////

function SignUp() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ defaultValues: { name: "", mobile: "", password: "" } });
  console.log(errors);

  const [authStart, setAuthStart] = useState(false);

  // const [errorMsg, setErrorMsg] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    setAuthStart(true);
    axios
      .post("http://localhost:8080/auth/signup", data)
      .then((response) => {
        console.log(response);
        enqueueSnackbar("SignUp Successfully Done .", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
        navigate("/login");
        setAuthStart(false);
      })
      .catch((err) => {
        console.log("err.response.data.message", err.response.data.message);

        enqueueSnackbar(err.response.data.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
        // setErrorMsg(err.response.data.message);
        setAuthStart(false);
      });
  };

  return (
    <>
      {/* {signupSuccess?  <Alert sx={{position:"absolute", top:"20px", maxWidth:"80%"}} variant="filled" severity="success">
    SignUp Successfully Done .
    </Alert>:null} */}

      <div className="form-container">
        <h1 className="form-heading">Create New Account</h1>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-section">
            <label htmlFor="name">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              id="name"
              type="text"
              placeholder="Your Name"
              className="input-field"
            />
            {errors.name ? (
              <p className="error-message">{errors.name.message}</p>
            ) : (
              <p className="error-message"></p>
            )}
          </div>

          <div className="input-section">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              {...register("mobile", {
                required: "Mobile no is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Mobile no must be 10 digits long"
                }
              })}
              id="mobile"
              type="tel"
              placeholder="Mobile Number"
              className="input-field"
            />
            {errors.mobile ? (
              <p className="error-message">{errors.mobile.message}</p>
            ) : (
              <p className="error-message"></p>
            )}
          </div>

          <div className="input-section">
            <label htmlFor="password">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters"
                }
              })}
              aria-invalid={errors.password ? "true" : "false"}
              id="password"
              type="password"
              placeholder="Password"
              className="input-field"
            />
            {errors.password ? (
              <p className="error-message">{errors.password.message}</p>
            ) : (
              <p className="error-message"></p>
            )}
          </div>
          {authStart ? (
            <Box sx={{ display: "flex" }} alignItems={"center"} gap={"20px"}>
              <Button
                sx={{ marginBottom: "5px" }}
                color="primary"
                type="submit"
                disabled
                variant="contained"
              >
                Sign Up
              </Button>
              <CircularProgress size="30px" />
            </Box>
          ) : (
            <Button
              sx={{ marginBottom: "5px" }}
              color="primary"
              type="submit"
              variant="contained"
            >
              Sign Up
            </Button>
          )}
        </form>
        <div style={{ color: "black", marginTop: "20px" }}>
          I already have an account. <Link to="/login">Log in</Link>
        </div>
      </div>
    </>
  );
}

export default SignUp;

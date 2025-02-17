import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Container,
  CssBaseline,
  CircularProgress,
  Avatar,
  IconButton,
  Stack,
  Grid,
  Paper,
  Autocomplete
  // CircularProgress
} from "@mui/material";
import axios from "axios";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { shallowEqual, useDispatch } from "react-redux";
import { userDataSliceAction } from "../store/userDataSlice";
import { useSelector } from "react-redux";
import { fetchStatusSliceAction } from "../store/fetchStatusSlice";
dayjs.extend(utc);
dayjs.extend(timezone);
const defaultValues = {
  name: "",
  father_name: "",
  dob: null,
  gender: "",
  mobile: "",
  email: "",
  gotra: ""
  // profile_pic: null
};

function UserForm() {
  const gotraOptions = [
    { label: "Rathore", value: "Rathore" },
    { label: "Solanki", value: "Solanki" },
    { label: "Gahlot", value: "Gahlot" },
    { label: "Panwar", value: "Panwar" },
    { label: "Kag", value: "Kag" },
    { label: "Barfa", value: "Barfa" },
    { label: "Devda", value: "Devda" },
    { label: "Choyal", value: "Choyal" },
    { label: "Bhyal", value: "Bhyal" },
    { label: "Sencha", value: "Sencha" },
    { label: "Aglecha", value: "Aglecha" },
    { label: "Parihar", value: "Parihar" },
    { label: "Hambad", value: "Hambad" },
    { label: "Sindhara", value: "Sindhara" },
    { label: "Chauhan", value: "Chauhan" },
    { label: "Khandala", value: "Khandala" },
    { label: "Satpura", value: "Satpura" },
    { label: "Mogrecha", value: "Mogrecha" },
    { label: "Padiyaria", value: "Padiyaria" },
    { label: "Lacheta", value: "Lacheta" },
    { label: "Chamaria", value: "Chamaria" },
    { label: "Bhumbaria", value: "Bhumbaria" },
    { label: "Muleva", value: "Muleva" },
    { label: "Septa", value: "Septa" }
  ];

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues
  });

  const userData = useSelector(
    (state) => state.userData.userInfo,
    shallowEqual
  );

  // const fetching = useSelector((state) => state.fetchStatus);

  // console.log("fetching", fetching);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (token) {
      reset({
        ...userData,
        dob: dayjs(userData.dob),
        gotra: { label: userData.gotra, value: userData.gotra }
      });
    } else if (!token) {
      navigate(`/login`);
    }
  }, [token, userData]);

  const onSubmit = async (data) => {
    console.log("submit data");
    dispatch(fetchStatusSliceAction.setFetching(true));
    try {
      const response = await axios.put(
        `http://localhost:8080/user/${userId}`,
        data
        // {
        //   headers: {
        //     Authorization: "Bearer YOUR_ACCESS_TOKEN",
        //     "Content-Type": "application/json"
        //   }
        // }
      );
      console.log("put request response", response.data);
      dispatch(
        userDataSliceAction.setUser({
          ...response.data,
          gotra: data.gotra.value
        })
      );
      reset(data);
      dispatch(fetchStatusSliceAction.setFetching(false));
      navigate(`/sirviApp`);
    } catch (err) {
      enqueueSnackbar(err.response.data.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        }
      });
      dispatch(fetchStatusSliceAction.setFetching(false));
    }
  };

  const handleProfilePicChange = async (e) => {
    dispatch(fetchStatusSliceAction.setFetching(true));

    const profileImage = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const profilePicBase64 = reader.result.split(",")[1];
      try {
        const response = await axios.put(
          `http://localhost:8080/user/${userId}/profile_pic`,
          {
            profile_pic: profilePicBase64
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        if (response.status === 200) {
          dispatch(userDataSliceAction.setProfilePic(reader.result));
        } else {
          console.error("Failed to update profile picture");
        }
        dispatch(fetchStatusSliceAction.setFetching(false));
      } catch (error) {
        console.error("An error occurred:", error);
        dispatch(fetchStatusSliceAction.setFetching(false));
      }
    };
    reader.readAsDataURL(profileImage);
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative"
        }}
      >
        {/* {fetching && (
          <div
            style={{
              position: "absolute",
              // top: 0,
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // left: 0,
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              zIndex: 1000,
              width: "100%"
            }}
          >
            <CircularProgress />
          </div>
        )} */}
        <Typography component="h1" variant="h5" fontWeight="500" sx={{ mb: 1 }}>
          Update Details
        </Typography>
        <Grid container spacing={5} justifyContent="center">
          <Grid item sm={12} md={6}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <Controller
                name="father_name"
                control={control}
                rules={{ required: "Father's Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Father's Name"
                    error={!!errors.father_name}
                    size="small"
                    helperText={errors.father_name?.message}
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <Controller
                name="dob"
                control={control}
                rules={{ required: "Date of Birth is required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Date of Birth"
                    timezone="UTC"
                    clearable
                    sx={{ width: "100%" }}
                    // inputFormat="DD/MM/yyyy"
                    format="DD/MM/YYYY"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!errors.dob}
                        helperText={errors.dob?.message}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    )}
                  />
                )}
              />
              <FormControl component="fieldset" margin="normal">
                <FormLabel sx={{ marginBottom: "0px" }} component="legend">
                  Gender
                </FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.gender && (
                  <Typography color="error">{errors.gender.message}</Typography>
                )}
              </FormControl>
              <Controller
                name="mobile"
                control={control}
                rules={{
                  required: "Mobile number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Mobile number must be 10 digits"
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Mobile Number"
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Enter a valid email"
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <Controller
                name="gotra"
                control={control}
                rules={{ required: "Gotra is required" }}
                render={({ field }) => {
                  return (
                    <Autocomplete
                      {...field}
                      options={gotraOptions}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      getOptionLabel={(option) => option.label || ""}
                      value={field.value}
                      onChange={(_, value) => field.onChange(value)}
                      renderInput={(field) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Gotra"
                          error={!!errors.gotra}
                          helperText={errors.gotra?.message}
                          size="small"
                          sx={{ mb: 2 }}
                        />
                      )}
                    />
                  );
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2
                }}
              >
                Update{" "}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={10} md={6}>
            <Paper
              elevation={3}
              sx={{ p: 2, textAlign: "center", backgroundColor: "#f5f5f5" }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Profile Picture
              </Typography>
              <Stack direction="column" alignItems="center" spacing={2}>
                <Avatar
                  alt="Profile Picture"
                  src={userData.profile_pic}
                  sx={{
                    width: 150,
                    height: 150,
                    border: "4px solid #b28704"
                    // background: "primary"
                  }}
                >
                  {" "}
                </Avatar>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#abcafc", // Change the background color on hover
                        color: "black" // Change the text color on hover
                      }
                    }}
                  >
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                      style={{
                        display: "none"
                      }}
                    />
                  </Button>
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={handleProfilePicChange}
                    hidden
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera fontSize="large" />
                    </IconButton>
                  </label>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default UserForm;

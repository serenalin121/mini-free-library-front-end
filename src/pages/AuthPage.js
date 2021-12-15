import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { signinUser, signupUser } from "../store/userSlice";
import { signinAdmin, signupAdmin } from "../store/adminSlice";
import { renewUser } from "../store/userSlice";

import image from "../images/landing-image.jpeg";
import theme from "../theme";

export default function SignInSide() {
  const [isExistUser, setIsExistUser] = useState(true);
  const [isAdminLogin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const isUser = useSelector((state) => state.user.isUser);
  const isAdmin = useSelector((state) => state.admin.isAdmin);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isExistUser && !isAdminLogin) {
      dispatch(signinUser({ email, password }));
    }

    if (!isExistUser && !isAdminLogin) {
      dispatch(signupUser({ email, password }));
    }

    if (isExistUser && isAdminLogin) {
      dispatch(signinAdmin({ email, password }));
    }

    if (!isExistUser && isAdminLogin) {
      dispatch(signupAdmin({ email, password }));
    }

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (isUser) {
      navigate("/library", { replace: true });
    }

    if (isAdmin) {
      navigate("/myLibrary", { replace: true });
    }
  });

  useEffect(() => {
    dispatch(renewUser());
  }, [dispatch]);

  const toggleSignInHandler = () => {
    setIsExistUser(!isExistUser);
  };

  const toggleAdminHandler = () => {
    setIsAdmin(!isAdminLogin);
  };

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isExistUser ? `Sign In` : `Sign Up`}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={changeEmailHandler}
                value={email}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={changePasswordHandler}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1, bgcolor: "primary.main" }}
              >
                {isExistUser ? `Sign In` : `Sign Up`}
              </Button>
            </Box>
            <form
              className="MuiBox-root css-164r41r"
              noValidate
              action={`${process.env.REACT_APP_BASEURL}/auth/google/${
                isAdminLogin ? "admin" : "user"
              }`}
              style={{ width: "57%" }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, bgcolor: "primary.main" }}
              >
                <span className="google-button__icon">
                  <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
                      id="Shape"
                      fill="#EA4335"
                    />
                    <path
                      d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
                      id="Shape"
                      fill="#FBBC05"
                    />
                    <path
                      d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
                      id="Shape"
                      fill="#4285F4"
                    />
                    <path
                      d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
                      fill="#34A853"
                    />
                  </svg>
                </span>
                <span>sign in with Google</span>
              </Button>
            </form>
            <Grid container>
              <Grid item xs={6}>
                <Link href="#" variant="body2" onClick={toggleAdminHandler}>
                  {isAdminLogin ? "Want to Borrow a Book?" : "A Library Owner?"}
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link href="#" variant="body2" onClick={toggleSignInHandler}>
                  {isExistUser ? "Sign Up" : "Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

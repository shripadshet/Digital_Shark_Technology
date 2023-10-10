import React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";

function Navbar() {
  const navigate = useNavigate();

  function handleClickLogIn() {
    navigate("/login");
  }
  function handleClickRegister() {
    navigate("/register");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid lg={12} item container spacing={2}>
            <Grid item lg={3} sm={6} xs={12}>
              <h1>DST</h1>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <LoginIcon />
              <h1>
                <Button color="inherit" onClick={handleClickLogIn} size="large">
                  {" "}
                  Login{" "}
                </Button>
              </h1>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}></Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <HowToRegRoundedIcon />
              <h1>
                <Button
                  color="inherit"
                  onClick={handleClickRegister}
                  size="large"
                >
                  {" "}
                  Register{" "}
                </Button>
              </h1>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SideBar from "./SideBar";
import { Grid } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect } from "react";

function Header(props) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("mytoken");
    navigate("/");
  };
  const filteredArray = props.filtered;
  useEffect(()=>{

  },[filteredArray])
 
  return (
    <>
      <AppBar position="static"  sx={{ backgroundColor: "green" }}>
        
  
          <Grid sx={{display:"flex", justifyContent:"space-around"}}>
        <Grid>  <SideBar filtered={filteredArray}> </SideBar></Grid>
         <Grid  sx={{marginTop:2}}><AccountCircleIcon/><br/>{filteredArray[0]?.firstName}</Grid>
        <Grid>  <LogoutIcon onClick={logout} sx={{marginTop:1}}></LogoutIcon> LogOut</Grid>
           
       
            </Grid>
      </AppBar>
    </>
  );
}
export default Header;

import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
import "../App.css";
import Service from "../Services/Service";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button } from "@mui/material";
import { filteredRole } from "../Config/Constant";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function Home(props) {
  const [userData, setUserData] = useState([]);
  const [enteredAge, setEnteredAge] = useState(0);
  const [selectedRole, setSelectedRole] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getUserDetails = () => {
    Service.getUserData().then((res) => {
      setUserData(res.users);
    });
  };
  const searchHandle = async (event) => {
    let key = event.target.value;
    Service.searchData(key).then((res) => setUserData(res?.data));
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  const filtered = userData?.filter((item) => {
    return item.email === props.userMail;
  });

  const handleChangeFilter = () => {
    const filterVal = {
      age: enteredAge,
      role: selectedRole,
    };
    Service.filterData(filterVal).then((res) => {
      setUserData(res?.data);
    });
    setOpen(false)
  };

  const handleReset = () => {
    setEnteredAge(0);
    setSelectedRole("");
    getUserDetails();
  };

  return (
    <>
      <Header filtered={filtered}></Header>
      <div >
      <input
        type="search"
        className="search-product-box"
        placeholder="Search User"
        onChange={searchHandle}
      />
      <Button onClick={handleClickOpen}>
        {" "}
        Filter <FilterAltIcon />
      </Button>
      </div>
       <div>
       
      <BootstrapDialog
      sx={{display:"flex" ,justifyContent:"flex-end",marginBottom:45}}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
      
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
          <label>Select Role</label>
          <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option>select </option>
              {filteredRole.map((val, i) => {
                return (
                  <>
                    <option key={i} value={val}>
                      {val}
                    </option>
                  </>
                );
              })}
            </select>
          </Typography>
          <Typography gutterBottom>
          <label>Enter max age:</label>
            <input
              type="number"
              placeholder="Enter max Value"
              value={enteredAge}
              onChange={(e) => setEnteredAge(e.target.value)}
            />
          <Button onClick={handleChangeFilter}>Apply</Button>
          <Button onClick={handleReset}>Cancel</Button>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
      <table className="table-container">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((row, i) => (
            <tr key={i}>
              <td>{row?.firstName}</td>
              <td>{row?.lastName}</td>
              <td>{row?.email}</td>
              <td>{row?.age}</td>
              <td>{row?.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Home;

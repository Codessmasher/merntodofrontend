import React, { useState } from 'react';
import "./Header.scss";
import { Grid, Button, Modal, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SignupModal from './signupModal';
import SigninModal from './signinModal'; 

const Header = () => { 
  const token = localStorage.getItem("jwttoken"); 
  
  const [issignupModalOpen, setIssignupModalOpen] = useState(false);
  const [issigninModalOpen, setIssigninModalOpen] = useState(false);

  const handleOpen = () => {
    setIssignupModalOpen(true); // Set the state to true to open the modal
  }

  const handleClose = () => {
    setIssignupModalOpen(false); // Set the state to false to close the modal
  }

  const handleOpensignin = () => {
    setIssigninModalOpen(true); // Set the state to true to open the modal
  }

  const handleClosesignin = () => {
    setIssigninModalOpen(false); // Set the state to false to close the modal
  }
  const handleLogout = () => {
    localStorage.removeItem("jwttoken"); // logout
    window.location.reload();//temp solution
  }

  return (
    <>
      <div>
        <Grid container spacing={2} style={{ background: "#000", padding: "1rem" }}>
          {!token && <Grid item>
            <Button startIcon={<PersonIcon />} variant="outlined" color="info" onClick={handleOpensignin}>
              Sign In
            </Button>
          </Grid>}
          {!token &&
            <Grid item>

              <Button startIcon={<LoginIcon />} variant="contained" color="success" onClick={handleOpen}>
                Signup
              </Button>
            </Grid>
          }
          {
            token && <Button startIcon={<LogoutIcon />} variant="contained" color="success" onClick={handleLogout}>
            Logout
          </Button>
          }
        </Grid>

        <SignupModal open={issignupModalOpen} handleOpen={handleOpen} handleClose={handleClose} />
        <SigninModal open={issigninModalOpen} handleOpen={handleOpensignin} handleClose={handleClosesignin} />
      </div>
    </>
  );
};

export default Header;

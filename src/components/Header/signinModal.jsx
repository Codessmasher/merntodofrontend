// SigninModal.jsx

import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent'; 
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SigninModal = ({ open, handleOpen, handleClose, updateToken }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const signindata = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill out all the fields");
      return;
    }

    axios.post("http://127.0.0.1:5000/api/users/signin", formData)
      .then((res) => {
        toast.success(res.data.message);
        localStorage.setItem("jwttoken", res.data.jwt);
        setFormData({
          email: "",
          password: "",
        });
        updateToken(localStorage.getItem("jwttoken"));
        handleClose();
      })
      .catch((e) => toast.error(e.response.data.error));
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="email"
            label="Enter Email"
            type="email"
            fullWidth
            variant="standard"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            name="password"
            label="Enter Password"
            type="password"
            fullWidth
            variant="standard"
            value={formData.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={signindata}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SigninModal;

import React, { useState } from 'react'; 
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent'; 
import DialogTitle from '@mui/material/DialogTitle'; 
// react toastify popup
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupModal({ open, handleOpen, handleClose }) {
  const [formData, setFormData] = useState({
    name: '',
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

  const signupdata = (e) => {
    e.preventDefault();

    // Check if the required fields are not empty
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill out all the fields"); 
      return;
    }

    // Send the form data to the Express server
    axios.post("https://merntodofrontend-rosy.vercel.app/api/users/signup",formData) 
      .then((res) => {
        // Handle the response from the server, if needed
        // if(!isEmail(formData.email)){
        //   toast.error("Invalid email");
        //   return;
        // } 
        toast.success(res.data.message);
        // Clear the form fields after successful submission
        setFormData({
          name: "",
          email: "",
          password: "",
        })
        
        handleClose();
        // Close the modal after successful submission
      }).catch((e)=>toast.error(e.response.data.error))
  };

  return (
    <div> 
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent> 
          <TextField
            autoFocus 
            name="name"
            label="Enter Name"
            type="text"
            fullWidth
            variant="standard"
            value={formData.name}
            onChange={handleChange}
          />
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
          <Button onClick={signupdata}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* show toast popup */}
      <ToastContainer position='bottom-right'/>

    </div>
  );
}

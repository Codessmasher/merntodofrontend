import React, { useState } from 'react';
import "./ToDo.scss";
import AllToDos from '../AllToDos/AllToDos'; 
import axios from 'axios'; 
import { Grid, Button, TextField } from '@mui/material'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const ToDo = () => {
  const [toDo, setToDo] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setToDo((prevFormData) => ({
      ...prevFormData,
      [name]: value, 
      date: new Date().toLocaleDateString()
    }));
  };

  const submitTodo = (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("jwttoken");

    if (!token) {
      toast.error("Login First");
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    axios.post("http://127.0.0.1:5000/api/users/addtodo", toDo, config)
      .then((res) => {
        toast.success(res.data.message); 
      })
      .catch((error) => {
        toast.error(`An error occurred ${error}`);   
      });
  };

  return (
    <Grid container direction="column" style={{ padding: "1rem", alignItems: "center", justifyContent: "center" }} className='todobg'>
      <Grid item>
        <h1 style={{ color: "#fff" }}>Add New ToDo</h1>
      </Grid>
      <Grid item marginTop={"1rem"}>
        <TextField label="Your Important Works" variant="filled" focused color="warning" name="todo" onChange={handleChange}/>
        <br />
        <Button variant="outlined" color="warning" style={{ marginTop: "8px" }} onClick={submitTodo}>+</Button>
      </Grid>
      <Grid item>
        <AllToDos />
      </Grid>
      {/* show toast popup */}
      <ToastContainer position='bottom-right'/>
    </Grid>
  );
}

export default ToDo;

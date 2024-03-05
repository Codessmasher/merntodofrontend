import React, { useState, useEffect } from 'react';
import "./ToDo.scss";
import AllToDos from '../AllToDos/AllToDos'; 
import axios from 'axios'; 
import { Grid, Button, TextField } from '@mui/material'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    fetchTodos(); // Fetch todos on initial render
  }, []);

  const fetchTodos = () => {
    // Fetch todos from API
    axios.get("https://merntodofrontend-rosy.vercel.app/api/users/alltodos")
      .then((res) => { 
        setTodos(res.data.todos); // Update todos state with fetched todos
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  };

  const handleChange = (e) => {
    setTodoInput(e.target.value); // Update todo input value
  };

  const submitTodo = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwttoken");

    if (!token) {
      toast.error("Login First");
      return;
    }

    const newTodo = {
      todo: todoInput,
      date: new Date().toLocaleDateString()
    };

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    axios.post("https://merntodofrontend-rosy.vercel.app/api/users/addtodo", newTodo, config)
      .then((res) => { 
        fetchTodos(); // Fetch updated todos after adding new todo 
        setTodoInput(''); // Clear todo input after submission
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
        <TextField label="Your Important Works" variant="filled" focused color="warning" value={todoInput} onChange={handleChange}/>
        <br />
        <Button variant="outlined" color="warning" style={{ marginTop: "8px" }} onClick={submitTodo}>+</Button>
      </Grid>
      <Grid item>
        <AllToDos/>
      </Grid>
      {/* show toast popup */}
      <ToastContainer position='bottom-right'/>
    </Grid>
  );
}

export default ToDo;

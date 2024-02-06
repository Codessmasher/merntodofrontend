import React, { useState,useEffect } from 'react';
import "./AllToDos.scss";
import { Grid, Button, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh'; 
import axios from 'axios'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 


const token=localStorage.getItem('jwttoken');
// console.log(token)
const AllToDos = () => {
    const [load, setLoad] = useState();
    const [isloading, setLoading] = useState(-1);
    useEffect(() => {
        loadtodos();
      }, []);
    const loadtodos = () => {
    setLoading(1); 
    axios.get("https://merntodofrontend-rosy.vercel.app/api/users/loadtodo", {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header with the token
      },
    })
      .then((res) => { 
        setLoad(res.data.todos);
        setLoading(0);
      })
      .catch((error) => {
        toast.error(`You don't have any todo`);    
        console.log(error)
      });
    }

    return (
        <Grid container direction="column" style={{ padding: "1rem", alignItems: "center", justifyContent: "center" }} className='AllToDosbg'>
            <Grid item>
                <ul>
                    {isloading === 0 && load.map((l,k) => {
                        return <li key={k} style={{ color: "#fff" }}>
                            <h1>{l.todo}</h1>
                        </li>  
                    })} 
                </ul>
                {/* {isloading === -1 && <Button startIcon={<RefreshIcon />} variant="outlined" color="info" onClick={loadtodos}>
                        Load ToDos
                    </Button>
                } */}
                {/* {isloading === 1 &&
                    <Button startIcon={<RefreshIcon style={{ animation: "rotateAnimation 1s infinite" }} />} variant="outlined" color="info" onClick={loadtodos}>
                        Loading...
                    </Button>
                } 
                {isloading === 0 && (
                    <Button startIcon={<RefreshIcon />} variant="outlined" color="info" onClick={loadtodos}>
                        Load ToDos Again
                    </Button>
                )} */}
            </Grid>
        </Grid>
    );
}

export default AllToDos;

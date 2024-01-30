import React from 'react'
import load from "../../assets/images/spin.gif"
import { Grid, Button, TextField } from '@mui/material';

const Loader = () => {
  return (
    <Button>
        <img src={load} width="19px" />
    </Button> 
  )
}

export default Loader
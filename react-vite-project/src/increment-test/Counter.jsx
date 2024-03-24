import React,{ useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Counter.css'
import Button from '@mui/material/Button';
import { Box, Stack } from '@mui/material';

const Counter = () => {

// State variable to hold the count value
const [count, setCount] = useState(0);

const notify = () => {
    toast.success("Cleared", { autoClose: 2000 });
  };

// Function to handle incrementing the count
  function handleIncrement() {
    setCount(count + 1);
  }

// Function to handle decrementing the count
const handleDecrement = () => {
    if(count > 0){
        setCount(count - 1);
    }
};

// Function to handle clear the count
const handleClear = () => {
    setCount(0);
    notify()
  };

  return (
    <>
     <p>React Increment and Decrement Example</p>
     <p> Counter: {count}</p>
      <Stack direction="row" spacing={2}>
      <Button variant="contained" size="medium" color="success" onClick={handleIncrement}>
        Increment
      </Button>
      <Button variant="contained" size="medium" onClick={handleDecrement}>
        Decrement
      </Button>
      <Button variant="outlined" size="medium" color="error" onClick={handleClear}>
        Clear
      </Button>
      </Stack>
    </>
  )
}

export default Counter
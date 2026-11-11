import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button/Button";
import { increment, decrement, reset, incrementByAmount } from "../../store/slices/CounterSlice";
import { toast } from "react-toastify";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();

  const handleIncrement = useCallback(() => {
    dispatch(increment());
    toast.success("Incremented successfully!");
  }, [dispatch]);

  const handleDecrement = useCallback(() => {
    dispatch(decrement());
    toast.error("Decrement failed!");
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(reset());
    toast.info("Counter reset to zero.");
  }, [dispatch]);

  const handleIncrementByAmount = useCallback(() => {
    console.log("Increment by amount clicked", count);
    dispatch(incrementByAmount(count));
    toast.warning(`Incremented by ${count} successfully!`);
  }, [count,dispatch]);

  return (
    <div>
      Counter : {count}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <Button onClick={handleIncrement}>
          Increment
        </Button>
        <Button onClick={handleDecrement}>
          Decrement
        </Button>
        <Button onClick={handleIncrementByAmount}>
          Increment by 5
        </Button>
        <Button onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Counter;

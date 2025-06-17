import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { Container, Typography } from "@mui/material";
import AddHabits from "./components/AddHabits";
import HabitList from "./components/HabitList";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" align="center">
          Habit Tracker
          <AddHabits />
          <HabitList />
        </Typography>
      </Container>
    </Provider>
  );
}

export default App;

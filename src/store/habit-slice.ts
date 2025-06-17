import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  completedDates: string[];
  frequency: string;
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
  name: "habit",
  initialState: {
    ...initialState,
  },
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newHabit: Habit = {
        id: new Date().toISOString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        createdAt: new Date().toISOString(),
        completedDates: [],
      };
      state.habits.push(newHabit);
    },

    toggleHabbit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);
      if (habit) {
        const dateIndex = habit.completedDates.indexOf(action.payload.date);
        if (dateIndex > -1) {
          // If date exists, remove it
          habit.completedDates.splice(dateIndex, 1);
        } else {
          // If date does not exist, add it
          habit.completedDates.push(action.payload.date);
        }
      }
    },

    removeHabbit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
    },
  },
});

export const { addHabit, toggleHabbit, removeHabbit } = habitSlice.actions;
export default habitSlice.reducer;

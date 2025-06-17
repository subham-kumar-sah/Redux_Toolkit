import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { CheckCircle, Delete } from "@mui/icons-material";
import { removeHabbit, toggleHabbit, type Habit } from "../store/habit-slice";
const HabitList = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();
  const getStreak = (habit: Habit) => {
    const today = new Date();

    let streak = 0;
    while (true) {
      const dateString = today.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateString)) {
        streak++;
        today.setDate(today.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habits.map((habit) => {
        return (
          <Paper key={habit.id} elevation={2} sx={{ padding: 2 }}>
            <Grid alignItems="center" container>
              <Grid>
                <Typography variant="h6">{habit.name}</Typography>
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {habit.frequency}
                </Typography>
              </Grid>
              <Grid>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    color={
                      habit.completedDates.includes(
                        new Date().toISOString().split("T")[0]
                      )
                        ? "success"
                        : "primary"
                    }
                    startIcon={<CheckCircle />}
                    onClick={() =>
                      dispatch(
                        toggleHabbit({
                          id: habit.id,
                          date: new Date().toISOString().split("T")[0],
                        })
                      )
                    }
                  >
                    {habit.completedDates.includes(
                      new Date().toISOString().split("T")[0]
                    )
                      ? "Completed"
                      : "Mark Completed"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => dispatch(removeHabbit(habit.id))}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Current Streak: {getStreak(habit)} days
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(getStreak(habit) / 30) * 100}
            ></LinearProgress>
          </Paper>
        );
      })}
    </Box>
  );
};
export default HabitList;

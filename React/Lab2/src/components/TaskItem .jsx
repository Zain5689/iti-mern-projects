import React, { useState } from "react";
import {
  ListItem,
  Checkbox,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskItem = ({ taskName }) => {
  const [completed, setCompleted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Paper
      elevation={2}
      sx={{
        mb: 2,
        px: 2,
        py: 1,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: completed ? "#f0fdf4" : "#fff",
        transition: "all 0.3s ease",
      }}
    >
      <ListItem disableGutters>
        <Checkbox
          checked={completed}
          onChange={() => setCompleted(!completed)}
          color="success"
        />
        <Typography
          variant="body1"
          sx={{
            textDecoration: completed ? "line-through" : "none",
            color: completed ? "gray" : "black",
            fontWeight: completed ? 400 : 500,
          }}
        >
          {taskName}
        </Typography>
      </ListItem>
      <IconButton edge="end" color="error" onClick={() => setIsVisible(false)}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default TaskItem;

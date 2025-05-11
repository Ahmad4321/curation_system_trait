// src/components/ActionPanel.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const ActionPanel = () => {
  const [comments] = useState([
    {
      id: 1,
      text: "This trait needs verification",
      author: "Researcher A",
      date: "2023-05-15",
    },
    {
      id: 2,
      text: "Related to drought resistance",
      author: "Researcher B",
      date: "2023-05-16",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Actions
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">Existing Comments</Typography>
        <List dense>
          {comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText
                primary={`${comment.id}- ${comment.text} -${comment.author}-${comment.date}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">New Comments</Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          variant="outlined"
          placeholder="Add your comment here..."
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">Actions</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <FormControlLabel control={<Checkbox />} label="Add" />
          <FormControlLabel control={<Checkbox />} label="Merge" />
          <FormControlLabel control={<Checkbox />} label="Remain" />
          <FormControlLabel control={<Checkbox />} label="Remove" />
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle1">Reasons</Typography>
        <TextField
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          placeholder="Enter your reasons here..."
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ActionPanel;

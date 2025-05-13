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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";

const ActionPanel = ({data,isLogged,trait}) => {
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

  // Sample dynamic options for the dropdown
  const [options] = useState([
    { id: "opt1", name: "Trait Option 1" },
    { id: "opt2", name: "Trait Option 2" },
    { id: "opt3", name: "Trait Option 3" },
    { id: "opt4", name: "Trait Option 4" },
  ]);

  const [newComment, setNewComment] = useState("");
  const [action, setAction] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Actions
      </Typography>

      {/* multiple data */}

      {/* <Box sx={{ mb: 3 }}>
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
      </Box> */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">Existing Comments</Typography>
        <List dense>
          {/* evaluation */}
          
        </List>
        {trait ? trait.evaluation : ""}
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

      {
      (isLogged=== true) && (

      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Actions</FormLabel>
          <RadioGroup
            row
            value={action}
            onChange={(e) => setAction(e.target.value)}
          >
            <FormControlLabel value="add" control={<Radio />} label="Add" />
            <FormControlLabel value="merge" control={<Radio />} label="Merge" />
            <FormControlLabel value="remain" control={<Radio />} label="Remain" />
            <FormControlLabel value="remove" control={<Radio />} label="Remove" />
          </RadioGroup>
        </FormControl>

        {(action === "add" || action === "merge") && (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <Select
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Search' }}
              >
                <MenuItem value="" disabled>
                  Search and select...
                </MenuItem>
                {data.map((option,index) => (
                  <MenuItem key={index} value={index}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      </Box>
)}

      <Button variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
};

export default ActionPanel;
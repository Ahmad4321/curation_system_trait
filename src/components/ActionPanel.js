// src/components/ActionPanel.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  TableContainer,
  Backdrop,
  CircularProgress,
} from "@mui/material";

const ActionPanel = ({
  data,
  isLogged,
  trait,
  userData,
  searchquery,
  onEvaluationValue,
}) => {

  const [newComment, setNewComment] = useState("");
  const [action, setAction] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const [evaluationValue, setEvaluationValue] = useState("");

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (userData?.username) {
      setUsername(userData.username);
    } else {
      setUsername("");
    }
  }, [userData]);

  useEffect(() => {
    if (onEvaluationValue && onEvaluationValue.data) {
      setEvaluationValue(onEvaluationValue.data);
    } else {
      setEvaluationValue([]);
    }
  }, [onEvaluationValue]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!trait) {
  //       setLoading(false);
  //       return;
  //     }
  //     setLoading(true);
  //     try {
  //       const res = await fetch('http://127.0.0.1:8000/api/fetch_trait_evalutation/', {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({"trait_id":trait ? trait.id : ""}),
  //       });
  //       if (res.ok) {
  //         const data = await res.json();
  //         setEvaluationValue(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  const handleSubmit = async () => {
    if (!newComment || !username) {
      setMsg("❌ Please fill in all fields.");
      return;
    }

    const payload = {
      expert_name: userData?.username || username || "",
      user: userData ? userData : null,
      trait: trait,
      function: action,
      comment: newComment,
      searchTerm: searchTerm,
    };

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/save_action_evaluation/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("Response data:", data);
        setMsg("✅" + data.msg);
        setEvaluationValue((prev) => [...prev, data.evaluation]);
        setNewComment("");
        setAction("");
        setSearchTerm("");
        isLogged ? setUsername(username) : setUsername("");
      } else {
        setMsg(data.error || "❌ Submission failed.");
      }
    } catch (err) {
      setMsg("❌ Error connecting to server.");
    }
  };

  return (
    <>
      {/* 🔄 Full-screen loader */}
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}

      <Box>
        <Typography variant="h6" gutterBottom>
          Comments and Action Panel
        </Typography>

        {trait && trait.evaluations && (
          <Typography variant="h6" gutterBottom>
            Select trait :{trait.name}
          </Typography>
        )}

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
        {/* <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">Existing Comments</Typography>
        {trait ? trait.evaluation : ""}
      </Box> */}

        <Box sx={{ mb: 3 }}>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 300, // Set vertical height
              overflowY: "auto", // Enable scroll
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>comment</TableCell>
                  <TableCell>Expert</TableCell>
                  <TableCell>DateTime</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {evaluationValue
                  ? evaluationValue.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.evaluation}</TableCell>
                        <TableCell>{row.expert_name}</TableCell>
                        <TableCell>{row.created_at}</TableCell>
                      </TableRow>
                    ))
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box gap={2} sx={{ mb: 3 }}>
          <Typography variant="subtitle1">New Comments</Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              setMsg("");
            }}
            variant="outlined"
            placeholder="Add your comment here..."
          />
          <Box sx={{ mb: 3 }} display="flex" paddingTop={2}>
            <TextField
              label="Expert Name"
              size="small"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setMsg("");
              }}
              disabled={!!userData?.username}
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>

        {isLogged === true && (
          <Box sx={{ mb: 3 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Fucntions</FormLabel>
              <RadioGroup
                row
                value={action}
                onChange={(e) => setAction(e.target.value)}
              >
                <FormControlLabel value="add" control={<Radio />} label="Add" />
                <FormControlLabel
                  value="merge"
                  control={<Radio />}
                  label="Merge"
                />
                <FormControlLabel
                  value="remain"
                  control={<Radio />}
                  label="Remain"
                />
                <FormControlLabel
                  value="remove"
                  control={<Radio />}
                  label="Remove"
                />
              </RadioGroup>
            </FormControl>

            {/* Might be used in future but no no need
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
        )} */}
          </Box>
        )}
        <Typography variant="body2" color="error">
          {msg}
        </Typography>
        <Box display="flex" alignItems="center" paddingTop={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Save Evaluation
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ActionPanel;

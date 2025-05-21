import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import SearchSection from "./components/SearchSection";
import TraitHierarchy from "./components/TraitHierarchy";
import ActionPanel from "./components/ActionPanel";
import EvidenceAccordion from "./components/EvidenceAccordion";
import searchdata from "./assets/OutputSearch.json";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  // define trait data
  const [traitData, setTraitData] = useState(null);
  const [evaluationValue, setEvaluationValue] = useState(null);

  const [setSelectedNodeId] = useState(null);
  // set Searchbox data
  const [searchinital, setSearchinital] = useState(null);
  // set loading state
  const [loading, setLoading] = useState(true);

  const [searchResult, setSearchResult] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login
  const [openLogin, setOpenLogin] = useState(false); // Dialog open state
  const [username, setUsername] = useState(""); // Username state
  const [password, setPassword] = useState(""); // Password state
  const [msg, setMsg] = useState("");
  const [userData, setUserData] = useState(null); // User data state

  const handleLoginOpen = () => setOpenLogin(true);
  const handleLoginClose = () => setOpenLogin(false);
  const [selectedTrait, setSelectedTrait] = useState(null);

  const handleLoginSubmit = async () => {
    setLoading(true);
    try {
      // For simplicity, assuming any non-empty username and password is valid
      if (username && password) {
        const res = await fetch("http://127.0.0.1:8000/api/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username, password: password }),
        });
        const data = await res.json();
        if (res.ok) {
          setMsg("login successful!");
          //  data into state
          setUserData(data.user);

          // set empty username and password fields
          setUsername("");
          setPassword("");

          // Close the login dialog
          setIsLoggedIn(true);
          setOpenLogin(false);
        } else {
          if (res.status === 401) setMsg("Invalid credentials");
          else if (res.status === 403) setMsg("Permission denied");
          else if (res.status === 404) setMsg("User not found");
        }
      }
    } catch (error) {
      // console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    // Perform logout logic here
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setUserData(null);
        setIsLoggedIn(false);
        setMsg("");
      }
    } catch (error) {
      // console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };
  // const handleTraitSelect = (trait) => {
  //   setSelectedTrait(trait);
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/get_data_json/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          setTraitData(data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/curation_system_trait/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setSearchinital(data);
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  //  background image

  

  return (
    <>
      {/* 🔄 Full-screen loader */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <Header />
        {/* Login/Sign-out Button */}
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={isLoggedIn ? handleLogout : handleLoginOpen}
          >
            {isLoggedIn ? "Sign Out" : "Sign In"}
          </Button>
        </Box>
        <Divider textAlign="center"></Divider>
        <>
          <SearchSection onSearchSubmit={setSearchResult} data={searchinital} />

          <Grid container spacing={3} sx={{ mt: 2,paddingBottom:12 }} className="grid-container">
            <Grid item size={6} >
              <Paper elevation={2} sx={{ p: 2, height: "500px", overflowY: "auto" }}>
                <TraitHierarchy
                  searchResult={searchResult}
                  data={traitData}
                  onTraitSelect={setSelectedTrait}
                  setSelectedNodeId={setSelectedNodeId}
                  onEvaluationValue={setEvaluationValue}
                />
              </Paper>
            </Grid>
            <Grid item size={6}>
              <Paper elevation={2} sx={{ p: 2, height: "500px", overflowY: "auto"}}>
                <ActionPanel
                  data={searchdata}
                  isLogged={isLoggedIn}
                  userData={userData}
                  trait={selectedTrait}
                  searchquery={searchResult}
                  onEvaluationValue={evaluationValue}
                />
                <Divider textAlign="center">****</Divider>
                <EvidenceAccordion trait={evaluationValue} />
              </Paper>
            </Grid>
          </Grid>
        </>
        <Footer />
      </Container>
      {/* Login Modal */}
      <Dialog open={openLogin} onClose={handleLoginClose}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setMsg("");
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="body2" color="error">
            {msg}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleLoginClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleLoginSubmit}
            color="primary"
            variant="contained"
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;

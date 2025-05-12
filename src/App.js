// // src/App.jsx
// import React, { useState } from "react";
// import {
//   CssBaseline,
//   Container,
//   Grid,
//   Typography,
//   Paper,
//   Divider,
// } from "@mui/material";
// import SearchSection from "./components/SearchSection";
// import TraitHierarchy from "./components/TraitHierarchy";
// import ActionPanel from "./components/ActionPanel";
// import EvidenceAccordion from "./components/EvidenceAccordion";
// import sampleData from "./assets/DataJson.json";

// // Helper function to convert IDs to strings
// const convertDataIdsToStrings = (nodes) => {
//   return nodes.map(node => ({
//     ...node,
//     id: node.id.toString(),
//     parentId: node.parentId != null ? node.parentId.toString() : null,
//     children: node.children ? convertDataIdsToStrings(node.children) : undefined,
//   }));
// };

// const App = () => {
//   const [searchResult, setSearchResult] = useState(null);

//   return (
//     <>
//       <CssBaseline />
//       <Container maxWidth="xl" sx={{ my: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//           A Curation System for Rice Trait Ontology
//         </Typography>
//         <Divider textAlign="center"></Divider>

//         <SearchSection onSearchSubmit={setSearchResult} />

//         <Grid container spacing={3} sx={{ mt: 2 }} className="grid-container">
//           <Grid item size={6} sx={{ height: 300, overflowY: 'auto' }}>
//             <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
//               <TraitHierarchy
//                 searchResult={searchResult}
//                 data={convertDataIdsToStrings(sampleData.children)}
//               />
//             </Paper>
//           </Grid>
//           <Grid item size={6}>
//             <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
//               <ActionPanel />
//               <Divider textAlign="center">****</Divider>
//               <EvidenceAccordion />
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default App;



import React, { useState } from "react";
import {
  CssBaseline,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  Box,
  Button,Dialog,DialogTitle,DialogContent,TextField,DialogActions
} from "@mui/material";
import SearchSection from "./components/SearchSection";
import TraitHierarchy from "./components/TraitHierarchy";
import ActionPanel from "./components/ActionPanel";
import EvidenceAccordion from "./components/EvidenceAccordion";
import sampleData from "./assets/DataJson.json";
import searchdata from "./assets/OutputSearch.json";

const convertDataIdsToStrings = (nodes) => {
  return nodes.map((node) => ({
    ...node,
    id: node.id.toString(),
    parentId: node.parentId?.toString() ?? null,
    children: node.children
      ? convertDataIdsToStrings(node.children)
      : undefined,
  }));
};

const App = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State for login
  const [openLogin, setOpenLogin] = useState(false);    // Dialog open state
  const [username, setUsername] = useState("");         // Username state
  const [password, setPassword] = useState("");         // Password state

  const handleLoginOpen = () => setOpenLogin(true);
  const handleLoginClose = () => setOpenLogin(false);


  const handleLoginSubmit = () => {
    // For simplicity, assuming any non-empty username and password is valid
    if (username && password) {
      setIsLoggedIn(true);
      setOpenLogin(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          A Curation System for Rice Trait Ontology
        </Typography>
        {/* Login/Sign-out Button */}
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={isLoggedIn ? handleLogout : handleLoginOpen}
          >
            {isLoggedIn ? "Sign Out" : "Sign In"}
          </Button>
        </Box>
        <Divider textAlign="center"></Divider>

        <SearchSection onSearchSubmit={setSearchResult} data={searchdata} />


        <Grid container spacing={3} sx={{ mt: 2 }} className="grid-container">
          <Grid item size={6} sx={{ height: 500, overflowY: "auto" }}>
            <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
              <TraitHierarchy
                searchResult={searchResult}
                data={convertDataIdsToStrings(sampleData.children)}
              />
            </Paper>
          </Grid>
          <Grid item size={6}>
            <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
              <ActionPanel data={searchdata}/>
              <Divider textAlign="center">****</Divider>
              <EvidenceAccordion />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {/* Login Modal */}
      <Dialog open={openLogin} onClose={handleLoginClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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

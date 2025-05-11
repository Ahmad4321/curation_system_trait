// // src/components/SearchSection.jsx
// import React, { useState } from "react";
// import {
//   Box,
//   Autocomplete,
//   TextField,
//   Typography,
//   Paper,
//   Button,
// } from "@mui/material";

// const searchOptions = [];

// const SearchSection = ({ onSearchSubmit }) => {
//   const [selectedOption, setSelectedOption] = useState(null);

//   return (
//     <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
//       <Typography variant="h6" gutterBottom>
//         Search Term
//       </Typography>
//       <Box sx={{ display: "flex", gap: 2 }}>
//         <Autocomplete
//           options={searchOptions}
//           getOptionLabel={(option) =>
//             `${option.label} (${option.english}) (${option.code})`
//           }
//           value={selectedOption}
//           onChange={(_, newValue) => setSelectedOption(newValue)}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label="Search trait..."
//               variant="outlined"
//               fullWidth
//             />
//           )}
//           sx={{ flexGrow: 1 }}
//         />
//         <Button
//           variant="contained"
//           onClick={() => onSearchSubmit(selectedOption)}
//           disabled={!selectedOption}
//         >
//           Search
//         </Button>
//       </Box>
//     </Paper>
//   );
// };

// export default SearchSection;




// 


// src/components/SearchSection.jsx
import React, { useState } from "react";
import {
  Box,
  Autocomplete,
  TextField,
  Typography,
  Paper,
  Button,
} from "@mui/material";

// Dummy options, you should load this from your actual trait data
const searchOptions = [
  {
    id: "101",
    label: "受力性状 (Stress trait)",
    english: "受力性状 (Stress trait)",
    code: "TR101",
    path: ["100", "101"],
  },
  {
    id: "102",
    label: "Flood Resistance",
    english: "Flood Tolerance",
    code: "TR102",
    path: ["100", "102"],
  },
];

const SearchSection = ({ onSearchSubmit }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Search Term
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Autocomplete
          options={searchOptions}
          getOptionLabel={(option) =>
            `${option.english}`
          }
          value={selectedOption}
          onChange={(_, newValue) => setSelectedOption(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search trait..."
              variant="outlined"
              fullWidth
            />
          )}
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          onClick={() => onSearchSubmit(selectedOption)}
          disabled={!selectedOption}
        >
          Search
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchSection;

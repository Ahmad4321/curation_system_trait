import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';

const Header = () => {
  return (
    <Box>
      <Box
      >
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="http://lit-evi.hzau.edu.cn/static/RiceTraitOntology/img/RTOlogo.png"
                alt="Logo"
                style={{ height: 60 }}
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                A Curation System for Rice Trait Ontology
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

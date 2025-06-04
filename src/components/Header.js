import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
} from "@mui/material";

const Header = () => {
  return (
    <Box>
      <Box>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="http://lit-evi.hzau.edu.cn/static/RiceTraitOntology/img/RTOlogo.png"
                alt="Logo"
                style={{ height: 60 }}
              />
              <Box
                sx={{ display: "flex", alignItems: "center", paddingLeft: 50 }}
              >
                <Link href="/" color="inherit" underline="none">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: { xs: "none", md: "flex" } }}
                  >
                    Home
                  </Typography>
                </Link>
                <Link
                  href="/rice-trait-ontology"
                  color="inherit"
                  underline="none"
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: { xs: "none", md: "flex" }, padding: 2 }}
                  >
                    Curation System
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default Header;

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
                sx={{ display: "flex", alignItems: "center", paddingLeft: 50,gap:1 }}
              >
                <Link href="/rice_trait_ontology_curation_system/" color="inherit" underline="none">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: { xs: "none", md: "flex" } }}
                  >
                    Guideline
                  </Typography>
                </Link>
                <Typography
                    variant="h6"
                    component="div"
                  >
                    |
                  </Typography>
                <Link
                  href="/rice_trait_ontology_curation_system/rice-trait-ontology/"
                  color="inherit"
                  underline="none"
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: { xs: "none", md: "flex" }}}
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

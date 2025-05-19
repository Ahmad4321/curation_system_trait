// src/components/EvidenceAccordion.jsx
import React from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EvidenceAccordion = ({ trait }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper elevation={2}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Rice-Alterome" {...a11yProps(0)} />
            <Tab label="PubAnnotation" {...a11yProps(1)} />
            <Tab label="LLM" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {trait
            ? trait.trait[0].rice_alterome_evidence
            : "No data found!"}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {trait
            ? trait.trait[0].pubAnnotation_evidence
            : "No data found!"}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {trait
            ? trait.trait[0].llm_evidence
            : "No data found!"}
        </CustomTabPanel>
      </Box>
    </Paper>
  );
};

export default EvidenceAccordion;

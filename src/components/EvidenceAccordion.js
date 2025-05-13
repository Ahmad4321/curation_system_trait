// src/components/EvidenceAccordion.jsx
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const EvidenceAccordion = ({trait}) => {
  return (
    <Paper elevation={2}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Rice-Alterome</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <Chip label="Evidence" variant="outlined" sx={{ mr: 2 }} />
              <ListItemText primary="Trait correlation data from RiceVar database" />
            </ListItem>
            {trait.evaluation}
            <Divider />
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">PubAnnotation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <Chip label="Evidence" variant="outlined" sx={{ mr: 2 }} />
              <ListItemText primary="Annotations from 5 published papers" />
            </ListItem>
            {trait.evaluation}
            <Divider />
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">LLM</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <Chip label="Evidence" variant="outlined" sx={{ mr: 2 }} />
              <ListItemText primary="AI model predictions with 92% confidence" />
            </ListItem>
            {trait.evaluation}
            <Divider />
          </List>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default EvidenceAccordion;

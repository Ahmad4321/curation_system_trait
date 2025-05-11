// src/components/TraitHierarchy.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
  Chip,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const TraitItem = ({ node, level = 0, searchPath = [], isMatched = false }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  useEffect(() => {
    if (searchPath.includes(node.id)) {
      setOpen(true);
    }
  }, [searchPath, node.id]);

  return (
    <>
      <ListItem
        onClick={() => setOpen(!open)}
        sx={{
          pl: level * 4,
          backgroundColor: isMatched ? "rgba(25, 118, 210, 0.08)" : "inherit",
        }}
      >
        <ListItemText
          primary={
            <>
              {node.name}
              {isMatched && (
                <Chip
                  label="Matched"
                  color="primary"
                  size="small"
                  sx={{ ml: 1 }}
                />
              )}
            </>
          }
        />
        {hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {node.children.map((child) => (
              <TraitItem
                key={child.id}
                node={child}
                level={level + 1}
                searchPath={searchPath}
                isMatched={searchPath.includes(child.id)}
              />
            ))}
          </List>
        </Collapse>
      )}
      <Divider />
    </>
  );
};

const TraitHierarchy = ({ searchResult, data }) => {
  const [expandedPaths, setExpandedPaths] = useState([]);
  const [traitHierarchy, setTraitHierarchy] = useState([]);

  useEffect(() => {
    if (data) {
      setTraitHierarchy(data);
    }
  }, [data]);

  useEffect(() => {
    if (searchResult) {
      setExpandedPaths(searchResult.path);
    }
  }, [searchResult]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Trait Hierarchy
      </Typography>
      <List>
        {traitHierarchy.map((trait) => (
          <TraitItem
            key={trait.id}
            node={trait}
            searchPath={expandedPaths}
            isMatched={searchResult?.id === trait.id}
          />
        ))}
      </List>
    </Box>
  );
};

export default TraitHierarchy;



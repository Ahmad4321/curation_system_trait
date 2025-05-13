// src/components/TraitHierarchy.jsx
// 

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

const TraitItem = ({ node, level = 0, searchPath = [], searchTerm = "" }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isMatched = searchTerm && node.ename.toLowerCase().includes(searchTerm.toLowerCase());

  useEffect(() => {
    if (searchPath.includes(node.id) || isMatched) {
      setOpen(true);
    }
  }, [searchPath, node.id, isMatched]);

  return (
    <>
      <ListItem
        onClick={() => setOpen(!open)}
        sx={{
          pl: level * 4,
          backgroundColor: isMatched ? "rgba(25, 118, 210, 0.08)" : "inherit",
          cursor: hasChildren ? "pointer" : "default",
        }}
      >
        <ListItemText
          primary={
            <>
              {node.ename}
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
                searchTerm={searchTerm}
              />
            ))}
          </List>
        </Collapse>
      )}
      <Divider />
    </>
  );
};

const TraitHierarchy = ({ searchTerm, data }) => {
  const [expandedPaths, setExpandedPaths] = useState([]);
  const [traitHierarchy, setTraitHierarchy] = useState([]);

  const findMatchingPaths = (nodes, term, currentPath = []) => {
    let paths = [];
    nodes.forEach(node => {
      const newPath = [...currentPath, node.id];
      if (term && node.ename.toLowerCase().includes(term.toLowerCase())) {
        paths.push(newPath);
      }
      if (node.children) {
        paths = paths.concat(findMatchingPaths(node.children, term, newPath));
      }
    });
    return paths;
  };

  const getAllParentPaths = (paths) => {
    const allPaths = new Set();
    paths.forEach(path => {
      for (let i = 1; i < path.length; i++) {
        allPaths.add(path.slice(0, i).join('-'));
      }
    });
    return Array.from(allPaths);
  };

  useEffect(() => {
    if (data) {
      setTraitHierarchy(data);
    }
  }, [data]);

  useEffect(() => {
    if (searchTerm) {
      const matchingPaths = findMatchingPaths(data, searchTerm);
      const pathsToExpand = getAllParentPaths(matchingPaths);
      setExpandedPaths(pathsToExpand);
    } else {
      setExpandedPaths([]);
    }
  }, [searchTerm, data]);

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
            searchTerm={searchTerm}
          />
        ))}
      </List>
    </Box>
  );
};

export default TraitHierarchy;
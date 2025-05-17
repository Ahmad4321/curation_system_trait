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

import SortableTree from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css';
import { changeNodeAtPath } from '@nosferatu500/react-sortable-tree';


import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';


const TraitItem = ({
  node,
  level = 0,
  searchPath = [],
  searchTerm = "",
  onTraitSelect,
  onEvaluationValue,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isMatched =
    searchTerm && node.ename.toLowerCase().includes(searchTerm.toLowerCase());

  useEffect(() => {
    if (searchPath.includes(node.id) || isMatched) {
      setOpen(true);
    }
  }, [searchPath, node.id, isMatched]);

  const handleClick = async () => {
    if (hasChildren) {
      const isClosing = open;
      setOpen(!open);
    
      if (isClosing) {
        // Clear table data when node is collapsed
        onEvaluationValue(null); // Or [] if your table expects an array
        return; // Don't fetch new data
      }
    }
    // Always call onTraitSelect when item is clicked
    onTraitSelect(node);
    console.log(open)

    if (node && node.id && open === false) {
      setLoading(true);
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/fetch_trait_evalutation/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trait_id: node ? node.id : "" }),
          }
        );
        if (res.ok) {
          const data = await res.json();
          console.log(data)
          onEvaluationValue(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      onEvaluationValue([]);
    }
  };

  return (
    <>
      <ListItem
        onClick={handleClick}
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
                onTraitSelect={onTraitSelect}
                onEvaluationValue={onEvaluationValue}
              />
            ))}
          </List>
        </Collapse>
      )}
      <Divider />
    </>
  );
};

const TraitHierarchy = ({
  searchTerm,
  data,
  onTraitSelect,
  onEvaluationValue
}) => {
  const [expandedPaths, setExpandedPaths] = useState([]);
  const [traitHierarchy, setTraitHierarchy] = useState([]);

  const findMatchingPaths = (nodes, term, currentPath = []) => {
    let paths = [];
    nodes.forEach((node) => {
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
    paths.forEach((path) => {
      for (let i = 1; i < path.length; i++) {
        allPaths.add(path.slice(0, i).join("-"));
      }
    });
    return Array.from(allPaths);
  };

  useEffect(() => {
    if (data) {
      setTraitHierarchy(data);
    }
  }, [data]);

  const toggleNodeExpanded = (rowInfo) => {
    const { node, path } = rowInfo;

    setTraitHierarchy(prevData =>
      changeNodeAtPath({
        treeData: prevData,
        path,
        getNodeKey: ({ treeIndex }) => treeIndex.id,
        newNode: { ...node, expanded: !node.expanded },
      })
    );
  };

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

    <>
      <SortableTree
          getNodeKey={({ node }) => node.id}
          treeData={traitHierarchy}
          onChange={treeData => setTraitHierarchy(treeData)}
          canDrag={false}
          searchQuery={searchTerm}
          generateNodeProps={(rowInfo) => ({
          title: (
            <div onClick={() => toggleNodeExpanded(rowInfo)} style={{ cursor: 'pointer' }}>
              {rowInfo.node.title}
            </div>
          ),
        })}
        />

        <Tree
            treeData={traitHierarchy}
            onSelect={onTraitSelect}
    />
    </>
    // <Box>
    //   <Typography variant="h6" gutterBottom>
    //     Trait Hierarchy
    //   </Typography>
    //   <List>
    //     {traitHierarchy.map((trait) => (
    //       <TraitItem
    //         key={trait.id}
    //         node={trait}
    //         searchPath={expandedPaths}
    //         searchTerm={searchTerm}
    //         onTraitSelect={onTraitSelect}
    //         onEvaluationValue={onEvaluationValue}
    //       />
    //     ))}
    //   </List>
    // </Box>
  );
};

export default TraitHierarchy;

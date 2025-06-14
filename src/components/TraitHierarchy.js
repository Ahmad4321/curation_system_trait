import React, { useEffect, useState } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import {
  Box,
  Typography,
  Chip,
  Backdrop,
  CircularProgress,
} from "@mui/material";

const TraitHierarchyRcTree = ({
  searchResult,
  data,
  onTraitSelect,
  onEvaluationValue,
}) => {
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const findMatchesAndExpanded = (nodes, term, parentKeys = []) => {
    let expanded = [];
    let matchedKeys = new Set();

    const recurse = (list, path = []) =>
      list.map((node) => {
        const key = node.id.toString();
        const newPath = [...path, key];
        const isMatched =
          term && node.title.toLowerCase().includes(term.toLowerCase());

        if (isMatched) {
          matchedKeys.add(key);
          for (let i = 0; i < newPath.length - 1; i++) {
            expanded.push(newPath[i]);
          }
        }

        return {
          title: (
            <>
              {node.title}
              {isMatched && (
                <Chip
                  label="Matched"
                  color="primary"
                  size="small"
                  sx={{ ml: 1 }}
                />
              )}
            </>
          ),
          key,
          children: node.children ? recurse(node.children, newPath) : undefined,
        };
      });

    const transformed = recurse(nodes);
    return {
      treeData: transformed,
      expandedKeys: Array.from(new Set(expanded)),
      matchedKeys,
    };
  };

  useEffect(() => {
    if (!data) return;
    const { treeData: newTreeData, expandedKeys: newExpanded } =
      findMatchesAndExpanded(data, searchResult);
    setTreeData(newTreeData);
    setExpandedKeys(newExpanded);
  }, [data, searchResult]);

  const onSelect = async (keys, info) => {
    setSelectedKeys(keys);
    const node = info.node;
    const traitId = node.key;
    onTraitSelect && onTraitSelect({ id: traitId, ename: node.title });
    try {
      setLoading(true);
      const res = await fetch(
        "http://127.0.0.1:8000/rice_trait_ontology_curation_system/fetch_trait_evalutation/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            trait_id: traitId,
            name: node.title.props.children[0],
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        onEvaluationValue && onEvaluationValue(data);
        setLoading(false);
      } else {
        onEvaluationValue && onEvaluationValue([]);
        setLoading(false);
      }
    } catch (err) {
      onEvaluationValue && onEvaluationValue([]);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box>
        <Typography variant="h6" gutterBottom>
          Trait Hierarchy
        </Typography>
        <Tree
          treeData={treeData}
          expandedKeys={expandedKeys}
          selectedKeys={selectedKeys}
          onExpand={setExpandedKeys}
          onSelect={onSelect}
          defaultExpandParent={true}
        />
      </Box>
    </>
  );
};

export default TraitHierarchyRcTree;

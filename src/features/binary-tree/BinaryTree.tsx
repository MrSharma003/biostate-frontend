import { useRef, useState } from "react";
import {
  CustomNodeElementProps,
  RawNodeDatum,
  Tree,
  TreeNodeDatum,
} from "react-d3-tree";
import { v4 } from "uuid";
import { bfs, updateTree } from "../../utility";
import { AddMember } from "./AddMember";
import { getMaxPathSumThunk } from "./middleware";
import ToggleButton from "../Button";
import { Routes } from "../../router/routes";
import { AppDispatch, useSelector } from "../../store/store";
import { useDispatch } from "react-redux";

const BinaryTree = () => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null); // To manage the anchor element for the popover
  const [selectedNode, setSelectedNode] = useState<TreeNodeDatum | undefined>(); // To store selected node data
  const [parentValue, setParentValue] = useState(selectedNode?.name ?? "");
  const [tree, setTree] = useState<RawNodeDatum | RawNodeDatum[]>({
    name: "0",
    attributes: {
      id: v4(),
    },
    children: [],
  });
  const dispatch = useDispatch<AppDispatch>();

  const { maxSumAnyNode, maxSumLeafNode } = useSelector(
    (state) => state.binarytree
  );

  const handleNodeClick = (nodeData: any, event: any) => {
    setSelectedNode(nodeData); // Store the clicked node's data
    anchorEl.current = event.currentTarget;
    setOpen(true); // Open the popover
  };

  const handleUpdateParent = () => {
    if (selectedNode && selectedNode.name !== parentValue) {
      console.log("new tree");
      const newTree = updateTree(tree, selectedNode, parentValue);
      setTree(newTree);
      console.log(tree);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNode = (name: string) => {
    if (!selectedNode?.attributes?.id) return;
    const newTree = bfs(selectedNode.attributes.id.toString(), tree, {
      name: name.toString(),
      attributes: {
        id: v4(),
      },
      children: [],
    });
    setTree(newTree);
  };

  const handleCompute = () => {
    console.log("compute called");
    dispatch(getMaxPathSumThunk(tree as RawNodeDatum));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 px-4 py-8 flex flex-col items-center justify-center relative">
      <ToggleButton label="Go To String" route={Routes.SUBSTRING} />

      <div className="flex flex-col items-center w-full max-w-5xl bg-white/90 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6 tracking-wide">
          🌳 Tree Visualization & Max Path Sum
        </h1>

        <div className="relative h-[60vh] w-full bg-gray-100 rounded-lg shadow-md p-4 overflow-auto flex justify-center items-center">
          <Tree
            data={tree}
            onNodeClick={handleNodeClick}
            orientation="vertical"
            translate={{ x: 300, y: 100 }}
            renderCustomNodeElement={(nodeInfo) =>
              renderRectSvgNode(nodeInfo, handleNodeClick)
            }
          />
          <AddMember
            id="dynamic-popover"
            open={open}
            anchorEl={anchorEl.current}
            handleClose={handleClose}
            selectedNode={selectedNode}
            handleAddNode={(name) => handleAddNode(name)}
            setParentValue={setParentValue}
            parentValue={parentValue}
            handleUpdateParent={handleUpdateParent}
          />
        </div>

        {/* Displaying Results */}
        <div className="w-full mt-6 flex flex-row justify-between items-center gap-6">
          {/* Results Sections */}
          <div className="bg-indigo-50 p-6 rounded-lg shadow-lg flex items-center gap-2">
            <p className="text-base font-semibold text-indigo-800">
              Maximum Path from Leaf to Any Node:
            </p>
            <div className="text-lg font-bold text-indigo-600">
              <span>{maxSumLeafNode}</span>
            </div>
          </div>

          <div className="bg-teal-50 p-6 rounded-lg shadow-lg flex items-center gap-2">
            <p className="text-base font-semibold text-teal-800">
              Maximum Path between Any Two Nodes:
            </p>
            <div className="text-lg font-bold text-teal-600">
              <span>{maxSumAnyNode}</span>
            </div>
          </div>

          {/* Button aligned to the right */}
          <button
            onClick={handleCompute}
            className="py-3 px-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200 ml-auto"
          >
            Compute
          </button>
        </div>
      </div>
    </div>
  );
};

const renderRectSvgNode = (
  customProps: CustomNodeElementProps,
  click: (datum: TreeNodeDatum, event: any) => void
) => {
  const { nodeDatum } = customProps;

  return (
    <g>
      <circle r="25" fill="#777" onClick={(event) => click(nodeDatum, event)} />
      <text
        fill="red"
        strokeWidth="0.5"
        x="0"
        y="1"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {nodeDatum.name}
      </text>
    </g>
  );
};

export default BinaryTree;

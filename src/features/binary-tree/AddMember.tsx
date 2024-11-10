import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import { TreeNodeDatum } from "react-d3-tree";

interface AddMemberProps {
  id: string;
  open: boolean;
  anchorEl: HTMLElement | null; // The element to which the popover will anchor
  handleClose: () => void; // Function to close the popover
  selectedNode: TreeNodeDatum | undefined; // The node selected in the tree
  handleAddNode: (name: string) => void;
  setParentValue: (value: string) => void;
  parentValue: string;
  handleUpdateParent: () => void;
}

export function AddMember({
  id,
  open,
  anchorEl,
  handleClose,
  selectedNode,
  handleAddNode,
  setParentValue,
  parentValue,
  handleUpdateParent,
}: AddMemberProps) {
  const [value, setInput] = useState("");

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      PaperProps={{
        style: {
          padding: "16px",
          width: "240px",
          maxWidth: "90%",
          borderRadius: "8px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#fff",
          transition: "all 0.2s ease-in-out",
        },
      }}
    >
      <Typography
        component="div"
        sx={{ textAlign: "center", color: "gray.800" }}
      >
        {selectedNode ? (
          <div className="space-y-4 text-sm font-medium text-gray-700">
            {/* Update Parent Section */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleUpdateParent}
                className="py-1 px-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-medium rounded shadow-sm hover:shadow-lg transition-transform transform hover:scale-105"
              >
                Update
              </button>
              <input
                type="text"
                placeholder="New Parent Value"
                value={parentValue}
                onChange={(e) => setParentValue(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
              />
            </div>

            {/* Input and Add Child Section */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAddNode(value)}
                className="py-1 px-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-medium rounded shadow-sm hover:shadow-lg transition-transform transform hover:scale-105"
              >
                Add
              </button>
              <input
                type="text"
                placeholder="Child Value"
                value={value}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </Typography>
    </Popover>
  );
}

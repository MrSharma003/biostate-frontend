import { RawNodeDatum } from "react-d3-tree";
import { featureAPI } from "../featuresApi/feature.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const generateLevelOrderArray = async (tree: RawNodeDatum | RawNodeDatum[]) => {
//     if (!tree) {
//       throw new Error(
//         "Tree structure is null or undefined. Please provide a valid tree."
//       );
//     }
//     const levelOrder: string[] = [];
//     const queue: RawNodeDatum[] = [];

//     queue.push(tree as RawNodeDatum);

//     while (queue.length > 0) {
//       const currNode = queue.shift();
//       levelOrder.push(currNode?.name ?? "Null");

//       currNode?.children?.forEach((child) => {
//         queue.push(child);
//       });
//     }

//   const result = await featureAPI.maximumSumPath(tree);

//   console.log(result);
// };

export interface BinaryTreeData {
  maxSumAnyNode: string;
  maxSumLeafNode: string;
}

const initialState: BinaryTreeData = {
  maxSumAnyNode: "",
  maxSumLeafNode: "",
};

export const getMaxPathSumThunk = createAsyncThunk<
BinaryTreeData,
  RawNodeDatum,
  { rejectValue: string }
>("feature/getMaxPathSumThunk", async (tree, { rejectWithValue }) => {
  try {
    const response = (await featureAPI.maximumSumPath(
      tree
    )) as unknown as BinaryTreeData;
    console.log("response: ", response);
    return response;
  } catch (error) {
    // Log error to help with debugging
    console.error("Error in getMaxPathSumThunk:", error);

    // Customize and reject with a meaningful error message
    return rejectWithValue(
      "Failed to calculate the maximum path sum. Please try again."
    );
  }
});

const binaryTreeSlice = createSlice({
  name: "binaryTree",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMaxPathSumThunk.fulfilled, (state, action) => {
      state.maxSumAnyNode = action.payload.maxSumAnyNode;
      state.maxSumLeafNode = action.payload.maxSumLeafNode;
    });
  },
});

export default binaryTreeSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { featureAPI } from "../../features/featuresApi/feature.api";
import { StringHistory } from "../../type";

interface SubstringState {
  isLoading: boolean;
  historyLoding: boolean;
  input: string;
  longestSubstring: string;
  uniqueSubstrings: string[];
  history: StringHistory[];
}

export const stringFeatureThunk = createAsyncThunk<
  { longestSubstring: string; uniqueSubstring: string[] },
  string
>("feature/string", async (payload, { rejectWithValue }) => {
  console.log("Inside thunk");
  const response = await featureAPI.featureStirng(payload);
  if (!response || "error" in response) {
    rejectWithValue("Got some error");
  }
  return response;
});

export const stringHistoryThunk = createAsyncThunk<
  StringHistory[],
  void,
  { rejectValue: string } // Define the rejectValue type to be a string error message
>("feature/string_history", async (_, { rejectWithValue }) => {
  console.log("Inside thunk");

  try {
    const response =
      (await featureAPI.getAllStringHistory()) as unknown as StringHistory[];

    // Check if the response is valid, otherwise reject
    if (!response || "error" in response) {
      return rejectWithValue("Got some error");
    }

    return response; // Return the valid response
  } catch (error) {
    // Handle unexpected errors (network issues, etc.)
    return rejectWithValue("An unexpected error occurred. Please try again.");
  }
});

const initialState: SubstringState = {
  isLoading: false,
  historyLoding: false,
  input: "",
  longestSubstring: "",
  uniqueSubstrings: [],
  history: [],
};

const substringSlice = createSlice({
  name: "substring",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(stringFeatureThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(stringFeatureThunk.fulfilled, (state, action) => {
      state.longestSubstring = action.payload.longestSubstring;
      state.uniqueSubstrings = action.payload.uniqueSubstring;
      state.isLoading = false;
    });
    builder.addCase(stringHistoryThunk.pending, (state) => {
      state.historyLoding = true;
    });
    builder.addCase(stringHistoryThunk.fulfilled, (state, action) => {
      state.history = action.payload;
      state.historyLoding = false;
    });
  },
});

export default substringSlice.reducer;

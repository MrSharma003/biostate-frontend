import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser, UserLoginPayload, UserSignupPayload } from "../../type";
import { AuthAPI } from "../../api/auth.api";
import store from "../store";

const api = AuthAPI.getInstance();

interface AuthSlice {
  authUser: AuthUser | null;
  status: string;
}

// signup thunk is not returning anything,
// all return state will maintain directly by redux
export const signUpThunk = createAsyncThunk<void, UserSignupPayload>(
  "user/signup",
  async (payload, { rejectWithValue }) => {
    const error = await api.signUp(payload);
    if (error) {
      rejectWithValue({ error });
    }
  }
);

export const lognInThunk = createAsyncThunk<
  { authUser: AuthUser },
  UserLoginPayload
>("user/login", async (payload, { rejectWithValue }) => {
  const { authUser, error } = await api.loginUser(payload);
  console.log(authUser);
  if (error || !authUser) {
    rejectWithValue({
      error: `Unexpected error signing you in ${error}`,
    });
  }
  return { authUser };
});

const initialState: AuthSlice = {
  authUser: {
    message: "",
    user: {
      id: "",
      firstName: "",
      lastName: "",
      role: "",
    },
    accessToken: "",
    refreshToken: "",
  },
  status: "",
};

export const LOCAL_STORAGE_AUTH_TOKEN = "biostate-tokens";

function changeUser(state: AuthSlice, currentUser: AuthUser) {
  if (currentUser !== state.authUser) {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN);
    const { accessToken, refreshToken } = currentUser;
    localStorage.setItem(
      LOCAL_STORAGE_AUTH_TOKEN,
      [accessToken, refreshToken].join("\n")
    );
  }
}

export function setTokenOnRefresh() {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN);

  if (storedToken) {
    const [accessToken] = storedToken.split("\n");
    store.dispatch(setTokens({ token: accessToken }));
  }
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<{ token: string }>) {
      if (state.authUser) {
        state.authUser.accessToken = action.payload.token;
        state.status = "fulfilled";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(lognInThunk.fulfilled, (state, action) => {
      changeUser(state, action.payload.authUser);
      state.authUser = action.payload.authUser;
      state.status = "fulfilled";
    });
  },
});

export const { setTokens } = slice.actions;
export default slice.reducer;

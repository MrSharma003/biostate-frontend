export interface UserSignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}
export interface AuthUser {
  message: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

export type StringHistory = {
  input: string;
  longestSubstring: string;
  uniqueSubstrings: string[];
};


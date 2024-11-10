import { AuthUser, UserLoginPayload, UserSignupPayload } from "../type";
import axiosInstance from "./axiosInstance";

export class AuthAPI {
  private static instance: AuthAPI;

  //for singleton
  private constructor() {}

  static getInstance(): AuthAPI {
    if (!AuthAPI.instance) {
      AuthAPI.instance = new AuthAPI();
    }

    return AuthAPI.instance;
  }

  async signUp(input: UserSignupPayload) {
    try {
      await axiosInstance.post("/register", input);
      return { error: null };
    } catch (error) {
      console.error("Sign-up error:", error);
      throw error;
    }
  }

  async loginUser(user: UserLoginPayload) {
    console.log(process.env.REACT_APP_SERVER_URL);
    const session = await axiosInstance.post("sign-in", user);
    console.log(session);
    return {
      authUser: session.data.authUser as AuthUser,
      error: session.data.error,
    };
  }
}

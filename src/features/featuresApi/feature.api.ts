import { RawNodeDatum } from "react-d3-tree";
import axiosInstance from "../../api/axiosInstance";
import { LOCAL_STORAGE_AUTH_TOKEN } from "../../store/auth/slice";
import { BinaryTreeData } from "../binary-tree/middleware";

export class FeaturesAPI {
  private static instance: FeaturesAPI;
  private token: string | null = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN);

  setToken(token: string | null) {
    this.token = token;
  }

  private constructor() {}

  static getInstance(): FeaturesAPI {
    if (!FeaturesAPI.instance) {
      FeaturesAPI.instance = new FeaturesAPI();
    }

    return FeaturesAPI.instance;
  }

  async featureStirng(input: string) {
    try {
      console.log("inside api", input, this.token);
      const response = await axiosInstance.post(
        "/substring",
        { inputString: input },
        {
          headers: {
            Authorization: "Bearer " + this.token?.split("\n")[0],
          },
        }
      );

      console.log(response);
      return {
        longestSubstring: response.data.longestSubstring,
        uniqueSubstring: response.data.uniqueSubstring,
      };
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  }

  async maximumSumPath(
    treeSlice: RawNodeDatum | RawNodeDatum[]
  ): Promise<BinaryTreeData> {
    try {
      const response = await axiosInstance.post(
        "/binary-tree",
        { tree: treeSlice },
        {
          headers: {
            Authorization: "Bearer " + this.token?.split("\n")[0],
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async getAllStringHistory() {
    try {
      const result = await axiosInstance.get("/substring/history", {
        headers: {
          Authorization: "Bearer " + this.token?.split("\n")[0],
        },
      });
      return result.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}

export const featureAPI = FeaturesAPI.getInstance();

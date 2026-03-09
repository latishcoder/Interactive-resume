import { userAPI } from "../utils/api";

export const getProfile = async () => {
  const res = await userAPI.getProfile();
  return res.data;
};
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../axiosConfig";
import { cleared as userCleared } from "../state/userSlice";
import { cleared as socketCleared } from "../state/socketSlice";

function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const logout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/auth/logout");
      clearState();
      setIsLoading(false);
      return { status: response.status, message: response.data };
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return { status: error.response.status, message: error.response.data };
    }
  };
  const clearState = () => {
    dispatch(userCleared());
    dispatch(socketCleared());
  };
  return { isLoading, logout };
}

export { useLogout };

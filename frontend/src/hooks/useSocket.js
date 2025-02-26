import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  saved as socketSaved,
  cleared as socketCleared,
} from "../state/socketSlice";

function useSocket() {
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  const createNewSocket = () => {
    const socket = io(import.meta.env.VITE_API_BASE_URL, {
      withCredentials: true,
    });
    dispatch(socketSaved(socket));
    return socket;
  };

  return { socket, createNewSocket };
}

export { useSocket };

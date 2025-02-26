import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saved as userSaved } from "./state/userSlice";
import { ThemeProvider } from "styled-components";

import { useTheme } from "./hooks/useTheme";
import axios from "./axiosConfig";
import NonDesktop from "./components/validation/NonDesktop";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import "./App.css";
import Login from "./pages/Login";
import ProtectedRoute from "./components/validation/ProtectedRoute";
import Landing from "./pages/Landing";
import CodeEditor from "./pages/CodeEditor";

function App() {
  const { theme } = useTheme();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get("/user");
        dispatch(userSaved(response.data));
      } catch (error) {}
    }
    if (!user) {
      getUserData();
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {window.innerWidth < 1024 ? (
            <>
              <Route path="/" element={<NonDesktop />} />
              <Route path="/*" element={<NonDesktop />} />
            </>
          ) : (
            <>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
              </Route>
              <Route path="/landing">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Landing />
                    </ProtectedRoute>
                  }
                />
              </Route>
              {/* Protect this route */}
              <Route path="/editor/:roomCode" element={<CodeEditor />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

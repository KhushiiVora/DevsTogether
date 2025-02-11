import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import useTheme from "./hooks/useTheme";
import NonDesktop from "./components/validation/NonDesktop";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import "./App.css";
import Login from "./pages/Login";
import ProtectedRoute from "./components/validation/ProtectedRoute";

function App() {
  const { theme } = useTheme();
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
                {/* <Route index element={<ProtectedRoute user={}></ProtectedRoute>} /> */}
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

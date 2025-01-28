import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NonDesktop from "./components/validation/NonDesktop";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  return (
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
              <Route path="login" />
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

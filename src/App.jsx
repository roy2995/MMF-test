import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Page1 from "./pages/dataImput";
import Page2 from "./pages/imageUpload";
import Welcome from "./pages/welcome";
// import { Toaster } from "sonner";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/page1" replace />} />
      <Route path="/page1" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
      <Route path="/welcome" element={<Welcome/>} />
    </Routes>
  );
};

export default App;

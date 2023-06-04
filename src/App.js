import React from "react";
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Hoc/Layouts/Layout";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;

import React from "react";
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Hoc/Layouts/Layout";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import Leave from "./Components/Pages/Leaves/Leaves";
import Task from "./Components/Pages/Task/Task";
import Attendance from "./Components/Pages/Attendances/Attendance";
import Employee from "./Components/Pages/Employees/Employee";
import CreateEmp from "./Components/Pages/CreateEmp/CreateEmp";
import Department from "./Components/Pages/Departments/Department";
import EditDept from "./Components/Pages/Departments/EditDept";
import EditEmp from "./Components/Pages/Employees/EditEmp";
import Example1 from "./dummy/Example1";

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="department" element={<Department />} />
            <Route path="department/:id" element={<EditDept />} />
            <Route path="employee" element={<Employee />} />
            <Route path="employee/:id" element={<EditEmp />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="create" element={<CreateEmp />} />
            <Route path="leave" element={<Leave />} />
            <Route path="task" element={<Task />} />
            <Route path="eg1" element={<Example1 />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;

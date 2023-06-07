import React from "react";
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Hoc/Layouts/Layout";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import Department from "./Components/Pages/Departments/Department";
import Leaves from "./Components/Pages/Leaves/Leaves";
import Attendance from "./Components/Pages/Attendances/Attendance";
import Employee from "./Components/Pages/Employees/Employee";
import CreateEmp from "./Components/Pages/CreateEmp/CreateEmp";
import DeptLayout from "./Hoc/Layouts/DeptLayout";
import AddDepartment from "./Components/Pages/Departments/AddDepartment";
import ManageDept from "./Components/Pages/Departments/ManageDept";

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="department" element={<DeptLayout />}>
            <Route index element={<ManageDept />} />
            <Route index path="addDept" element ={<AddDepartment />} />
            <Route path="manageDept" element ={<ManageDept />} />
            
            </Route>
            <Route path="employee" element={<Employee />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="create" element={<CreateEmp />} />
            <Route path="leave" element={<Leaves />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;

import React from "react";
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Hoc/Layouts/Layout";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import Leave from "./Components/Pages/Leaves/Leaves";
import LeaveHistory from "./Components/Pages/Leaves/LeaveHistory";
import Task from "./Components/Pages/Task/Task";
import TaskStatus from "./Components/Pages/TaskStatus/TaskStatus";
import Employee from "./Components/Pages/Employees/Employee";
import CreateEmp from "./Components/Pages/CreateEmp/CreateEmp";
import Department from "./Components/Pages/Departments/Department";
import EditDept from "./Components/Pages/Departments/EditDept";
import EditEmp from "./Components/Pages/Employees/EditEmp";
import Example1 from "./dummy/Example1";
import EditTask from "./Components/Pages/Task/EditTask";
import TaskDetails from "./Components/Pages/TaskStatus/TaskDetails";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";

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

            <Route path="create" element={<CreateEmp />} />
            <Route path="leave" element={<Leave />} />
            <Route path="leave/history" element={<LeaveHistory />} />
            <Route path="task" element={<Task />} />
            <Route path="task/:id" element={<EditTask />} />
            <Route path="taskstatus" element={<TaskStatus />} />
            <Route path="taskstatus/detail/:id" element={<TaskDetails />} />
            <Route path="eg1" element={<Example1 />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;

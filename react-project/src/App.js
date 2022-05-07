import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Employer from './components/employer/Employer'
import Recruit from './components/employer/Recruit'
import EmployerCV from './components/employer/EmployerCV'
import Information from './components/employer/Information'
import JobDetail from './components/jobdetail/JobDetail'
import Home from './components/home/Home'
import Admin from './components/admin/Admin'
import ManageUser from './components/admin/ManageUser'
import EmployerRegister from './components/employer/EmployerRegister'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/job-detail" element={<JobDetail />} />
      <Route path="/employer" element={<Employer />} />
      <Route path="/employer/recruit" element={<Recruit />} />
      <Route path="/employer/employerCV" element={<EmployerCV />} />
      <Route path="/employer/information" element={<Information />} />
      <Route path="/employer-register" element={<EmployerRegister />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/manage-user" element={<ManageUser />} />
    </Routes>
  )
}

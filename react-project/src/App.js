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
import ManageUser from './components/admin/ManageUser'
import EmployerRegister from './components/employer/EmployerRegister'
import ErrorPage from './components/ErrorPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/job-detail/:jobId" element={<JobDetail />} />
      <Route path="/employer" element={<Employer />} />
      <Route path="/employer/recruit" element={<Recruit />} />
      <Route path="/employer/employerCV" element={<EmployerCV />} />
      <Route path="/employer/information" element={<Information />} />
      <Route path="/employer-register/" element={<EmployerRegister />} />
      {/* <Route path="*" element={<ErrorPage />} /> */}
      <Route path="/admin/manage-user/" element={<ManageUser />} />
    </Routes>
  )
}

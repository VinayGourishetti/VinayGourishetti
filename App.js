import React from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import NavBar from './Component/Navbar'
import SideBar from './Component/Sidebar'
import Home from './Component/Home'
import ProfileContainer from './ProfileContainer'
import Viewemployee from './ViewEmployeeList'
import Registration from './E_Registration'
import S_JobInformation from './S_JobInformation'
import  S_PersonalDetails from './S_PersonalDetails';
import S_Contact from './S_Contact';
import S_Qualification from './S_Qualification';
import S_Experience from './S_Experience';
import S_Address from './S_Address';
import S_BankDetails from './S_BankDetails';
import S_Identification from './S_Identification';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <SideBar />s
        <div style={{ flexGrow: 1 }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-profile" element={<ProfileContainer/>} />
            <Route path="/viewemployee" element={<Viewemployee/>} />
            <Route path="/registration" element={<Registration/>} />
            <Route path='/S_JobInformation' element={<S_JobInformation />} />

            <Route path='/S_PersonalDetails' element={< S_PersonalDetails/>} />
          <Route path='/S_Contact' element={<S_Contact />} />
          <Route path='/S_Qualification' element={<S_Qualification />} />
          <Route path='/S_Experience' element={<S_Experience />} />
          <Route path='/S_Address' element={<S_Address />} />
          <Route path='/S_BankDetails' element={<S_BankDetails />} />
          <Route path='/S_Identification' element={<S_Identification />} />


            {/* Add more routes here */}
          </Routes>
          </div>
          </div>
          </Router>

    
  )
}

export default App

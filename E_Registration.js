import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Update from './Update';
import S_JobInformation from './S_JobInformation';
import  S_PersonalDetails from './S_PersonalDetails';
import S_Contact from './S_Contact';
import S_Qualification from './S_Qualification';
import S_Experience from './S_Experience';
import S_Address from './S_Address';
import S_BankDetails from './S_BankDetails';
import S_Identification from './S_Identification';

// import  Profile from './Profile';
function Registration() {
  return (
    <div>
        <Routes>
          <Route path='/S_JobInformation' element={<S_JobInformation />} />
          {/* <Route path='/Update' element={<Update />} /> */}
          <Route path='/S_PersonalDetails' element={< S_PersonalDetails/>} />
          <Route path='/S_Contact' element={<S_Contact />} />
          <Route path='/S_Qualification' element={<S_Qualification />} />
          <Route path='/S_Experience' element={<S_Experience />} />
          <Route path='/S_Address' element={<S_Address />} />
          <Route path='/S_BankDetails' element={<S_BankDetails />} />
          <Route path='/S_Identification' element={<S_Identification />} />
          {/* <Route path='/Profile' element={< Profile />} /> */}
        </Routes>
    </div>
  );
}

export default Registration;
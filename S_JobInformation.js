import React, { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import "./Job.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { BiDownArrow } from "react-icons/bi";

const S_JobInformation = () => {
  const initialFormData = {
    designation: '',
    role:'',
    employeeType: '',
    dateofJoining: '',
    probationPeriodEndDate: '',
    branch: '',
    department: '',
    subDepartment: '',
    shiftTiming: '',
    zone: '',
    employeeLevel: '',
    jobLocation: '',
    biometricId: '',
    ctc:''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showModal, setShowModal] = useState(false);

  const calculateAge = (dob) => {
    if (!dob) return;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setFormData({ ...formData, age, dob });
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    calculateAge(date);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'dob') {
      calculateAge(value);
    }
  };

  const [imageUrl, setImageUrl] = useState("https://cdn-icons-png.flaticon.com/128/236/236832.png");

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImageUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  const handleNextClick = (event) => {
    event.preventDefault(); 

    const requiredFields = ['employeeDesignation', 'role', 'employeeType', 'dateofJoining', 'probationPeriodEndDate', 'branch', 'department', 'subDepartment', 'shiftTiming', 'zone', 'employeeLevel', 'jobLocation', 'biometricId', 'ctc'];

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length === 0) {
      navigate("/PersonalDetails", { state: { formData } });
    } else {
      console.log("Please fill in all required fields:", missingFields);
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="Profile_container1" style={{ width:'320px', backgroundColor: "lightgrey", height: "85vh", marginTop: "1.5cm", borderRadius: "10px",marginLeft:"-120px" }}>
        <div className="col-md-1">
          <img className="Admin_Img" src={imageUrl} alt="" id='photo' style={{ marginLeft: '70px', marginTop: "50px", height: "130px", width: "130px", borderRadius: "50%" }} />
          <input type='file' id='file' onChange={handleChangeFile}></input>
          <label htmlFor='file' id='uploadbtn' style={{ position: "absolute", height: "25px", width: "25px", cursor: "pointer", borderRadius: "50%", marginLeft: "167px", marginTop: "-27px", backgroundColor: 'rgba(75, 73, 73, 0.801)' }}>
            <FontAwesomeIcon icon={faCamera} style={{ marginLeft: '4.2px', marginBottom: "1.3px" }} />
          </label>
          <h5 style={{ color: 'green', marginTop: '20px', textAlign: 'center' }}></h5>
        </div>
        <div>
          <div className="col-md-9">
            <h6 className="mt-3" style={{ marginLeft: "65px", marginBottom: "380px" }}>Name:CH.SUMANTH</h6>
          </div>
        </div>
      </div>

      <div className="container card w-55" style={{ marginLeft: "8cm", marginTop: "-16cm", height: "100vh" }}>
        <div className="header d-flex justify-content-center mb-3">
          <h2 className='text-primary'>Employee Registration</h2>
        </div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink to="/S_JobInformation" activeClassName="active-link" className="nav-link text-primary">JobInformation<span className='text-warning-emphasis'><BiDownArrow /></span></NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/S_PersonalDetails" activeClassName="active-link" className="nav-link text-primary">PersonalDetails</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/S_Contact" activeClassName="active-link" className="nav-link text-primary">Contact</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/S_Qualification" activeClassName="active-link" className="nav-link text-primary">Qualification</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/S_Experience" activeClassName="active-link" className="nav-link text-primary">Experience</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/S_Address" activeClassName="active-link" className="nav-link text-primary">Address</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/S_BankDetails" activeClassName="active-link" className="nav-link text-primary">BankDetails</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/S_Identification" activeClassName="active-link" className="nav-link text-primary">Identification</NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <div className=''>
          <Form onSubmit={handleNextClick}>
            <Row>
              <h3 className='text-primary' id='Job Information'>Job Information</h3>
              <Col md={4} className="mb-3">
                <Form.Group controlId="employeeDesignation">
                  <Form.Label>Employee Designation:</Form.Label>
                  <Form.Control
                    className="Job_Input"
                    type="text"
                    name="employeeDesignation"
                    value={formData.employeeDesignation}
                    onChange={handleInputChange}
                    placeholder="Enter your employeeDesignation"
                    pattern="[A-Za-z ]+"
                    title="Please enter only letters"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group controlId="role">
                  <Form.Label>Role:</Form.Label>
                  <select
                    className='s13 form-control '
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="Enter Role"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Developer">Developer</option>
                    <option value="Testing">Testing</option>
                  </select>
                </Form.Group>
</Col>

  <Col md={4} className="mb-3">
  <Form.Group controlId="employeeType">
    <Form.Label>Employee Type:</Form.Label>
    <select
    
      className='s13 form-control Job_Input' 
      name="employeeType"
      value={formData.employeeType}
      onChange={handleInputChange}
      placeholder="Select Employee Type"
      required
    >
      <option value="">Select Employee Type</option>
      <option value="Type 1">Type 1</option>
      <option value="Type 2">Type 2</option>
    </select>
  </Form.Group>
</Col>


<Col md={4} className="mb-3">
    <Form.Group controlId="dateofJoining">
      <Form.Label>Date of Joining:</Form.Label>
      <Form.Control
        className="Job_Input"
        type="date"
        name="dateofJoining"
        value={formData.dateofJoining}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
  </Col>
  <Col md={4} className="mb-3">
  <Form.Group controlId="probationPeriodEndDate">
    <Form.Label>Probation Period End Date:</Form.Label>
    <Form.Control
      className="Job_Input"
      type="date"
      name="probationPeriodEndDate"
      value={formData.probationPeriodEndDate}
      onChange={handleInputChange}
      required
    />
  </Form.Group>
</Col>
<Col md={4} className="mb-3">
  <Form.Group controlId="branch">
    <Form.Label>Branch:</Form.Label>
    <select
      className='s13 form-control Job_Input' 
      name="branch"
      value={formData.branch}
      onChange={handleInputChange}
      placeholder="Enter Branch"
      required
    >
      <option value="">Select Branch</option>
      <option value="Branch 1">Branch 1</option>
      <option value="Branch 2">Branch 2</option>
    </select>
  </Form.Group>
</Col>
<Col md={4} className="mb-3">
  <Form.Group controlId="department">
    <Form.Label>Department:</Form.Label>
    <select
      className='s13 form-control Job_Input' 
      name="department"
      value={formData.department}
      onChange={handleInputChange}
      placeholder="Enter Department"
      required
    >
      <option value="">Select Department</option>
      <option value="Department 1">Department 1</option>
      <option value="Department 2">Department 2</option>
    </select>
  </Form.Group>
</Col>
<Col md={4} className="mb-3">
  <Form.Group controlId="subDepartment">
    <Form.Label>Sub Department:</Form.Label>
    <select
      className='s13 form-control Job_Input' 
      name="subDepartment"
      value={formData.subDepartment}
      onChange={handleInputChange}
      placeholder="Enter Sub Department"
      required
    >
      <option value="">Select Sub Department</option>
      <option value="Sub Department 1">Sub Department 1</option>
      <option value="Sub Department 2">Sub Department 2</option>
    </select>
  </Form.Group>
</Col>
<Col md={4} className="mb-3">
  <Form.Group controlId="shiftTiming">
    <Form.Label>Shift Timing:</Form.Label>
    <select
      className='s13 form-control Job_Input' 
      name="shiftTiming"
      value={formData.shiftTiming}
      onChange={handleInputChange}
      placeholder="Enter Shift Timing"
      required
    >
      <option value="">Select Shift Timing</option>
      <option value="Morning">Morning</option>
      <option value="Afternoon">Afternoon</option>
      <option value="Evening">Evening</option>
    </select>
  </Form.Group>
</Col>
<Col md={4} className="mb-3">
  <Form.Group controlId="zone">
    <Form.Label>Zone:</Form.Label>
    <select
      className='s13 form-control Job_Input' 
      name="zone"
      value={formData.zone}
      onChange={handleInputChange}
      placeholder="Enter Zone"
      required
    >
      <option value="">Select Zone</option>
      <option value="Zone 1">Zone 1</option>
      <option value="Zone 2">Zone 2</option>
    </select>
  </Form.Group>
</Col>
<Col md={4} className="mb-3">
  <Form.Group controlId="employeeLevel">
    <Form.Label>Employee Level:</Form.Label>
    <select
      className='s13 form-control Job_Input' 
      name="employeeLevel"
      value={formData.employeeLevel}
      onChange={handleInputChange}
      placeholder="Select Employee Level"
      required
    >
      <option value="">Select Employee Level</option>
      <option value="Level 1">Level 1</option>
      <option value="Level 2">Level 2</option>
      {/* Add more options as needed */}
    </select>
  </Form.Group>
</Col>
<Col md={4} className="mb-3">
  <Form.Group controlId="jobLocation">
    <Form.Label>Job Location:</Form.Label>
    <Form.Control
      className="Job_Input"
      type="text"
      name="jobLocation"
      value={formData.jobLocation}
      onChange={handleInputChange}
      placeholder="Enter your job location"
      pattern="[A-Za-z0-9 ]+"
      title="Please enter only letters, numbers, and spaces"
      required
    />
  </Form.Group>
</Col>
<Col md={4} className="mb-3">
  <Form.Group controlId="biometricId">
    <Form.Label>Biometric ID:</Form.Label>
    <Form.Control
      className="Job_Input"
      type="text"
      name="biometricId"
      value={formData.biometricId}
      onChange={handleInputChange}
      placeholder="Enter your biometric ID"
      pattern="[A-Za-z0-9]+"
      title="Please enter only letters and numbers"
      required
    />
  </Form.Group>
  
</Col>
<Col md={4} className="mb-3">
            <Form.Group controlId="ctc">
              <Form.Label>CTC:</Form.Label>
              <Form.Control
                className="Job_Input"
                type="number"
                name="ctc"
                value={formData.ctc}
                onChange={handleInputChange}
                placeholder="Enter your CTC"
                pattern="[0-9]+"
                title="Please enter only numbers"
                required
              />
            </Form.Group>
          </Col>
          <div>
          <button className='btn btn-primary ' style={{ marginLeft: "22cm", marginTop: "-2cm" }} type="submit">Next</button>
          </div>
          </Row>
            {/* <div>
              
            </div> */}
          </Form>
        </div>
      </div>
    </>
  );
};

export default S_JobInformation;
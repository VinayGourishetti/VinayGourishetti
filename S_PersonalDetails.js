import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Row, Col } from 'react-bootstrap';
import "./Job.css";
import { NavLink } from "react-router-dom";
import { BiDownArrow } from "react-icons/bi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const S_PersonalDetails = () => {
  const { state } = useLocation();
  const JobInformation = state && state.formData;
  const initialFormData = {
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    age: '',
    
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

  const navigate=useNavigate();
  const handleNextClick = () => {
    const requiredFields = ['firstName', 'lastName', 'dob', 'gender', 'bloodGroup', 'age'];
  
   
    const missingFields = requiredFields.filter(field => !formData[field]);
  
    if (missingFields.length === 0) {
     
      // console.log("Form data:", formData);
      
      navigate("/Contact", { state: {JobInformation: JobInformation, PersonalDetails: formData } });
    } else {
      
      console.log("Please fill in all required fields:", missingFields);
     
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="Profile_container1 row" style={{ width: "8cm", backgroundColor: "lightgrey", height: "100vh", marginTop: "0.3cm", borderRadius: "10px" }}>
        <div className="col-md-3">
        <img className="Admin_Img" src={imageUrl} alt="" id='photo'style={{marginLeft:'70px',marginTop:"50px",height:"130px", width:"130px",borderRadius:"50%"}} />
              <input type='file' id='file' onChange={handleChangeFile}></input>
              <label htmlFor='file' id='uploadbtn' 
                style={{
                  position:"absolute",
                  height:"25px", 
                  width:"25px", 
                  cursor:"pointer", 
                  borderRadius:"50%",
                  marginLeft:"167px",
                  marginTop:"-27px",
                  backgroundColor:'rgba(75, 73, 73, 0.801)',
                  }}>
                <FontAwesomeIcon icon={faCamera} 
                    style={{marginLeft:'4.2px', marginBottom:"1.3px",}} 
                />
                </label>
              <h5 style={{ color: 'green', marginTop: '20px', textAlign: 'center' }}>
             
              </h5>
        </div>
        <div>
          <div className="col-md-9">
            <h6 className="mt-3" style={{ marginLeft: "65px", marginBottom: "380px" }}>Name:CH.SUMANTH</h6>
          </div>
        </div>
      </div>
      <div className="container card w-75" style={{ marginLeft: "8cm", marginTop: "-16cm", height: "100vh" }}>
        <div className="header d-flex justify-content-center mb-3">
          <h2 className='text-primary'>Employee Registration</h2>
        </div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink to="/S_JobInformation" activeClassName="active-link" className="nav-link text-primary">JobInformation</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/S_PersonalDetails" activeClassName="active-link" className="nav-link text-primary">PersonalDetails<span className='text-warning-emphasis'><BiDownArrow /></span></NavLink>
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
        <Row>
          <h3 className='text-primary' id='PersonalDetails'>Personal Details</h3>
          <Col md={4} className="mb-3">
            <Form.Group controlId="firstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                pattern="[A-Za-z ]+"
                title="Please enter only letters"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group controlId="lastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                pattern="[A-Za-z]+"
                title="Please enter only letters"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control
                type='date'
                value={formData.dob}
                onChange={handleDateChange}
                placeholder="Select Date Of Birth"
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group controlId="age">
              <Form.Label>Age:</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                placeholder="Age Will Be Auto Calculated"
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group controlId="gender">
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group controlId="bloodGroup">
              <Form.Label>Blood Group:</Form.Label>
              <Form.Control
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                placeholder="Enter your blood group"
                pattern="[A-Za-z]+"
                title="Please enter only letters"
                required
              />
            </Form.Group>
          </Col>
         
          <div><br />
            <button className='btn btn-primary ' style={{ marginLeft: "22cm" }} onClick={handleNextClick}>Next</button>
          </div>
        </Row>
      </div>
    </>
  );
};

export default S_PersonalDetails;

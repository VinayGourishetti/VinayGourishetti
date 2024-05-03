import React, { useState } from 'react';
import { useLocation ,useNavigate } from "react-router-dom";
import { Form, Row, Col } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import "./Job.css";
import { NavLink } from "react-router-dom";
import { BiDownArrow } from "react-icons/bi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const S_Contact = () => {
  const {state}=useLocation();
const JobInformation = state && state.JobInformation;
const PersonalDetails = state && state.PersonalDetails;

  const initialFormData = {
    email: '',
    countryCode: '+1',
    phoneNumber: '',
    alternatePhoneNo: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
  
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    
    const regex = /^\+?[1-9]\d{1,14}$/; 
    return regex.test(phoneNumber);
  };

  const validateAlternatePhoneNo = (alternatePhoneNo) => {
    
    const regex = /^\+?[1-9]\d{1,14}$/; 
    return regex.test(alternatePhoneNo);
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
    const requiredFields = ['email','countryCode','phoneNumber','alternatePhoneNo'];
  

    const missingFields = requiredFields.filter(field => !formData[field]);
  
    if (missingFields.length === 0) {
      
      // console.log("Form data:", formData);
      
      navigate("/Qualification", { state: {PersonalDetails: PersonalDetails,Contact: formData, JobInformation: JobInformation } });
    } else {
     
      console.log("Please fill in all required fields:", missingFields);
     
      setShowModal(true);
    }
  };
  return (
    <>
    
    <div className="Profile_container1 row" style={{width:"8cm",backgroundColor:"lightgrey",height:"100vh",marginTop:"0.3cm", borderRadius:"10px"}}>
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
      <h6 className="mt-3" style={{marginLeft:"65px",marginBottom:"380px"}}>Name:CH.SUMANTH</h6>
     
        </div>
        </div>
        </div>
     
    <div className="container card w-75" style={{marginLeft:"8cm",marginTop:"-16cm",height:"100vh"}}>
      <div className="header d-flex justify-content-center mb-3">
        <h2 className='text-primary'>Employee Registration</h2>
      </div>

      <header>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <NavLink to="/S_JobInformation" activeClassName="active-link" className="nav-link text-primary">JobInformation</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/S_PersonalDetails" activeClassName="active-link" className="nav-link text-primary">PersonalDetails</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/S_Contact" activeClassName="active-link" className="nav-link text-primary">Contact<span className='text-warning-emphasis'><BiDownArrow /></span></NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/S_Qualification" activeClassName="active-link" className="nav-link text-primary">Qualification</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/S_Experience" activeClassName="active-link" className="nav-link text-primary">Experience</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/S_Address" activeClassName="active-link" className="nav-link text-primary">Address</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/S_BankDetails" activeClassName="active-link" className="nav-link text-primary">BankDetails</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/S_Identification" activeClassName="active-link" className="nav-link text-primary">Identification</NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </header>
          <Col>
            <h3 className='text-primary' id='Contact'>Contact</h3>
            <Col md={4} xs={12} className="mb-3">
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
            style={{ width: "100%" }}
            onBlur={(e) => {
              if (!validateEmail(e.target.value)) {
                setFormData({ ...formData, email: '' });
              }
            }}
          />
        </Form.Group>
      </Col>

      <Col md={4} xs={12} className="mb-3">
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number:</Form.Label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Select
              name="countryCode"
              style={{ width: '100px', marginRight: "0.5rem" }}
              value={formData.countryCode}
              onChange={handleInputChange}
            >
              <option value="+1">+1 (United States)</option>
              <option value="+44">+44 (United Kingdom)</option>
              <option value="+91">+91 (India)</option>
            </Form.Select>
            <Form.Control
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
              style={{ width: "calc(100% - 100px)" }}
              onBlur={(e) => {
                if (!validatePhoneNumber(e.target.value)) {
                  setFormData({ ...formData, phoneNumber: '' });
                }
              }}
            />
          </div>
        </Form.Group>
      </Col>

      <Col md={4} xs={12} className="mb-3">
        <Form.Group controlId="alternatePhoneNo">
          <Form.Label>Alternate Phone No:</Form.Label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Select
              name="countryCode"
              style={{ width: '100px', marginRight: "0.5rem" }}
              value={formData.countryCode}
              onChange={handleInputChange}
            >
              <option value="+1">+1 (United States)</option>
              <option value="+44">+44 (United Kingdom)</option>
              <option value="+91">+91 (India)</option>
            </Form.Select>
            <Form.Control
              type="number"
              name="alternatePhoneNo"
              value={formData.alternatePhoneNo}
              onChange={handleInputChange}
              placeholder="Enter Alternate Phone No"
              style={{ width: "calc(100% - 100px)" }}
              onBlur={(e) => {
                if (!validateAlternatePhoneNo(e.target.value)) {
                  setFormData({ ...formData, alternatePhoneNo: '' });
                }
              }}
            />
          </div>
        </Form.Group>
      </Col>
            <div><br/>
  <button className='btn btn-primary 'style={{marginLeft:"22cm"}} onClick={handleNextClick}>Next</button>
</div>
          </Col>
        </div>
     
    </>
  );
};

export default S_Contact;

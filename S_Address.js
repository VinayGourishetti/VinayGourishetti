import React, { useState } from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import { Form, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap'; // Importing a component from react-bootstrap

import "./Job.css";
import { NavLink } from "react-router-dom";
import { BiDownArrow } from "react-icons/bi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const S_Address = () => {
  const {state}=useLocation();
  const JobInformation = state && state.JobInformation;
  const PersonalDetails = state && state.PersonalDetails;
  const Contact = state && state.Contact;
  const Qualification = state && state.Qualification;
  const Experience = state && state.Experience;
 
  const initialFormData = {
    hnoFlat: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalcode: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedFields, setSelectedFields] = useState([initialFormData]);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
      const updatedFields = [...selectedFields];
      updatedFields[index][name] = value;
      setSelectedFields(updatedFields);
   
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
    const requiredFields = ['hnoFlat','street','city','state','country','postalcode'];
  
  
    const missingFields = selectedFields.some(field => {
      return requiredFields.some(key => !field[key]);
    });
      
      // console.log("Form data:", formData);
      if (!missingFields) {

      navigate("/BankDetails", { state: {JobInformation: JobInformation,
        PersonalDetails: PersonalDetails,
        Contact: Contact,
        Qualification: Qualification,
        Experience: Experience,
        Address:  selectedFields } 
      });
    } else {
      
      console.log("Please fill in all required fields:", missingFields);
     
      setShowModal(true);
    }
  };
  
  const handleAddField = () => {
    setSelectedFields(prevFields => [...prevFields, initialFormData]);
  };

  const handleRemoveField = (index) => {
    setSelectedFields(prevFields => {
      const updatedFields = [...prevFields];
      updatedFields.splice(index, 1);
      return updatedFields;
    });
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
                  <NavLink to="/S_Contact" activeClassName="active-link" className="nav-link text-primary">Contact</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/S_Qualification" activeClassName="active-link" className="nav-link text-primary">Qualification</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/S_Experience" activeClassName="active-link" className="nav-link text-primary">Experience</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/S_Address" activeClassName="active-link" className="nav-link text-primary">Address<span className='text-warning-emphasis'><BiDownArrow /></span></NavLink>
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
        <Row>
            <div  className='d-flex justify-content-end'>
            <button
            className="btn btn-primary " style={{ marginLeft: "630px" }}
            onClick={handleAddField}
            >
            Add Field
            </button>
          </div>

        </Row>

      <>
          <Row>
           
            {selectedFields.map((field, index) => (
              <div className="row" key={index}>
        <h3 className='text-primary' id='Address'>Address</h3>
        <Col md={4} className="mb-3">
          <Form.Group controlId="hnoFlat">
            <Form.Label>Hno/Flat:</Form.Label>
            <Form.Control
              type="text"
              name="hnoFlat"
              value={field.hnoFlat}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter your Hno/Flat"
              pattern="[A-Za-z0-9 ]+"
              title="Please enter only letters and numbers"
              required
            />
          </Form.Group>
        </Col>
        <Col md={4} className="mb-3">
          <Form.Group controlId="street">
            <Form.Label>Street:</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={field.street}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter your street"
              pattern="[A-Za-z0-9 ]+"
              title="Please enter only letters and numbers"
              required
            />
          </Form.Group>
        </Col>
        <Col md={4} className="mb-3">
          <Form.Group controlId="city">
            <Form.Label>City:</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={field.city}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter your city"
              pattern="[A-Za-z ]+"
              title="Please enter only letters"
              required
            />
          </Form.Group>
        </Col>
        <Col md={4} className="mb-3">
          <Form.Group controlId="state">
            <Form.Label>State:</Form.Label>
            <select
              className='s13 form-control'
              type="text" 
              name="state"
              value={field.state}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter State"
            >
              <option value="">Select State</option>
              <option value="State 1">State 1</option>
              <option value="State 2">State 2</option>
            </select>
          </Form.Group>
        </Col>
        <Col md={4} className="mb-3">
          <Form.Group controlId="country">
            <Form.Label>Country:</Form.Label>
            <select
              className='s13 form-control'
              type="text"
              name="country"
              value={field.country}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter Country"
            >
              <option value="">Select Country</option>
              <option value="Country 1">Country 1</option>
              <option value="Country 2">Country 2</option>
            </select>
          </Form.Group>
        </Col>
        <Col md={4} className="mb-3">
          <Form.Group controlId="postalcode">
            <Form.Label>PostalCode:</Form.Label>
            <Form.Control
            type="number"
              name="postalcode"
              value={field.postalcode}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Enter your postalcode"
              pattern="[0-9]{6}"
              title="Please enter a valid 6-digit postalcode"
              required
            />
          </Form.Group>
          </Col>
          <div className="col-md-12 mb-3 d-flex justify-content-end">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveField(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

           
          </Row>
        </>
        <div style={{ margin: "20px" }}>
          <button className='btn btn-primary ' style={{ float: "right" }} onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </>
  );
};

export default S_Address;

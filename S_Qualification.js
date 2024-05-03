import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Row, Col } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { BiDownArrow } from "react-icons/bi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const S_Qualification = () => {
  const { state } = useLocation();
  const JobInformation = state && state.JobInformation;
  const PersonalDetails = state && state.PersonalDetails;
  const Contact = state && state.Contact;
  const initialFormData = {
    educationBoard: '',
    qualification: '',
    stream: '',
    collegeName: '',
    yearOfPassing: '',
    cgpaOrPercentage: ''
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

  const navigate = useNavigate();

  const handleNextClick = () => {
    const requiredFields = ['educationBoard', 'qualification', 'stream', 'collegeName', 'yearOfPassing', 'cgpaOrPercentage'];

    const missingFields = selectedFields.some(field => {
      return requiredFields.some(key => !field[key]);
    });

    if (!missingFields) {
      navigate("/Experience", {
        state: {
          JobInformation:JobInformation,
          PersonalDetails:PersonalDetails,
          Contact:Contact,
          Qualification: selectedFields
        }
      });
    } else {
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
      <div className="Profile_container1 row" style={{ width: "8cm", backgroundColor: "lightgrey", height: "100vh", marginTop: "0.3cm", borderRadius: "10px" }}>
        <div className="col-md-3">
          <img className="Admin_Img" src={imageUrl} alt="" id='photo' style={{ marginLeft: '70px', marginTop: "50px", height: "130px", width: "130px", borderRadius: "50%" }} />
          <input type='file' id='file' onChange={handleChangeFile}></input>
          <label htmlFor='file' id='uploadbtn'
            style={{
              position: "absolute",
              height: "25px",
              width: "25px",
              cursor: "pointer",
              borderRadius: "50%",
              marginLeft: "167px",
              marginTop: "-27px",
              backgroundColor: 'rgba(75, 73, 73, 0.801)',
            }}>
            <FontAwesomeIcon icon={faCamera}
              style={{ marginLeft: '4.2px', marginBottom: "1.3px", }}
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

      <div className="container card w-75" style={{ marginLeft: "8cm", marginTop: "-16cm" }}>
        <div className="header d-flex justify-content-center mb-3">
          <h2 className='text-primary'>Employee Registration</h2>

        </div>

        <header>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <NavLink to="/JobInformation" activeClassName="active-link" className="nav-link text-primary">JobInformation</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/PersonalDetails" activeClassName="active-link" className="nav-link text-primary">PersonalDetails</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/Contact" activeClassName="active-link" className="nav-link text-primary">Contact</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/Qualification" activeClassName="active-link" className="nav-link text-primary">Qualification<span className='text-warning-emphasis'><BiDownArrow /></span></NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/Experience" activeClassName="active-link" className="nav-link text-primary">Experience</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/Address" activeClassName="active-link" className="nav-link text-primary">Address</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/BankDetails" activeClassName="active-link" className="nav-link text-primary">BankDetails</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/Identification" activeClassName="active-link" className="nav-link text-primary">Identification</NavLink>
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
                <h3 className='text-primary' id='Qualification'>Qualification</h3>
                <Col md={4} className="mb-3">
                  <Form.Group controlId={`educationBoard${index}`}>
                    <Form.Label>Education Board:</Form.Label>
                    <Form.Control
                      type="text"
                      name="educationBoard"
                      value={field.educationBoard}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="Enter education board"
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId={`qualification${index}`}>
                    <Form.Label>Qualification:</Form.Label>
                    <Form.Control
                      type="text"
                      name="qualification"
                      value={field.qualification}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="Enter your qualification"
                      pattern="[A-Za-z ]+"
                      title="Please enter only letters"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId={`stream${index}`}>
                    <Form.Label>Stream:</Form.Label>
                    <Form.Control
                      type="text"
                      name="stream"
                      value={field.stream}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="Enter your stream"
                      pattern="[A-Za-z ]+"
                      title="Please enter only letters"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId={`collegeName${index}`}>
                    <Form.Label>College Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="collegeName"
                      value={field.collegeName}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="Enter your college name"
                      pattern="[A-Za-z ]+"
                      title="Please enter only letters"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId={`yearOfPassing${index}`}>
                    <Form.Label>Year of Passing:</Form.Label>
                    <Form.Control
                      type="number"
                      name="yearOfPassing"
                      value={field.yearOfPassing}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="Enter your year of passing"
                      title="Please enter a valid year"
                      onBlur={(e) => {

                      }}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId={`cgpaOrPercentage${index}`}>
                    <Form.Label>CGPA Or Percentage:</Form.Label>
                    <Form.Control
                      type="text"
                      name="cgpaOrPercentage"
                      value={field.cgpaOrPercentage}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="Enter your CGPA or Percentage"
                      min="0"
                      max="100"
                      step="0.01"
                      title="Please enter a valid CGPA or Percentage"
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

export default S_Qualification;

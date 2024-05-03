import React, { useState } from 'react';
import { useLocation,useNavigate  } from "react-router-dom";
import { Form, Row, Col } from 'react-bootstrap';

import "./Job.css";
import { NavLink } from "react-router-dom";
import { BiDownArrow } from "react-icons/bi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const S_BankDetails = () => {
  const {state}=useLocation();
  const JobInformation = state && state.JobInformation;
  const PersonalDetails = state && state.PersonalDetails;
  const Contact = state && state.Contact;
  const Qualification = state && state.Qualification;
  const Experience = state && state.Experience;
  const Address = state && state.Address;

  const initialFormData = {
    accountNo: '',
    ifscCode: '',
    bankName:'',
    branchName: ''
  };

  const [formData, setFormData] = useState({
    accountNo: null,
    ifscCode: '',
    bankName:'',
    branchName: ''
  },
  );
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateAccountNumber = (accountNo) => {
    
    const regex = /^\d{8,16}$/; 
    return regex.test(accountNo);
  };

  const validateIFSCCode = (ifscCode) => {
    
    const regex = /^[A-Za-z]{4}\d{7}$/;
    return regex.test(ifscCode);
  };

  const validateBranch = (branch) => {
    return branch.trim() !== ''; 
  };

  const validateBankName = (branch) => {
    return branch.trim() !== ''; 
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
    const requiredFields = ['accountNo','ifscCode','bankName','branchName'];
  
    
    const missingFields = requiredFields.filter(field => !formData[field]);
  
    if (missingFields.length === 0) {
      
      // console.log("Form data:", formData);
     
      navigate("/Identification", { state: {JobInformation: JobInformation,PersonalDetails: PersonalDetails,Contact: Contact,Qualification: Qualification,
        Experience: Experience,Address: Address,BankDetails:  formData } });
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
                  <NavLink to="/S_Contact" activeClassName="active-link" className="nav-link text-primary">Contact</NavLink>
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
                  <NavLink to="/S_BankDetails" activeClassName="active-link" className="nav-link text-primary">BankDetails<span className='text-warning-emphasis'><BiDownArrow /></span></NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to="/S_Identification" activeClassName="active-link" className="nav-link text-primary">Identification</NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      <Row>
        <h3 className='text-primary' id='Bank Details'>Bank Details</h3>
        <Col md={4} className="mb-3">
          <Form.Group controlId="accountNo">
            <Form.Label>Account Number:</Form.Label>
            <Form.Control
              type="number"
              name="accountNo"
              value={formData.accountNo}
              onChange={handleInputChange}
              placeholder="Enter your account number"
              onBlur={(e) => {
                if (!validateAccountNumber(e.target.value)) {
                  setFormData({ ...formData, accountNo: '' });
                }
              }}
            />
          </Form.Group>
        </Col>
        <Col md={4} className="mb-3">
          <Form.Group controlId="ifscCode">
            <Form.Label>IFSC Code:</Form.Label>
            <Form.Control
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleInputChange}
              placeholder="Enter IFSC Code"
              pattern="[A-Za-z0-9]+"
              title="Please enter only letters and numbers"
              maxLength={11} // Assuming IFSC code length is 11 characters
              minLength={11} // Assuming IFSC code length is 11 characters
              onBlur={(e) => {
                if (!validateIFSCCode(e.target.value)) {
                  setFormData({ ...formData, ifscCode: '' });
                }
              }}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4} className="mb-3">
  <Form.Group controlId="bankName">
    <Form.Label>Bank Name:</Form.Label>
    <Form.Control
      type="text"
      name="bankName"
      value={formData.bankName}
      onChange={handleInputChange}
      placeholder="Enter your bank name"
      title="Please enter only letters"
      onBlur={(e) => {
        if (!validateBankName(e.target.value)) {
          setFormData({ ...formData, bankName: '' });
        }
      }}
      required
    />
  </Form.Group>
</Col>

        <Col md={4} className="mb-3">
          <Form.Group controlId="branchName">
            <Form.Label>Branch Name:</Form.Label>
            <Form.Control
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleInputChange}
              placeholder="Enter your branchName"
              title="Please enter only letters "
              onBlur={(e) => {
                if (!validateBranch(e.target.value)) {
                  setFormData({ ...formData, branchName: '' });
                }
              }}
              required
            />
          </Form.Group>
        </Col>
        <div><br/>
  <button className='btn btn-primary 'style={{marginLeft:"22cm"}} onClick={handleNextClick}>Next</button>
</div>
      </Row>
    </div>
    </>
  );
};

export default S_BankDetails;

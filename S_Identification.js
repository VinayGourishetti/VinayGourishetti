// 
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { Form, Row, Col, Button } from 'react-bootstrap';
import "./Job.css";
import { NavLink } from "react-router-dom";
import { BiDownArrow } from "react-icons/bi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';


const S_Identification = () => {
  const { state } = useLocation();
  const JobInformation = state && state.JobInformation;
  let PersonalDetails = state && state.PersonalDetails; 

  const Contact = state && state.Contact; 
  const Qualification = state && state.Qualification;
  const Experience = state && state.Experience;
  const Address = state && state.Address;
  const BankDetails = state && state.BankDetails;

  const phoneNumberCountryCode = Contact ? Contact.countryCode : '';
  const phoneNumber = Contact ? Contact.phoneNumber : '';
  const alternatePhoneNo = Contact ? Contact.alternatePhoneNo : '';
  const email = Contact ? Contact.email : '';

  PersonalDetails = {
    ...PersonalDetails,
    phoneNumberCountryCode,
    phoneNumber,
    alternatePhoneNo,
    email

};


  const initialFormData = {
    identificationType: '',
    identificationNumber: '',
    identificationFile: null,
    panCard: '',
    aadharCard: '',
    aadharCardFile: null
  };

  

  const [formData, setFormData] = useState(initialFormData);
  const [imageUrl, setImageUrl] = useState("https://cdn-icons-png.flaticon.com/128/236/236832.png");

 const employeeData ={
    PersonalDetails,
    employeeJobInformation: JobInformation,
    employeeQualifications: Qualification,
    employeeBankDetails: BankDetails,
    employeeExperience: Experience,
    address: Address
  }
  console.log("Employee",employeeData)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleIdentificationChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextClick = () => {
    console.log("Next button clicked");
  };

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

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Form data:", formData);
  
      const response = await fetch("http://localhost:8002/api-v2/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });
  
      if (response.ok) {
        console.log("Form submitted successfully!");
        window.alert("Employee registration successful!"); 
        console.log("Form submission failed.");
        window.alert("Employee registration failed. Please try again."); 
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
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
                  <NavLink to="/S_Identification" activeClassName="active-link" className="nav-link text-primary">Identification<span className='text-warning-emphasis'><BiDownArrow /></span></NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <Row>
          <h3 className='text-primary' id='Identification'>Identification</h3>
          <Col md={4} className="mb-3">
            <Form.Group controlId="identificationType">
              <Form.Label>Identification Type:</Form.Label>
              <select
                className='s13 form-control'
                name="identificationType"
                value={formData.identificationType}
                onChange={handleIdentificationChange}
              >
                <option value="">Select</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Aadhar Card">Aadhar Card</option>
              </select>
            </Form.Group>
          </Col>
          {formData.identificationType === "PAN Card" && (
            <Col md={4} className="mb-3">
              <Form.Group controlId="panCardNo">
                <Form.Label>PAN Card No:</Form.Label>
                <Form.Control
                  type="text"
                  name="panCard"
                  value={formData.panCard}
                  onChange={handleInputChange}
                  placeholder="Enter PAN Card Number"
                />
              </Form.Group>
            </Col>
          )}
          {formData.identificationType === "PAN Card" && (
            <Col md={4} className="mb-3">
              <Form.Group controlId="chosenFile">
                <Form.Label>Choose File:</Form.Label>
                <Form.Control
                  type="file"
                  name="identificationFile"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                />
              </Form.Group>
            </Col>
          )}
          {formData.identificationType === "Aadhar Card" && (
            <Col md={4} className="mb-3">
              <Form.Group controlId="aadharCardNo">
                <Form.Label>Aadhar Card No:</Form.Label>
                <Form.Control
                  type="number"
                  name="aadharCard"
                  value={formData.aadharCard}
                  onChange={handleInputChange}
                  placeholder="Enter Aadhar Card Number"
                />
              </Form.Group>
            </Col>
          )}
          {formData.identificationType === "Aadhar Card" && (
            <Col md={4} className="mb-3">
              <Form.Group controlId="chosenAadharFile">
                <Form.Label>Choose File:</Form.Label>
                <Form.Control
                  type="file"
                  name="aadharCardFile"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                />
              </Form.Group>
            </Col>
          )}
        </Row>
        <div className="button-section mb-3 d-flex justify-content-center">
          <Button type="submit" className="btn btn-success me-3" onClick={handleSubmit}>Register</Button>
          <Button type="button" className="btn bnt-danger">Cancel</Button>
        </div>
      </div>
    </>
  );
};

export default S_Identification;


// import React, { useState } from 'react';
// import { useLocation } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import { Form, Row, Col, Button } from 'react-bootstrap';
// import { NavLink } from "react-router-dom";
// import { BiDownArrow } from "react-icons/bi";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCamera } from '@fortawesome/free-solid-svg-icons';

// const Identification = () => {
//   const history = useHistory();
//   const { state } = useLocation();
//   const JobInformation = state && state.JobInformation;
//   let PersonalDetails = {};
//   const Contact = state && state.Contact ? state.Contact : {};
//   const Qualification = state && state.Qualification;
//   const Experience = state && state.Experience;
//   const Address = state && state.Address;
//   const BankDetails = state && state.BankDetails;

//   PersonalDetails = {
//     ...PersonalDetails,
//     phoneNumberCountryCode: Contact.countryCode,
//     phoneNumber: Contact.phoneNumber,
//     alternativePhoneNo: Contact.alternatePhoneNo,
//     email: Contact.email
//   }

//   const initialFormData = {
//     identificationType: '',
//     identificationNumber: '',
//     identificationFile: null,
//     panCard: '',
//     aadharCard: '',
//     aadharCardFile: null
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [imageUrl, setImageUrl] = useState("https://cdn-icons-png.flaticon.com/128/236/236832.png");

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileInputChange = (event) => {
//     const { name, files } = event.target;
//     setFormData({ ...formData, [name]: files[0] });
//   };

//   const handleIdentificationChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleChangeFile = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();

//       reader.onload = () => {
//         setImageUrl(reader.result);
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Validate form function here
//     try {
//       const response = await fetch("http://localhost:8081/api-v2/employee", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           employee: {
//             fullName: PersonalDetails.fullName,
//             contactNo: PersonalDetails.contactNo,
//             email: PersonalDetails.email,
//             address: PersonalDetails.address,
//             // Add other fields as needed
//           },
//           role: 'Employee', // Example role
//           employeeEducation: [
//             {
//               collegeName: Qualification.collegeName,
//               qualification: Qualification.qualification,
//               yearOfPassing: Qualification.yearOfPassing
//             }
//           ],
//           bankDetails: {
//             bankName: BankDetails.bankName,
//             accountNo: BankDetails.accountNo,
//             ifscCode: BankDetails.ifscCode,
//             branchName: BankDetails.branchName
//           },
//           experience: [
//             {
//               companyName: Experience.companyName,
//               role: Experience.role,
//               designation: Experience.designation,
//               totalExp: Experience.totalExp,
//               realExp: Experience.realExp
//             }
//           ]
//         }),
//       });

//       if (response.ok) {
//         console.log("Form submitted successfully!");
//         history.push("/ViewEmployeeHRD");
//       } else {
//         console.log("Form submission failed.");
//       }
//     } catch (error) {
//       console.error("Error during form submission:", error);
//     }
//   };

//   return (
//     <>
//        <div className="Profile_container1 row" style={{ width: "8cm", backgroundColor: "lightgrey", height: "100vh", marginTop: "0.3cm", borderRadius: "10px" }}>
//         <div className="col-md-3">
//           <img className="Admin_Img" src={imageUrl} alt="" id='photo' style={{ marginLeft: '70px', marginTop: "50px", height: "130px", width: "130px", borderRadius: "50%" }} />
//           <input type='file' id='file' onChange={handleChangeFile}></input>
//           <label htmlFor='file' id='uploadbtn'
//             style={{
//               position: "absolute",
//               height: "25px",
//               width: "25px",
//               cursor: "pointer",
//               borderRadius: "50%",
//               marginLeft: "167px",
//               marginTop: "-27px",
//               backgroundColor: 'rgba(75, 73, 73, 0.801)',
//             }}>
//             <FontAwesomeIcon icon={faCamera}
//               style={{ marginLeft: '4.2px', marginBottom: "1.3px", }}
//             />
//           </label>
//           <h5 style={{ color: 'green', marginTop: '20px', textAlign: 'center' }}>
//           </h5>
//         </div>
//         <div>
//           <div className="col-md-9">
//             <h6 className="mt-3" style={{ marginLeft: "65px", marginBottom: "380px" }}>Name:CH.SUMANTH</h6>
//           </div>
//         </div>
//       </div>

//       <div className="container card w-75" style={{ marginLeft: "8cm", marginTop: "-16cm", height: "100vh" }}>
//         <div className="header d-flex justify-content-center mb-3">
//           <h2 className='text-primary'>Employee Registration</h2>
//         </div>

//         <header>
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav mr-auto">
//                 <li className="nav-item">
//                   <NavLink to="/JobInformation" activeClassName="active-link" className="nav-link text-primary">JobInformation</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/PersonalDetails" activeClassName="active-link" className="nav-link text-primary">PersonalDetails</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/Contact" activeClassName="active-link" className="nav-link text-primary">Contact</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/Qualification" activeClassName="active-link" className="nav-link text-primary">Qualification</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/Experience" activeClassName="active-link" className="nav-link text-primary">Experience</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/Address" activeClassName="active-link" className="nav-link text-primary">Address</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/BankDetails" activeClassName="active-link" className="nav-link text-primary">BankDetails</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink to="/Identification" activeClassName="active-link" className="nav-link text-primary">Identification<span className='text-warning-emphasis'><BiDownArrow /></span></NavLink>
//                 </li>
//               </ul>
//             </div>
//           </nav>
//         </header>


//         <Row>
//           <h3 className='text-primary' id='Identification'>Identification</h3>
//           <Col md={4} className="mb-3">
//             <Form.Group controlId="identificationType">
//               <Form.Label>Identification Type:</Form.Label>
//               <select
//                 className='s13 form-control'
//                 name="identificationType"
//                 value={formData.identificationType}
//                 onChange={handleIdentificationChange}
//               >
//                 <option value="">Select</option>
//                 <option value="PAN Card">PAN Card</option>
//                 <option value="Aadhar Card">Aadhar Card</option>
//               </select>
//             </Form.Group>
//           </Col>
//           {/* Depending on selected identification type, show respective fields */}
//           {formData.identificationType === "PAN Card" && (
//             <>
//               <Col md={4} className="mb-3">
//                 <Form.Group controlId="panCardNo">
//                   <Form.Label>PAN Card No:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="panCard"
//                     value={formData.panCard}
//                     onChange={handleInputChange}
//                     placeholder="Enter PAN Card Number"
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4} className="mb-3">
//                 <Form.Group controlId="chosenFile">
//                   <Form.Label>Choose File:</Form.Label>
//                   <Form.Control
//                     type="file"
//                     name="identificationFile"
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     onChange={handleFileInputChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </>
//           )}
//           {formData.identificationType === "Aadhar Card" && (
//             <>
//               <Col md={4} className="mb-3">
//                 <Form.Group controlId="aadharCardNo">
//                   <Form.Label>Aadhar Card No:</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="aadharCard"
//                     value={formData.aadharCard}
//                     onChange={handleInputChange}
//                     placeholder="Enter Aadhar Card Number"
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4} className="mb-3">
//                 <Form.Group controlId="chosenAadharFile">
//                   <Form.Label>Choose File:</Form.Label>
//                   <Form.Control
//                     type="file"
//                     name="aadharCardFile"
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     onChange={handleFileInputChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </>
//           )}
//         </Row>
//         {/* Button section */}
//         <div className="button-section mb-3 d-flex justify-content-center">
//           <Button type="submit" className="btn btn-success me-3" onClick={handleSubmit}>Register</Button>
//           <Button type="button" className="btn btn-danger">Cancel</Button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Identification;

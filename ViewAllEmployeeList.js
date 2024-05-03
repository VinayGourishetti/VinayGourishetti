import React from 'react';
import Modal from 'react-modal';
import "./ViewAllEmployeeList.css";

// const View = ({ viewIsOpen, onRequestClose, selectedEmployee, handleCancelView }) => {
  const View = ({isOpen, onRequestClose ,selectedEmployee }) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="view-all-confirmation-dialog"
      overlayClassName="view-all-confirmation-overlay"
      
    >
      {selectedEmployee && (
        <div className="container">
          <div className="row">
            <div className="col">
              <h4 className="text-center p-2">Employee Details</h4>
              <div>
                <p>ID: {selectedEmployee.employeeId}</p>
                <p>Name: {selectedEmployee.fullName}</p>
                <p>Mobileno: {selectedEmployee.contactNo}</p>
                <p>Age: {selectedEmployee.age}</p>
              </div>
            </div>
            <div>
              <p>Date Of Birth: {selectedEmployee.dateOfBirth}</p>
              <p>Gender: {selectedEmployee.gender}</p>
              <p>Email: {selectedEmployee.email}</p>
              <p>bloodgroup: {selectedEmployee.bloodgroup}</p>
            </div>
          </div>

          {/* Education Details */}
          <h4 className="text-center p-2">Education Details</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>CollegeName</th>
                <th>Qualification</th>
                <th>Year Of Passing</th>
              </tr>
            </thead>
            <tbody>
              {selectedEmployee.employeeEducation && selectedEmployee.employeeEducation.map((education) => (
                <tr key={education.id}>
                  <td>{education.collegeName}</td>
                  <td>{education.qualification}</td>
                  <td>{education.yearOfPassing}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Experience Details */}
          <h4 className="text-center p-2">Experience Details</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Designation</th>
                <th>Total Experience</th>
              </tr>
            </thead>
            <tbody>
              {selectedEmployee.employeeExperience && selectedEmployee.employeeExperience.map((experience) => (
                <tr key={experience.id}>
                  <td>{experience.companyName}</td>
                  <td>{experience.designation}</td>
                  <td>{experience.totalExp}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Address Details */}
          <h4 className="text-center p-2">Address Details</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>House/Flat No</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Postal Code</th>
              </tr>
            </thead>
            <tbody>
              {selectedEmployee.address && selectedEmployee.address.map((address) => (
                <tr key={address.id}>
                  <td>{address.hnoOrFlat}</td>
                  <td>{address.street}</td>
                  <td>{address.city}</td>
                  <td>{address.state}</td>
                  <td>{address.country}</td>
                  <td>{address.postalCode}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bank details */}
          <h4 className="text-center p-2">Bank details</h4>
          <div>
            <p>Bank Name: {selectedEmployee.employeeBankDetails.bankName}</p>
            <p>Accountno: {selectedEmployee.employeeBankDetails.accountNo}</p>
            <p>Ifsccode: {selectedEmployee.employeeBankDetails.ifscCode}</p>
            <p>Branch: {selectedEmployee.employeeBankDetails.branchName}</p>
          </div>

          {/* Close button */}
          <div className="view-model text-center">
            <button className="btn btn-success" onClick={onRequestClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default View;

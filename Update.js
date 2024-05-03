import React, { useState} from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Update.css';

const Update = ({ employee, onCancel, onSubmit }) => {
    const [updatedEmployee, setUpdatedEmployee] = useState(employee);
  
    const handleInputChange = (field, value) => {
      setUpdatedEmployee((prevEmployee) => ({
        ...prevEmployee,
        [field]: value,
      }));
    };

    // Function to handle saving changes
  const handleSaveChanges = () => {
    // Call onSubmit function with updated employee data
    onSubmit(updatedEmployee);
    // Close the modal or perform any other necessary action
  };

  // Function to handle canceling view
  const handleCancelView = () => {
    // Call onCancel function if needed
    onCancel();
    // Close the modal or perform any other necessary action
  };


  return (
    <div className="container-fluid">
      

      <Modal
        isOpen={true} // Assuming the modal is always open
        onRequestClose={handleCancelView}
        className="view-confirmation-dialog"
        overlayClassName="view-confirmation-overlay"
        style={{
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '80%',
            maxHeight: '80%',
            overflow: 'auto',
          },
        }}
      >
        {updatedEmployee && (
          <div className="container">
            <h1 className="text-center">Employee Details</h1>

            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td>{updatedEmployee.employeeId}</td>
                  </tr>
                  <tr>
                    <th>Full Name</th>
                    <td>
                      <input
                        type="text"
                        value={updatedEmployee.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Contact No</th>
                    <td>
                      <input
                        type="text"
                        value={updatedEmployee.contactNo}
                        onChange={(e) => handleInputChange('contactNo', e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Blood Group</th>
                    <td>{updatedEmployee.bloodgroup}</td>
                  </tr>
                  <tr>
                    <th>Age</th>
                    <td>{updatedEmployee.age}</td>
                  </tr>
                  <tr>
                    <th>Gender</th>
                    <td>{updatedEmployee.gender}</td>
                  </tr>
                  <tr>
                    <th>Date of Birth</th>
                    <td>{updatedEmployee.dateOfBirth}</td>
                  </tr>
                  <tr>
                    <th>Designation</th>
                    <td>{updatedEmployee.designation}</td>
                  </tr>
                  <tr>
                    <th>Employee Role</th>
                    <td>{updatedEmployee.role}</td>
                  </tr>
                  <tr>
                    <th>Employee Type</th>
                    <td>{updatedEmployee.employeeType}</td>
                  </tr>
                  <tr>
                    <th>Date of Joining</th>
                    <td>{updatedEmployee.dateofjoining}</td>
                  </tr>
                  <tr>
                    <th>CTC</th>
                    <td>
                      <input
                        type="text"
                        value={updatedEmployee.ctc}
                        onChange={(e) => handleInputChange('ctc', e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-center">Experience Details</h4>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Designation</th>
                    <th>Total Experience</th>
                    <th>Expected CTC</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedEmployee.employeeExperience.map((experience, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={experience.companyName}
                          onChange={(e) => handleInputChange(index, 'companyName', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={experience.designation}
                          onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={experience.totalExp}
                          onChange={(e) => handleInputChange(index, 'totalExp', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={experience.expCtc}
                          onChange={(e) => handleInputChange(index, 'expCtc', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="text-center">Address Details</h4>
            <div class="table-responsive">
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
                  {updatedEmployee.address.map((address, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={address.hnoOrFlat}
                          onChange={(e) => handleInputChange(index, 'hnoOrFlat', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={address.street}
                          onChange={(e) => handleInputChange(index, 'street', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={address.city}
                          onChange={(e) => handleInputChange(index, 'city', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={address.state}
                          onChange={(e) => handleInputChange(index, 'state', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={address.country}
                          onChange={(e) => handleInputChange(index, 'country', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={address.postalCode}
                          onChange={
                            (e) => handleInputChange(index, 'postalCode', e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="text-center">Bank Details</h4>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Bank Name</th>
                    <td>
                      {updatedEmployee.employeeBankDetails.bankName}
                      
                    </td>
                  </tr>
                  <tr>
                    <th>Account No</th>
                    {updatedEmployee.employeeBankDetails.accountNo}
                    
                  </tr>
                  <tr>
                    <th>IFSC Code</th>
                    {updatedEmployee.employeeBankDetails.ifscCode}
                     
                  </tr>
                  <tr>
                    <th>Branch Name</th>
                    {updatedEmployee.employeeBankDetails.branchName}
                   
                  </tr>
                </tbody>
              </table>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <div className="text-center" style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
  <button
    className="btn btn-success"
    onClick={handleSaveChanges}
    style={{ marginRight: '10px' }} // Optional, to add spacing between buttons
  >
    Save Changes
  </button>
  &nbsp;

  <button
    className="btn btn-secondary"
    onClick={handleCancelView}
  >
    Close
  </button>
</div>

          </div>
        )}
      </Modal>
    </div>
  );
};

export default Update;

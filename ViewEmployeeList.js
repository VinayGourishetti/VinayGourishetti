import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import Modal component
import "./ViewEmployeeList.css";
import Update from './Update';
import View from './ViewAllEmployeeList';

Modal.setAppElement('#root'); // Set the root element for accessibility

// import 'react-perfect-scrollbar/dist/css/styles.css';


const Viewemployee = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null); // State to store item id for deletion
  const [deleteItemName, setDeleteItemName] = useState(''); // State to store item name for deletion
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for selected employee to view


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8002/api-v2/employees');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleUpdate = (employee) => {
    setSelectedEmployee(employee);
    setUpdateModalIsOpen(true);
  };

  // const handleUpdate = async (id) => {
  //   try {
  //     await axios.update(`http://localhost:8086/updatebyid/${id}`);
  //     setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  //   } catch (error) {
  //     console.error('Error updating item:', error);
  //   }
  // };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:8082/api-v2/employee/${selectedEmployee.employeeId}`, selectedEmployee);
      // Update employee list after successful update
      const updatedEmployees = items.map(emp => emp.employeeId === selectedEmployee.employeeId ? selectedEmployee : emp);
      setItems(updatedEmployees);
      setUpdateModalIsOpen(false);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = (itemId, itemName) => {
    setDeleteItemId(itemId);
    setDeleteItemName(itemName);
    setIsDeleteModalOpen(true); // Open the confirmation dialog
  };

  const handleConfirmDelete = () => {
    try {
      axios.delete(`http://localhost:8082/api-v2/employee/delete/${deleteItemId}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== deleteItemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    setIsDeleteModalOpen(false); // Close the confirmation dialog
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false); // Close the confirmation dialog
  };

  const filteredItems = items.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    Object.keys(item).some((key) =>
      key === 'id' && item[key].toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="levaEmployee-header container-fluid" style={{marginTop:'80px', marginLeft:"-90px"}}>
      <div className="row justify-content-center mb-4" style={{position:"fixed"}}>
        <div >
          <h2 style={{marginLeft:"500px", marginTop:"-4cm", fontWeight:"600", textDecorationLine:"underline" , color:"navy"}}>Employees</h2>
        </div>
        <div className="col-lg-4 col-md-4  d-flex justify-content-end" style={{marginLeft:"1500px", position:"absolute",marginTop:"-4cm"}}>
          <input
            style={{width:"250px"}}
            className="form-control"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-2" style={{position:"fixed",marginTop:"-2cm"}}>
        <div className="col ">
          <button className="btn btn-primary">+ Add New List</button>
        </div>
      </div>
      <div className="row" style={{marginTop:"7cm"}}>
        <div className="col">
          <div className='table-responsive'>
            <table  className="table table-hover"style={{ minWidth: '100%' }}>
              <thead className="thead-dark">
                <tr>
                  <th>Employee Id</th>
                  <th>Employee Name</th>
                  <th>Company Id</th>
                  <th>IP Address</th>
                  <th>Mac Address</th>
                  <th>Date Of Birth</th>
                  <th>Gender</th>
                  <th>Role</th>
                  <th>Mobile no.</th>
                  <th>Email</th>
                  <th>Pan Card</th>
                  <th>Aadhar No</th>
                  <th>Date Of Joining</th>
    
                  <th>Bank Name</th>
                  <th>Account No</th>
                  <th>Ifsc Code</th>
                  <th>Branch</th>
                  <th>Accout Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className={item.accountStatus !== "Active" ? 'table-danger' : ''} >
                    <td>{item.employeeId}</td>
                    <td>{item.fullName}</td>
                    <td>{item.companyId}</td>
                    <td>{item.ipAddress}</td>
                    <td>{item.macAddress}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.gender}</td>
                    <td>{item.role}</td>
                    <td>{item.contactNo}</td>
                    <td>{item.email}</td>
                    <td>{item.panId}</td>
                    <td>{item.aadharId}</td>
                    <td>{item.employeeJobInformation.dateOfJoining}</td>
                    <td>{item.employeeBankDetails.bankName}</td>
                    <td>{item.employeeBankDetails.accountNo}</td>
                    <td>{item.employeeBankDetails.ifscCode}</td>
                    <td>{item.employeeBankDetails.branchName}</td>
                    <td>{item.accountStatus}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button type="button" className="btn btn-success"onClick={() => handleView(item)}>View</button>
                        <button type="button" className="btn btn-primary" onClick={() => handleUpdate(item)} disabled={item.accountStatus !== "Active"}>Update</button>
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.employeeId, item.fullName)} disabled={item.accountStatus !== "Active"}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleCancelDelete}
        className="confirmation-dialog"
        overlayClassName="confirmation-overlay">
        <div className='deleteEmployee-title'>Delate Employee</div>
        <div>Are you sure you want to delete Id: {deleteItemId}- Employee Name: {deleteItemName}?</div>
        <div className='model-buttons'>
          <button className='btn btn-success' onClick={handleCancelDelete}>Cancel</button>
          <button className='btn btn-primary reload' onClick={handleConfirmDelete}>Confirm</button>
        </div>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onRequestClose={() => setIsViewModalOpen(false)}
        className="view-employee-modal"
        overlayClassName="view-employee-overlay"
      >
        {/* <View isOpen={isViewModalOpen} onRequestClose={() => setIsViewModalOpen(false)} selectedEmployee={selectedEmployee} /> */}
        {/* {selectedEmployee && (
          <View selectedEmployee={selectedEmployee} />
        )} */}

          {selectedEmployee && (
          <View
            isOpen={isViewModalOpen}
            onRequestClose={() => setIsViewModalOpen(false)}
            selectedEmployee={selectedEmployee}
          />
        )}
      </Modal>

     {/* Update Modal */}
     <Modal
        isOpen={updateModalIsOpen}
        onRequestClose={() => setUpdateModalIsOpen(false)}
        className="modal"
      >
        <Update
          employee={selectedEmployee}
          onCancel={() => setUpdateModalIsOpen(false)}
          onSubmit={handleUpdateSubmit}
        />
      </Modal>
      
    </div>
  );
};

export default Viewemployee;

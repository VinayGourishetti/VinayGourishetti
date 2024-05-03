import React, { useState, useEffect } from 'react';
import "./BankDetails.css";

const BankDetails = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [user, setUser] = useState({
      bankName: '',
      accountNo: '',
      ifscCode: '',
      branchName: ''
    });
    const [editedUser, setEditedUser] = useState({
      bankName: '',
      accountNo: '',
      ifscCode: '',
      branchName: ''
    });
  
    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    };
  
    const handleUpdate = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api-v2/employee/${user.employeeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedUser),
        });
        if (response.ok) {
          console.log('User data updated successfully');
          alert('User data updated successfully');
          setIsPopupOpen(false);
        } else {
          console.error('Failed to update user data');
          alert('Failed to update user data');
        }
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };
  
    useEffect(() => {
      fetchUserData();
    }, []);
  
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api-v2/employee/EMPID_002`);
        const userData = await response.json();
        setUser(userData);
        // Set edited user data initially with fetched user data
        setEditedUser(userData.employeeBankDetails);
        console.log(userData.employeeBankDetails)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
      
  return (
    <>
    <div style={{position:"absolute", marginTop:"-575px", marginLeft:"323px"}} className='Details_container_Address'>
            
            <div className='Details'>
              <div ></div>

              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>Bank Name :</label>
                <input style={{ marginLeft: '140px' }}
                  type='text'
                  placeholder='Enter Bank Name'
                  name="bankName"
                  value={editedUser.bankName}
                  onChange={handleInputChange}
                />
              </div>
              <hr className="badge-primary mt-2 w-10"></hr>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>Account No :</label>
                <input style={{ marginLeft: '140px' }}
                  type='text'
                  placeholder='Enter Account No'
                  name="accountNo"
                  value={editedUser.accountNo}
                  onChange={handleInputChange}
                />
              </div>
              <hr className="badge-primary mt-2 w-10"></hr>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>IFSC Code :</label>
                <input style={{ marginLeft: '150px' }}
                  type='text'
                  placeholder='Enter IFSC Code'
                  name="ifscCode"
                  value={editedUser.ifscCode}
                  onChange={handleInputChange}
                />
              </div>
              <hr className="badge-primary mt-2 w-10"></hr>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>Branch Name :</label>
                <input style={{ marginLeft: '130px' }}
                  type='text'
                  placeholder='Enter Branch Name'
                  name="branchName"
                  value={editedUser.branchName}
                  onChange={handleInputChange}
                />
              </div>

              <button style={{ float: 'right', width: '150px' }} className="btn btn-success" onClick={togglePopup}>Edit</button>
              {isPopupOpen && (
                <div id="popupOverlay" className="overlay-container show">
                  <div className="popup-box">
                    <form className="form-container">
                      <label className="form-label" >
                      Bank Name:
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter Your Bank Name"
                        name="bankName"
                        value={editedUser.bankName}
                        onChange={handleInputChange}
                        required
                      />

                      <label className="form-label" >
                      Account No:
                      </label>
                      <input
                        className="form-input"
                        type="email"
                        placeholder="Enter Your Email"
                        name="accountNo"
                        value={editedUser.accountNo}
                        onChange={handleInputChange}
                        required
                      />

                      <label className="form-label" >
                      IFSC Code:
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter IFSC Code"
                        name="ifscCode"
                        value={editedUser.ifscCode}
                        onChange={handleInputChange}
                        required
                      />

                      <label className="form-label" >
                      Branch Name:
                      </label>
                      <input
                               className="form-input"
                        type="text"
                        placeholder="Enter Your Role"
                        name="branchName"
                        value={editedUser.branchName}
                        onChange={handleInputChange}
                        required
                      />

                      <button className="btn-submit" type="button" onClick={handleUpdate}>
                        Update
                      </button>
                    </form>

                    <button className="btn-close-popup" onClick={togglePopup}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

    
    
    </>
  );
}

export default BankDetails;
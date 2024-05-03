import React, { useState, useEffect } from 'react';
import "./PersonalDetails.css";

const PersonalDetails = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState({
    employeeId: 'EMPID_001',
    fullName: '',
    contactNo: '',
    email: '',
    contactNo: '',
    bloodGroup: '',
  });
  const [editedUser, setEditedUser] = useState({
    fullName: '',
    email: '',
    contactNo: '',
    bloodGroup: '',
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
      const response = await fetch(`http://localhost:8081/api-v2/employee/${user.employeeId}`);
      const userData = await response.json();
      setUser(userData);
      // Set edited user data initially with fetched user data
      setEditedUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
     <div style={{position:"absolute", marginTop:"-575px", marginLeft:"323px"}} className='Details_container_PersonalDetails'>
              <div className='Details'>
              <div style={{ marginTop: '40px' }}></div>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>Employee ID :</label>
                <input style={{ marginLeft: '150px' }}
                  type='text'
                  placeholder='Employee ID'
                  value={user.employeeId}
                  disabled
                  readOnly
                />
              </div>
              <hr className="badge-primary mt-2 w-10"></hr>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>Full Name :</label>
                <input style={{ marginLeft: '170px' }}
                  type='text'
                  placeholder='Full Name'
                  name="fullName"
                  value={editedUser.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <hr className="badge-primary mt-2 w-10"></hr>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>Email :</label>
                <input style={{ marginLeft: '205px' }}
                  type='text'
                  placeholder='Email'
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <hr className="badge-primary mt-2 w-10"></hr>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>Contact No :</label>
                <input style={{ marginLeft: '165px' }}
                  type='text'
                  placeholder='Aadhar ID'
                  name="contactNo"
                  value={editedUser.contactNo}
                  onChange={handleInputChange}
                />
              </div>
              <hr className="badge-primary mt-2 w-10"></hr>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>Blood Group :</label>
                <input style={{ marginLeft: '156px' }}
                  type='text'
                  placeholder='Enter Blood Group'
                  name="bloodGroup"
                  value={editedUser.bloodGroup}
                  onChange={handleInputChange}
                />
              </div>
              <button style={{ float: 'right', width: '150px' }} className="btn btn-success" onClick={togglePopup}>Edit</button>
              {isPopupOpen && (
                <div id="popupOverlay" className="overlay-container show">
                  <div className="popup-box">
                    <form className="form-container">
                      <label className="form-label" >
                        Full Name:
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter Your Full Name"
                        name="fullName"
                        value={editedUser.fullName}
                        onChange={handleInputChange}
                        required
                      />

                      <label className="form-label" >
                        Email:
                      </label>
                      <input
                        className="form-input"
                        type="email"
                        placeholder="Enter Your Email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        required
                      />

                      <label className="form-label" >
                      Contact No:
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter Your Contact Number"
                        name="contactNo"
                        value={editedUser.contactNo}
                        onChange={handleInputChange}
                        required
                      />

                      <label className="form-label" >
                      Blood Group:
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter Your Blood Group"
                        name="bloodGroup"
                        value={editedUser.bloodGroup}
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
  );
}

export default PersonalDetails;
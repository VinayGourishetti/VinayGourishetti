import React, { useState, useEffect } from 'react';
import "./Address.css";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css'; // Import the CSS for default styles



const Address = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [userAddress, setUserAddress] = useState([]);

    const [user, setUser] = useState({
        employeeId: 'EMPID_001',
        hnoOrFlat: '',
        street: '',
        city: '',
        state: '',
        country: '',
        postalCode:'',
    });
    const [editedAddress, setEditedAddress] = useState({
        hnoOrFlat: '',
        street: '',
        city: '',
        state: '',
        country:'',
        postalCode:'',
    });
  
    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedAddress((prevAddress) => ({
        ...prevAddress,
        [name]: value,
      }));
    };

    const handleAdd = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api-v2/employee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedAddress),
            });
            if (response.ok) {
                console.log('New employee added successfully');
                alert('New employee added successfully');
                // Reset the input fields
                setEditedAddress({
                    hnoOrFlat: '',
                    street: '',
                    city: '',
                    state: '',
                    country: '',
                    postalCode: '',
                });
                // Optionally, you can refresh the user data list
                fetchUserData();
            } else {
                console.error('Failed to add new employee');
                alert('Failed to add new employee');
            }
        } catch (error) {
            console.error('Error adding new employee:', error);
        }
    };
    

    
  
    const handleUpdate = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api-v2/employee/${user.employeeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedAddress),
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
        setUserAddress(userData.address);
        // Set edited user data initially with fetched user data
        setEditedAddress(userData.address[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
  return (
    <>
    <div style={{position:"absolute", marginTop:"-570px", marginLeft:"322px"}} className='Details_container_Address'>
            
            <div className='Details'>
              <div ></div>

              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>House No./Flat :</label>
                <input style={{ marginLeft: '140px' }}
                  type='text'
                  placeholder='Enter H No.O/ Flat'
                  name="hnoOrFlat"
                  value={editedAddress.hnoOrFlat}
                  onChange={handleInputChange}
                />
              </div>
              <hr className="badge-primary mt-2 w-10"></hr>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>Street :</label>
                <input style={{ marginLeft: '205px' }}
                  type='text'
                  placeholder='Enter Street'
                  name="street"
                  value={editedAddress.street}
                  onChange={handleInputChange}
                />
              </div>
              <hr className="badge-primary mt-2 w-10"></hr>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>City :</label>
                <input style={{ marginLeft: '220px' }}
                  type='text'
                  placeholder='Enter City'
                  name="city"
                  value={editedAddress.city}
                  onChange={handleInputChange}
                />
              </div>
              <hr className="badge-primary mt-2 w-10"></hr>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>State :</label>
                <input style={{ marginLeft: '210px' }}
                  type='text'
                  placeholder='Enter State'
                  name="state"
                  value={editedAddress.state}
                  onChange={handleInputChange}
                />
              </div>
              <hr className="badge-primary mt-2 w-10"></hr>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>Country :</label>
                <input style={{ marginLeft: '190px' }}
                  type='text'
                  placeholder='Enter Country'
                  name="country"
                  value={editedAddress.country}
                  onChange={handleInputChange}
                />
              </div>
              <hr className="badge-primary mt-2 w-10"></hr>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>Postal Code :</label>
                <input style={{ marginLeft: '165px' }}
                  type='text'
                  placeholder='Enter PostalCode'
                  name="postalCode"
                  value={editedAddress.postalCode}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-success" onClick={handleAdd}>Add</button>
              <button style={{ float: 'right', width: '150px' }} className="btn btn-success" onClick={togglePopup}>Edit</button>
              {isPopupOpen && (
                <div id="popupOverlay" className="overlay-container show">
                    <PerfectScrollbar>
                  <div className="popup-box">
                    <form className="form-container">
                    

                      <label className="form-label" >
                      H.No Or Flat:
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter H.No/Flat Name"
                        name="hnoOrFlat"
                        value={editedAddress.hnoOrFlat}
                        onChange={handleInputChange}
                        required
                      />

                      <label className="form-label" >
                      Street:
                      </label>
                      <input
                        className="form-input"
                        type="email"
                        placeholder="Enter Street Name"
                        name="street"
                        value={editedAddress.street}
                        onChange={handleInputChange}
                        required
                      />

                      <label className="form-label" >
                      City:
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter City"
                        name="city"
                        value={editedAddress.city}
                        onChange={handleInputChange}
                        required
                      />

                      <label className="form-label" >
                      State:
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter State"
                        name="state"
                        value={editedAddress.state}
                        onChange={handleInputChange}
                        required
                      />

                     <label className="form-label" >
                     Country:
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter Country"
                        name="country"
                        value={editedAddress.country}
                        onChange={handleInputChange}
                        required
                      />

                     <label className="form-label" >
                     PIN Code:
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter Pin Code"
                        name="postalCode"
                        value={editedAddress.postalCode}
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
                  </PerfectScrollbar>
                </div>
              )}
            </div>
          </div>

    
    
    </>
  );
}

export default Address;
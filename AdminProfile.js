import React, { useState, useEffect } from 'react';
import './AdminProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FaFacebookF } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';

const AdminProfile = ({ setPage }) => {
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

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [activePage, setActivePage] = useState('');

  const [user, setUser] = useState({ 
    employeeId: 'EMPID_001',
    fullName: '',
    contactNo: '',
    email: '',
    aadharId: '',
    role: '',
  });
  const [editedUser, setEditedUser] = useState({
    fullName: '',
    email: '',
    aadharId: '',
    role: '',
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
    <>
      <body>
        <div style={{ margin: '30px', display: 'flex', justifyContent: 'center', marginLeft:"-130px" }}>
          <div>
          <div className='Profile_container'>
              <img className="Admin_Img" src={imageUrl} alt="" id='photo' />
              <input type='file' id='file' onChange={handleChangeFile}></input>
              <label htmlFor='file' id='uploadbtn'><FontAwesomeIcon icon={faCamera} style={{marginLeft:'1.44px', marginBottom:"2.4px"}} /></label>
              <h5 style={{ color: 'green', marginTop: '20px', textAlign: 'center' }}>
              {editedUser.fullName}
              </h5>
            </div>
            <div className='SocialMedia_Container'>
              <h4 style={{cursor:"pointer"}}>Facebook</h4>
              <hr className="badge-primary mt-2 w-10"></hr>
              <h4 style={{cursor:"pointer"}}>Instagram</h4>
              <hr className="badge-primary mt-2 w-10"></hr>
              <h4 style={{cursor:"pointer"}}>Twitter</h4>
              <hr className="badge-primary mt-2 w-10"></hr>
              <h4 style={{cursor:"pointer"}}>Google</h4>
            </div>
            
          </div>
          <div className='Details_container'>
          <nav>
    <div className='wrapper'>
        <ul className='nav_links'>
            <li className={`nav_item ${activePage === 'personalDetails' ? 'active' : ''}`} onClick={() => { setPage('personalDetails'); setActivePage('personalDetails'); }}><a href='#'>Personal Details</a></li>
            <li className={`nav_item ${activePage === 'qualifications' ? 'active' : ''}`} onClick={() => { setPage('qualifications'); setActivePage('qualifications'); }}><a href='#'>Qualification</a></li>
            <li className={`nav_item ${activePage === 'experience' ? 'active' : ''}`} onClick={() => { setPage('experience'); setActivePage('experience'); }}><a href='#'>Experience</a></li>
            <li className={`nav_item ${activePage === 'address' ? 'active' : ''}`} onClick={() => { setPage('address'); setActivePage('address'); }}><a href='#'>Address</a></li>
            <li className={`nav_item ${activePage === 'contact' ? 'active' : ''}`} onClick={() => { setPage('contact'); setActivePage('contact'); }}><a href='#'>Contact</a></li>
            <li className={`nav_item ${activePage === 'bankDetails' ? 'active' : ''}`} onClick={() => { setPage('bankDetails'); setActivePage('bankDetails'); }}><a href='#'>Bank Details</a></li>
        </ul>
    </div>
</nav>

            {/* <div className='Details'>
              <div style={{ marginTop: '40px' }}></div>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>Employee ID :</label>
                <input style={{ marginLeft: '150px' }}
                  type='text'
                  placeholder='Employee ID'
                  value={user.employeeId}
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
                <label>Aadhar ID :</label>
                <input style={{ marginLeft: '175px' }}
                  type='text'
                  placeholder='Aadhar ID'
                  name="aadharId"
                  value={editedUser.aadharId}
                  onChange={handleInputChange}
                />
              </div>
              <hr className="badge-primary mt-2 w-10"></hr>
              <div style={{ display: 'flex', paddingBottom: '20px' }}>
                <label>Role :</label>
                <input style={{ marginLeft: '216px' }}
                  type='text'
                  placeholder='Role'
                  name="role"
                  value={editedUser.role}
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
                        Aadhar ID:
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter Your Aadhar ID"
                        name="aadharId"
                        value={editedUser.aadharId}
                        onChange={handleInputChange}
                        required
                      />

                      <label className="form-label" >
                        Role:
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter Your Role"
                        name="role"
                        value={editedUser.role}
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
            </div> */}
          </div>
        </div>
      </body>
    </>
  );
}

export default AdminProfile;

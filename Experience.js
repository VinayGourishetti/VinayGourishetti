import React, { useState, useEffect } from 'react';
import "./Experience.css";

const Experience = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [userExperience, setUserExperience] = useState([]);
    const [filteredExperience, setFilteredExperience] = useState({});
    const [userExp, setUserExp] = useState({
      companyName: '',
      designation: '',
      totalExp: '',

    });

    const [user, setUser] = useState({
        employeeId: 'EMPID_001',
        employeeName: '',
        employeeEmail: ''
    });

    const [editedUser, setEditedUser] = useState({
      companyName: '',
      designation: '',
      totalExp: '',
    });

    const [selectedCompanyName, setSelectedCompanyName] = useState('');

    const handleSelectChange = (e) => {
        const selectedCompany = e.target.value;
        setSelectedCompanyName(selectedCompany);

        // Filter qualification details based on selected education board
        const experience = userExperience.find(exp => exp.companyName === selectedCompany);
        setFilteredExperience(experience || {});
    };

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
            setUserExperience(userData.employeeExperience);
            console.log(user.employeeExperience);
            setEditedUser(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <>
            <div style={{ position: "absolute", marginTop: "-570px", marginLeft: "379px" }} className='Details_container_Qualifications'>
                <div className='Details'>
                    <div className='d-flex justify-content-end'>
                        <div className='col-md-3'>
                            <select
                                className='form-select form-select-sm'
                                aria-label='Small select example'
                                value={selectedCompanyName}
                                onChange={handleSelectChange}
                            >
                                <option value='' selected disabled>
                                    Select Company Name
                                </option>
                                {userExperience.map((experience, index) => (
                                    <option key={index} value={experience.companyName}>
                                        {experience.companyName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', paddingBottom: '20px', marginBottom: '20px', marginTop: '20px' }}>
                        <label>Company Name:</label>
                        <input
                            style={{ marginLeft: '125px' }}
                            type='text'
                            placeholder='Company Name'
                            name="companyName"
                            value={filteredExperience.companyName || ''}
                            readOnly
                        />
                    </div>
                    <hr className="badge-primary mt-2 w-10"></hr>

                    <div style={{ display: 'flex', paddingBottom: '20px', marginBottom: '20px' }}>
                        <label>Designation:</label>
                        <input
                            style={{ marginLeft: '155px' }}
                            type='text'
                            placeholder='Enter Designation'
                            name="collegeName"
                            value={filteredExperience.designation || ''}
                            readOnly
                        />
                    </div>
                    <hr className="badge-primary mt-2 w-10"></hr>

                    <div style={{ display: 'flex', paddingBottom: '20px', marginBottom: '20px' }}>
                        <label>Total Exp:</label>
                        <input
                            style={{ marginLeft: '178px' }}
                            type='text'
                            placeholder='Enter Total Exp'
                            name="totalExp"
                            value={filteredExperience.totalExp || ''}
                            readOnly
                        />
                    </div>

                    <button style={{ float: 'right', width: '150px' }} className="btn btn-success" onClick={togglePopup}>Edit</button>
                    
                    {isPopupOpen && (
                        <div id="popupOverlay" className="overlay-container show">
                            <div className="popup-box">
                                <form className="form-container">
                                    <label className="form-label" >
                                    Company Name:
                                    </label>
                                    <input
                                        className="form-input"
                                        type="text"
                                        placeholder="Enter Your Board of Education"
                                        name="companyName"
                                        value={filteredExperience.companyName}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <label className="form-label">
                                    Designation:
                                    </label>
                                    <input
                                        className="form-input"
                                        type="text"
                                        placeholder="Enter Your College Name"
                                        name="designation"
                                        value={filteredExperience.designation}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <label className="form-label">
                                    Total Exp:
                                    </label>
                                    <input
                                        className="form-input"
                                        type="text"
                                        placeholder="Enter Your Total Exp"
                                        name="totalExp"
                                        value={filteredExperience.totalExp}
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

export default Experience;

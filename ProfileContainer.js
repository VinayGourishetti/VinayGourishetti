import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import Qualifications from "./Qualifications";
import Experience from "./Experience";
import Address from "./Address";
import BankDetails from "./BankDetails";
import Contact from "./Contact";
import AdminProfile from "./AdminProfile";

function ProfileContainer() {
    const [page, setPage] = useState('personalDetails');

    let content;
    if (page === 'personalDetails') {
        content = <PersonalDetails/>;
    } else if(page === 'qualifications') {
        content = <Qualifications/>;
    } else if (page === 'experience') {
        content = <Experience/>;
    } else if (page === 'address') {
        content = <Address/>;
    } else if (page === 'bankDetails') {
        content = <BankDetails/>;
    } else if (page === 'contact') {
        content = <Contact/>;   
    }    

    return(
        <div>
            <AdminProfile setPage={setPage} />
            {content}
        </div>
    );
}
export default ProfileContainer;

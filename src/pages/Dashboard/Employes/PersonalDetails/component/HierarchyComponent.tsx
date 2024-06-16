import React from "react";

interface User {
  _id: string;
  username: string;
  name: string;
  code: string;
}

interface UserDetails extends User {
  profiledetails: {
    aadharNo: string;
    bloodGroup: string;
    dob: string;
    emergencyNo: string;
    healthCardNo: string;
    insuranceCardNo: string;
    maritalStatus: string;
    medicalCertificationDetails: string;
    mobileNo: string;
    nickName: string;
    panNo: string;
    personalEmail: string;
    pfUanNo: string;
    refferedBy: string;
    weddingDate: string;
  };
  designation: { title: string }[];
  department: { title: string }[];
  managerDetails: User[];
}

interface UserHierarchyProps {
  data: {
    userDetails: UserDetails[];
    users: User[];
  };
}
const UserHierarchy: React.FC<UserHierarchyProps> = ({ data }) => {
  const user = data.userDetails?.[0];
  const manager = user?.managerDetails?.[0];
  const subordinates = data.users || [];

  console.log(manager)
  console.log(subordinates)

 return(
    <>
    {/* {manager} */}

    asdliad
    {/* {subordinates} */}
    </>
 )
};

export default UserHierarchy;

import React from "react";
import "./UserInfo.css";
const UserInfo = (props) => {
  return (
    <div className="userInfo">
      {/* <label>Username</label> */}
      <input name={props.name} placeholder={props.placeholder} />
    </div>
  );
};
export default UserInfo;

import { Input } from "@mui/material";
import React from "react";
import "./UserInfo.css";
const UserInfo = (props) => {
  return (
    <div className="userInfo">
      {/* <label>Username</label> */}
      <Input variant="outlined" name={props.name} placeholder={props.placeholder} />
    </div>
  );
};
export default UserInfo;

import React from "react";

import Notification from "../Notification";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import ChangeUserInfoForm from "../forms/ChangeUserInfoForm";

import s from "./UserAccount.module.scss";

const UserAccount = () => {
  return (
    <div className={s.account}>
      <Notification />
      <h2>Main information</h2>
      <ChangeUserInfoForm />
      <ChangePasswordForm />
    </div>
  );
};

export default UserAccount;

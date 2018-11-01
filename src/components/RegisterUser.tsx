import * as React from "react";
import RegisterUserForm from "./RegisterUserForm";

export default class RegisterUser extends React.Component {
  public render() {
    return (
      <div>
        <h1>Register User</h1>
        <RegisterUserForm />
      </div>
    );
  }
}

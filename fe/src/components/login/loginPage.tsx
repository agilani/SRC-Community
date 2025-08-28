import React, { useState } from "react";
import "./styles.css";

function LoginForm() {
  // React States
  const [errorMessages, setErrorMessages] = useState<{ name: string, message: string } | null>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [user, setUser] = useState<{ firstName: string, lastName: string, email: string } | null>();


  const errors = {
    bad: "Invalid credentials",
    error: "Some error occurred. Please try again.",
    uname: 'invalid username',
    pass: 'invalid password'
  };

  const handleSubmit = async (event: any) => {

    try {
      //Prevent page reload
      event.preventDefault();
      setUser(null);
      setErrorMessages(null);

      var { uname, pass } = document.forms[0];

      const rawLoginResponse = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: uname.value, password: pass.value })
      });
      const loginContent = await rawLoginResponse.json();

      console.log('loginContent', loginContent);

      if (loginContent.success === false) {
        setErrorMessages({ name: "bad", message: errors.bad });
      }

      setIsSubmitted(true);
      const rawUserResponse = await fetch('http://localhost:3001/user', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginContent.data.accessToken}`
        },
      });
      const userContent = await rawUserResponse.json();

      setUser(userContent.data);
    } catch (error) {
      setErrorMessages({ name: "error", message: errors.error });
      console.log('error', error);
    }

  };

  const renderErrorMessage = (name: string) =>
    name === errorMessages?.name && (
      <div className="error">{errorMessages?.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        {renderErrorMessage("bad")}
        {renderErrorMessage("error")}
      </form>
    </div>
  );

  return (
    <div className="login-form-container">
      <div className="login-form">
        <div className="title">{isSubmitted && user ? 'Signed In' : 'Sign In'}</div>
        {isSubmitted && user ? <div className="list-container">
          <span>User is successfully logged in</span>
          <span>Name: {user?.firstName} {user?.lastName}</span>
          <span>eMail: {user?.email}</span>
        </div> : renderForm}
      </div>
    </div>
  );
}

export default LoginForm;

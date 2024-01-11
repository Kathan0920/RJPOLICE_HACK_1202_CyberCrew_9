import React from "react";
import { post } from "../Rest";

function SignInForm(props) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    console.log(value);
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;
      const response = await post("login", {
        email: email,
        password: password,
      });
      if (response.okk) {
        document.cookie = `token=${response.token};expires=${new Date(
          new Date().getTime() + 1 * 60 * 60 * 10000
        ).toUTCString()};`;
        props.changecookie(document.cookie)
      } else {
        alert(response.message);
      }
      for (const key in state) {
        setState({
          ...state,
          [key]: "",
        });
      
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          required={true}

        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          required={true}

        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;

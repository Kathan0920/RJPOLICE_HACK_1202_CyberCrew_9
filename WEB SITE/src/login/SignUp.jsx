import React, { useState } from "react";
import { post } from "../Rest";
function SignUpForm(props) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async(evt) => {
    evt.preventDefault();

    const { confirmpassword, email, password } = state;
    const selectedoption = selectedOption;
    const response = await post("signup", {
      email: email,
      password: password,
      confirmpassword: confirmpassword,
      usertype: selectedOption,
    });
    console.log(response);
    if(!response.okk){
      alert(response.message)
    }else{
      props.changetype("signIn")
    }
    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };
  // drop down
  const [selectedOption, setSelectedOption] = useState("Victim");

  const options = ["Victim", "Police", "Bank", "Court"];
  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        {/* <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
        <span>or use your email for registration</span>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required={true}

        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required={true}
        />
        <input
          type="password"
          name="confirmpassword"
          value={state.confirmpassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required={true}

        />
        <div className={"dropdownContainer"}>
          <div className="dropdownLabel">Role : -</div>
          <select
            value={selectedOption}
            onChange={(e) => handleSelect(e.target.value)}
            className={"dropdownSelect"}
            placeholder={'role'}
          >
            <option value="" disabled>
              Select an option
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;

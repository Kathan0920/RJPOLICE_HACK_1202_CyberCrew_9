import React from "react";
import InputDate  from "./InputDate";
function InputMoney(props) {
  const [state, setState] = React.useState({
    bankname:"",
    transactionID:'',
    date:'',
    amount:'',
    // time:"",
    accno: "",
    refno: "",
    ifsc:"",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
    props.change(state)

  };
  console.log(state);
  return (
    <div id='money_div'>
      <div className="dropdownLabel"> Bank Name :-</div>
      <input type="text" name="bankname" id="bankname" onChange={handleChange}/>
      <div className="dropdownLabel"> IFSC code ? :-</div>
      <input type="text" name="ifsc" id="ifsc" onChange={handleChange}/>
      <div className="dropdownLabel"> Account Number :-</div>
      <input type="number" name="accno" id="accno" onChange={handleChange}/>
      <div className="dropdownLabel"> Transaction ID / UTR Number :-</div>
      <input type="number" name="transactionID" id="transactionID" onChange={handleChange}/>
      <div className="dropdownLabel"> Amount ? :-</div>
      <input type="text" name="amount" id="amount" onChange={handleChange}/>
      <div className="dropdownLabel"> ref no.? :-</div>
      <input type="number" name="refno" id="ref" onChange={handleChange}/>
      <InputDate prev={state} change={setState}/>
    </div>
  );
}

export default InputMoney;

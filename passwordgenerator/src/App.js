import { useState } from "react";
import "./style.css";
import PasswordStrengthIndicator from "./components/strengthChecker";
import usePasswordGenerator from "./hook/use-password-generator";
import Button from "./components/Button";
import Checkbox from "./components/checkbox";
function App() {
  const [length, setlength] = useState(4);
  const [checkboxData, setCheckboxData] = useState(
    [
      { title: "Include Uppercase Letters", state: false},
      { title: "Include Lowercase Letters", state: false},
      { title: "Include Numbers", state: false},
      { title: "Include Symbols", state: false},
    ]
  );

  const[copied, setCopied] = useState(false);

  const handleCheckboxChange =(i) => {
    console.log("Index:", i);
    console.log("Checkboxdata:", checkboxData)
    const updateCheckboxData = [...checkboxData];
    updateCheckboxData[i].state = !updateCheckboxData[i].state;
    setCheckboxData(updateCheckboxData);
  }
  const handleCopy  = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    },1000);
  };

  const {password, errorMessage, generatePassword } = usePasswordGenerator();
  
  return (
    <div className="container">
      {password && (
      <div className="header">
      <div className="title">{password}</div>
      <Button  text={copied? "Copied" : "Copy"} customClass="copyBtn" onClick={handleCopy}/>
    </div>
    )}
    <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
        type="range"
        min="4"
        max="20"
        value={length}
        onChange={(event) => setlength(event.target.value)}
        ></input>
      </div>
      <div className="checkboxes">
        {checkboxData.map((checkbox,index) => {
        return (
          <Checkbox 
          key={index}
          title={checkbox.title}
          onChange={() => handleCheckboxChange(index)}
          state={checkbox.state}
          />
        );
})}
      </div>
      <PasswordStrengthIndicator password={password} />
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <Button  text="Generate Password"
      onClick={() => generatePassword(checkboxData, length)}
      customClass="generateBtn"
      />
      
    </div>
  );
}

export default App;

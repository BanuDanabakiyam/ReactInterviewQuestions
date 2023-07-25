import { useState } from "react";
import "./style.css";
import usePasswordGenerator from "./hook/use-password-generator";
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

  const handleCheckboxChange =(i) => {
    console.log("Index:", i);
    console.log("Checkboxdata:", checkboxData)
    const updateCheckboxData = [...checkboxData];
    updateCheckboxData[i].state = !updateCheckboxData[i].state;
    setCheckboxData(updateCheckboxData);
  }

  const {password, errorMessage, generatePassword } = usePasswordGenerator();
  
  return (
    <div className="container">
    {password && (
      <div className="header">
      <div className="title">{password}</div>
      <button className="copyBtn" onClick={() => {}}>
        Copy
      </button>
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
          <div key={index}>
            <input type="checkbox"
            onChange={() => handleCheckboxChange(index)}
             checked={checkbox.state}></input>
            <label>{checkbox.title}</label>
          </div>
        );
})}
      </div>
      <button className="generateBtn" onClick={() => generatePassword(checkboxData, length)}>
        Generate password
      </button>
      
    </div>
  );
}

export default App;

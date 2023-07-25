import "./style.css";
import { useEffect, useState } from "react";
import { tenureData } from "./utils/constants";
import { numberWithCommas } from "./utils/config";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downpayment, setDownpayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEMI = (downpayment) => {
    // EMI amount = (p*R*(1+R)^N/(1+R)^N-1)
    if(!cost) return;

    const loanAmt = cost - downpayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI = 
    (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears)/
    ((1 + rateOfInterest) ** numOfYears-1 );

    return Number(EMI / 12).toFixed(0);
  };

  const calculateDownPayment = (emi) => {
     if(!cost) return;

     const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100 ;
     return Number((downPaymentPercent / 100 ) *cost). toFixed(0); 
  }

  useEffect(() => {
    if (!cost > 0) {
      setDownpayment(0);
      setEmi(0);
    }

    const emi = calculateEMI(downpayment);
    setEmi(emi);

  },[tenure]);

  const updateEmi = (event) => {
      if(!cost) return;
      const downPay = Number(event.target.value);
      setDownpayment(downPay.toFixed(0));

      const emi = calculateEMI(downPay);
      setEmi(emi);


  }
  const updateDownPayment = (event) => {
    if(!cost) return;
      const emi = Number(event.target.value);
      setEmi(emi.toFixed(0));

      const downPay = calculateDownPayment(emi);
      setDownpayment(downPay);



  }
return (
    <div className="App">
      <span className="title" style={{fontSize: 30, marginTop: 10}}>
        EMI Calculator
      </span>
      <span className="title">Total cost of Asset</span>
       <input 
       type="number"
       value={cost}
       onChange={(event) => setCost(event.target.value)}
       placeholder="Total cost of Assets"
       />
       <span className="title">Interest Rate (in %)</span>
       <input 
       type="number"
       value={interest}
       onChange={(event) => setInterest(event.target.value)}
       placeholder="Interest Rate (in %)"
       />
       <span className="title">Processing Fee (in %)</span>
       <input 
       type="number"
       value={fee}
       onChange={(event) => setCost(event.target.value)}
       placeholder="Processing Fee (in %)"
       />
       <span className="title">DownPayment</span>
       <span className="title" style={{ textDecoration: "underline" }}>
       {" "}
       Total DownPayment- {" "}{numberWithCommas((Number(downpayment) + (cost - downpayment) * (fee / 100)).toFixed(0))}
       </span>
       <div>

       <input
       type="range"
       min={0}
       max={cost}
       className="slider"
       value={downpayment}
       onChange={updateEmi}
       />
       <div className="labels">
        <label>0%</label>
        <b>{numberWithCommas(downpayment)}</b>
        <label>100%</label>
       </div>
       </div>
       <span className="title">Loan per Month</span>
       <span className="title" style={{ textDecoration: "underline" }}>
       {" "}
       Total Loan Amount -{numberWithCommas((emi * tenure ).toFixed(0))}
       </span>
       <div>
       <input
       type="range"
       min={calculateEMI(cost)}
       max={calculateEMI(0)}
       className="slider"
       value={emi}
       onChange={updateDownPayment}
       />
       <div className="labels">
        <label>{numberWithCommas(calculateEMI(cost))}</label>
        <b>{numberWithCommas(emi)}</b>
        <label>{numberWithCommas(calculateEMI(0))}</label>
       </div>
       </div>

       
    <span className="title">Tenure</span>
    <div className="tenureContainer">
    {tenureData.map((t) => {
      return (
        <button
        className={`tenure ${t === tenure ? "selected" : ""}`}
        onClick={() => setTenure(t)}
        >
          {t}
        </button>
      ); 
    })}
</div>
</div>
  );
}
export default App;

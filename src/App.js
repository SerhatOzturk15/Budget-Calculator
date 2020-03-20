import React, { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";
import Alert from "./components/Alert";
import uuid from "uuid/v4";
const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car", amount: 400 },
  { id: uuid(), charge: "credits", amount: 12000 }
];

function App() {
  //states
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  //functions
  const handleCharge = event => {
    setCharge(event.target.value);
  };

  const handleAmount = event => {
    setAmount(event.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });

    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (charge && amount > 0) {
      const singleExpense = { id: uuid(), charge, amount };
      setExpenses([...expenses, singleExpense]);
      setCharge("");
      setAmount("");
      handleAlert({ show: true, type: "success", text: "item added" });
    } else {
      handleAlert({
        show: true,
        type: "danger",
        text: "item properties cannot be empty"
      });
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <div className="App">
        <Form
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <List expenses={expenses} />
      </div>
      <h1>
        total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;

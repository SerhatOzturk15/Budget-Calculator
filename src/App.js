import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";
import Alert from "./components/Alert";
import uuid from "uuid/v4";
// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1600 },
//   { id: uuid(), charge: "car", amount: 400 },
//   { id: uuid(), charge: "credits", amount: 12000 }
// ];

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
function App() {
  //states
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  //effect
  useEffect(() => {
    console.log("run");
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

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
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setId("");
        setEdit(false);
        handleAlert({ show: true, type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ show: true, type: "success", text: "item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        show: true,
        type: "danger",
        text: "charger cannot be empty and value must be bigger than 0"
      });
    }
  };

  //clear items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items have been removed" });
  };

  const handleDelete = id => {
    const updatedExpenses = expenses.filter(x => x.id !== id);
    setExpenses(updatedExpenses);
    handleAlert({
      type: "danger",
      text: `item with id ${id} has been deleted`
    });
  };

  const handleEdit = id => {
    let singleExpense = expenses.find(x => x.id === id);
    if (singleExpense) {
      let { charge, amount } = singleExpense;
      setCharge(charge);
      setAmount(amount);
      setEdit(true);
      setId(id);
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
          edit={edit}
          id={id}
        />
        <List
          expenses={expenses}
          clearItems={clearItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
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

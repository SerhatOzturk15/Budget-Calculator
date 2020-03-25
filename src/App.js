import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";
import Alert from "./components/Alert";
import {
  getAllExpenses,
  handleExpenses,
  addExpense,
  removeExpenses,
  removeAnExpense,
  editExpense
} from "./ApiHelper";
import uuid from "uuid/v4";

function App() {
  //states
  const [expenses, setExpenses] = useState([]);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  //effect
  // useEffect(() => {
  //   console.log("run");
  //   localStorage.setItem('expenses', JSON.stringify(expenses));
  // }, [expenses]);

  useEffect(() => {
    let promise = getAllExpenses();
    promise.then(result => {
      setExpenses(result);
    });
  }, []);

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
        editExpense({id: id, charge: charge, amount: amount}).then(result => {
          let tempExpenses = expenses.map(item => {
            return item.id === id ? { ...item, charge, amount } : item;
          });
          setExpenses(tempExpenses);
          handleAlert({ show: true, type: "success", text: "item edited" });
        });
        setId("");
        setEdit(false);
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        addExpense(singleExpense)
          .then(() => {
            return getAllExpenses();
          })
          .then(result => {
            setExpenses(result);
            handleAlert({ show: true, type: "success", text: "item added" });
          })
          .catch(() => {
            handleAlert({
              show: true,
              type: "danger",
              text: "item could not be added"
            });
          });
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

  const handleDelete = id => {
    let promise  = removeAnExpense(id)
    .then(result =>{
      return getAllExpenses();
    }).then(result =>{
      setExpenses(result)
      handleAlert({
        type: "danger",
        text: `item with id ${id} has been deleted`
      });
    })
  };

  const clearExpenses = () => {
    removeExpenses()
      .then(result => {
        return result;
      })
      .then(result => {
        if (result === true) {
          setExpenses([]);
          handleAlert({ type: "danger", text: "all items have been removed" });
        }
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
          clearExpenses={clearExpenses}
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

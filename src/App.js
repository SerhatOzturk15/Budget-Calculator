import React, {useState} from 'react';
import './App.css';
import List from './components/List'
import Form from './components/Form'
import Alert from './components/Alert'
import uuid from 'uuid/v4'
const initialExpenses = [
  {id: uuid(), charge: 'rent', amount: 1600},
  {id: uuid(), charge: 'car', amount: 400},
  {id: uuid(), charge: 'credits', amount: 12000}
  ]

function App() {

  const [expenses, setExpenses] = useState(initialExpenses)

  return (
    <>
    <h1>text</h1>
    <div className = "App">
      <Form/>
      <List expenses = {expenses}/>
    </div>
    <h1>total spending : <span className = "total">
      $ {expenses.reduce((acc, curr) => {
        return acc += curr.amount
      }, 0)}
    </span>

    </h1>
    </>
  );
}

export default App;

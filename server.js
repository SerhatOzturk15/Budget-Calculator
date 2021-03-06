const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
app.use(cors())
const expenseContainer = require('./expenses.json');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//root
app.get('/', (req, res) => res.send(expenseContainer))

//get all expenses
app.get('/expenses', (req, res) => res.send(expenseContainer))

//add new expense
app.post('/addExpense', (req, res) => {
    //initialExpenses = [...initialExpenses,]
    const expense = {
        id: Date.now(),
        charge: req.body.charge,
        amount: req.body.amount
    }
    expenseContainer.data.push(expense)
    res.send([{ id: 4, charge: "adsad", amount: 12000 }])
})

app.put('/editExpense/:id/:charge/:amount', (req, res) => {
    const id = req.params.id;
    const charge = req.params.charge;
    const amount = parseInt(req.params.amount);
    const editedExpenses = expenseContainer.data.map(item => {
        return item.id === id ? {...item, charge, amount} : item;
    });
    expenseContainer.data = Object.create(editedExpenses);
    res.json({state: true});
})

app.delete('/deleteAll', (req, res) =>{
    const id = req.id;
    expenseContainer.data = []
    return res.json({ state: true});
})

app.delete('/removeAnExpense/:id', (req, res) => {
    const id = req.params.id;
    const indexToRemove = expenseContainer.data.indexOf(id)
    if(indexToRemove){
        expenseContainer.data.splice(indexToRemove, 1)
        return res.json({state: true});
    }
})

app.listen(port, () => console.log('listening on port 3001'))
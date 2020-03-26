const APIURL = "http://localhost:3001";

///API HANDLERS///

// gets all expenses
export const getAllExpenses = () => {
  return new Promise((resolve, reject) => {
    fetch(`${APIURL}/expenses`)
      .then(res => res.json())
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

//edit one expense
export const editExpense = (item) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3001/editExpense/${item.id}/${item.charge}/${item.amount}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }).then(result => result.json())
          .then(result =>{
              resolve(result.state)
          })      
    })
}

//remove an expense
export const removeAnExpense = id => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3001/removeAnExpense/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        resolve(result.state);
      });
  });
};

//remove all expenses
export const removeExpenses = () => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3001/deleteAll`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        resolve(result.state);
      });
  });
};

//add an expense
export const addExpense = expense => {
  return new Promise((resolve, reject) => {
    fetch(`${APIURL}/addExpense`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(expense)
    })
      .then(res => res.json())
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject();
      });
  });
};

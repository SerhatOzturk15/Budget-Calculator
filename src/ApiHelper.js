const APIURL = "http://localhost:3001";

///api handlers
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

export const handleExpenses = expenses => {
  return new Promise((resolve, reject) => {
    fetch(`${APIURL}/setExpenses`, {
      method: "POST",
      body: JSON.stringify(expenses)
    })
      .then(res => res.json())
      .then(result => {
        resolve(result);
      });
  });
};

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

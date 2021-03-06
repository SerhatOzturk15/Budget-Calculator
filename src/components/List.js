import React from "react";
import Item from "./Item";
import { MdDelete } from "react-icons/md";
const List = ({ expenses, handleDelete, handleEdit, clearExpenses }) => {
  return (
    <>
      <ul className="list">
        {expenses.map(expense => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit = {handleEdit}
            />
          );
        })}
      </ul>

      {expenses.length > 0 && (
        <button className="btn" onClick={clearExpenses}>
          clear expenses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default List;

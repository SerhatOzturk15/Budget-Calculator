import React from "react";
import { MdSend } from "react-icons/md";
const Form = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="expense">charge</label>
          <input
            data-testid="form-charge-input"
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="e.g. credits"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expense">amount</label>
          <input
            data-testid="form-amount-input"
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="e.g. 10"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn" data-testid="form-submit-button">
        {edit ? "edit" : "submit"}
        <MdSend className="btn-icon"></MdSend>
      </button>
    </form>
  );
};

export default Form;

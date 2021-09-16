import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const IncomeExpense = () => {
  const { transactions } = useContext(TransactionContext);

  const incExp = transactions.reduce(
    (acc, curr) => {
      if (curr.amount < 0) {
        acc.expense += Math.abs(curr.amount);
      } else {
        acc.income += curr.amount;
      }

      return acc;
    },
    { income: 0, expense: 0 }
  );

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">+${incExp.income}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">-${incExp.expense}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;

import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { TransactionContext } from "../context/TransactionContext";
import { PieChart } from "react-minimal-pie-chart";
import Transaction from "./Transaction";

const generateRandomColor = () => {
  return `rgb(${Math.round(Math.random() * 255)},${Math.round(
    Math.random() * 255
  )},${Math.round(Math.random() * 255)})`;
};

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(TransactionContext);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (state.token !== null) {
      getTransactions();
    }
    // eslint-disable-next-line
  }, [state]);

  const getPieChartData = data => {
    if (data === "income") {
      return transactions.reduce((acc, curr) => {
        !(curr.amount < 0) &&
          acc.push({
            title: curr.text,
            value: curr.amount,
            color: generateRandomColor(),
          });

        return acc;
      }, []);
    } else if (data === "expense") {
      return transactions.reduce((acc, curr) => {
        curr.amount < 0 &&
          acc.push({
            title: curr.text,
            value: curr.amount,
            color: generateRandomColor(),
          });

        return acc;
      }, []);
    }
  };

  return (
    <div className="history">
      {transactions.length > 0 ? (
        <>
          <h4>Transaction History</h4>
          <div className="tracking-history">
            <ul className="list">
              {transactions.map(transaction => (
                <Transaction transaction={transaction} key={transaction._id} />
              ))}
            </ul>
            <div className="charts">
              <div className="income">
                <h4>Income</h4>
                <PieChart
                  data={getPieChartData("income")}
                  label={({ dataEntry }) => {
                    return `${dataEntry.title}`;
                  }}
                  labelStyle={{ fontSize: "5px", fill: "white" }}
                  animate={true}
                />
              </div>
              <div className="expense">
                <h4>Expense</h4>
                <PieChart
                  data={getPieChartData("expense")}
                  label={({ dataEntry }) => {
                    return `${dataEntry.title}`;
                  }}
                  labelStyle={{ fontSize: "5px", fill: "white" }}
                  animate={true}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <h5>No transactions Added .</h5>
      )}
    </div>
  );
};

export default TransactionList;

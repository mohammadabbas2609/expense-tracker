import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { PieChart } from "react-minimal-pie-chart";
import Transaction from "./Transaction";

const generateRandomColor = () => {
  return `rgb(${Math.round(Math.random() * 255)},${Math.round(
    Math.random() * 255
  )},${Math.round(Math.random() * 255)})`;
};

const TransactionList = () => {
  const { transactions } = useContext(TransactionContext);

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
      <h4>Transaction History</h4>
      <div className="tracking-history">
        <ul className="list">
          {transactions &&
            transactions.map(transaction => (
              <Transaction transaction={transaction} key={transaction.id} />
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
    </div>
  );
};

export default TransactionList;

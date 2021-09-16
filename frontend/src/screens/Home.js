import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import AddTransaction from "../components/AddTransaction";
import Balance from "../components/Balance";
import IncomeExpense from "../components/IncomeExpense";
import TransactionList from "../components/TransactionList";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const history = useHistory();

  const { state } = useContext(AuthContext);
  const { user } = state;
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  return (
    <>
      <div className="container">
        <Balance />
        <IncomeExpense />
        <AddTransaction />
        <TransactionList />
      </div>
    </>
  );
};

export default Home;

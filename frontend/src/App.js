import Header from "./components/Header";
import { BrowserRouter, Route } from "react-router-dom";
import { TransactionProvider } from "./context/TransactionContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TransactionProvider>
          <Header />
          <Route path="/" component={Home} exact />
          <Route path="/login" component={LoginScreen} />
        </TransactionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

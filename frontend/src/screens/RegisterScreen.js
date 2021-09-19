import { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userRegister, state } = useContext(AuthContext);
  const { user, error } = state;

  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [history, user]);

  const handleSubmit = e => {
    e.preventDefault();
    userRegister(email, password);
  };

  return (
    <div className="container auth">
      <h3>Register</h3>
      <h5>{error && error}</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-controller">
          <input
            type="email"
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-controller">
          <input
            type="password"
            onChange={e => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
      <h5>
        Already have an account <Link to="/login">Login</Link>
      </h5>
    </div>
  );
};

export default RegisterScreen;

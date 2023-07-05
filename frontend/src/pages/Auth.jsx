import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";

function Auth() {
  const [check, setCheck] = React.useState(false);
  return (
    <>
      <div>
        <Toaster reverseOrder={false} />
      </div>
      <div className="form">
        <Login check={check} setCheck={setCheck} />
        <Register check={check} setCheck={setCheck} />
      </div>
    </>
  );
}

export default Auth;

const Login = ({ check, setCheck }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });
      navigate("/");
      toast.success("Bingo, you're in!", {
        duration: 3000,
        style: {
          color: "#101010",
          backgroundColor: "#f3ebeb",
          padding: "18px",
          fontSize: "15px",
        },
      });
      setCookies("access_token", res.data.token);
      window.localStorage.setItem("userID", res.data.UserID);
    } catch (error) {
      toast.error("Uh-oh! Not quite right.", {
        duration: 1000,
        style: {
          color: "#101010",
          backgroundColor: "#f3ebeb",
          padding: "18px",
          fontSize: "15px",
        },
      });
      console.error(error);
    }
  };
  return check == false ? (
    <Form
      label="Login"
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      onSubmit={onSubmit}
      check={check}
      setCheck={setCheck}
    />
  ) : null;
};

const Register = ({ check, setCheck }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        password,
      });
      navigate("/auth");
      setCheck(!check);
      toast.success("Boom! You're in!", {
        duration: 1000,
        style: {
          color: "#101010",
          backgroundColor: "#f3ebeb",
          padding: "18px",
          fontSize: "15px",
        },
      });
    } catch (err) {
      toast.error("Oops! Already taken.", {
        duration: 1000,
        style: {
          color: "#101010",
          backgroundColor: "#f3ebeb",
          padding: "18px",
          fontSize: "15px",
        },
      });
      setUsername("");
      setPassword("");
      console.error(err);
    }
  };
  return check == true ? (
    <Form
      label="Register"
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      onSubmit={onSubmit}
      check={check}
      setCheck={setCheck}
    />
  ) : null;
};

const Form = ({
  label,
  username,
  password,
  setPassword,
  setUsername,
  onSubmit,
  check,
  setCheck,
}) => {
  return (
    <>
      <div className="form-cont">
        <form onSubmit={onSubmit}>
          <h2>{label}</h2>
          <div className="group">
            <label htmlFor="username">Username :</label>
            <input
              type="text"
              className="log-inp"
              required="true"
              id="username"
              name="username"
              value={username}
              autoComplete="new-password"
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              className="log-inp"
              required="true"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="btn">
            <button className="button2" type="submit">
              {label}
            </button>
            <button className="button2" onClick={() => setCheck(!check)}>
              {check == false ? "Sign-up" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

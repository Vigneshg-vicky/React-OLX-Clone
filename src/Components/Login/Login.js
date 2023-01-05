import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../store/firebaseContext";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [Details, setDetails] = useState({
    username: "",
    password: "",
  });
  const {firebase} = useContext(FirebaseContext);
  const changeHandler = (e) => {
    setDetails({ ...Details, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(Details.username,Details.password).then(()=>{
      history.push('/')
    }).catch((error)=>{
      alert(error.message)
    })
  };
  console.log(Details)
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="username"
            defaultValue={Details.username}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue={Details.password}
            onChange={changeHandler}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{history.push('/signup')}}>Signup</a>
      </div>
    </div>
  );
}

export default Login;

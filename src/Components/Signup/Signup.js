import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Logo from "../../olx-logo.png";
import { FirebaseContext } from "../../store/firebaseContext";
import "./Signup.css";

export default function Signup() {
  const history = useHistory();

  const [allValues, setAllValues] = useState({
    phone: "",
    username: "",
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(allValues.email, allValues.password)
      .then((result) => {
        result.user
          .updateProfile({ displayName: allValues.username })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .add({
                id: result.user.uid,
                username: allValues.username,
                phone: allValues.phone,
              })
              .then(() => {
                history.push("/login");
              });
          });
      });
    console.log(allValues);
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="username"
            defaultValue={allValues.username}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue={allValues.email}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue={allValues.phone}
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
            defaultValue={allValues.password}
            onChange={changeHandler}
          />
          <br />
          <br />
          <button onClick={handleSubmit}>Signup</button>
        </form>
        <a onClick={()=>{history.push('/login')}}>Login</a>
      </div>
    </div>
  );
}

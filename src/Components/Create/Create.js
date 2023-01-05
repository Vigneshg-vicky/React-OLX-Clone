import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/firebaseContext";
import { useHistory } from "react-router-dom";

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const {user} = useContext(AuthContext)
  const [create, setcreate] = useState({
    name: "",
    category: "",
    price: "",
  });
  const history = useHistory();
  const [Image, setImage] = useState(null);
  const changeCreate = (e) => {
    setcreate({ ...create, [e.target.name]: e.target.value });
  };
  const date= new Date();
  const handleSubmit = (e) => {
    firebase
      .storage()
      .ref(`/image/${Image.name}`)
      .put(Image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          console.log(url);
          console.log(user.uid+'hiii')
          console.log({
            name:user.name,
            category:user.category,
            price:user.price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          })
          console.log('added')
          firebase.firestore().collection("products").add({
            name:create.name,
            category:create.category,
            price:create.price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          });
          history.push('/')
        });
      });
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue={create.name}
            onChange={changeCreate}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            defaultValue={create.category}
            onChange={changeCreate}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="price"
            onChange={changeCreate}
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={Image ? URL.createObjectURL(Image) : "null"}
          ></img>

          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            name="image"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;

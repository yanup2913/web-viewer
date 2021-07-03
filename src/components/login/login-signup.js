import React, { useRef, useEffect } from "react";
import { useAlert } from "react-alert";
import {
  STORE_KEY,
  setItemInLocalStorage,
  getLocalStorageItem,
} from "../../utils";
import SHA1 from "sha1";

// import css files here
import "../../web-viewer.css";

const MAX_LENGTH = 20;

export default function Login({ history }) {
  const alert = useAlert();

  const isLoading = useRef(false);

  const usernameRef = useRef(null);
  const passRef = useRef(null);

  useEffect(() => {
    const currentUser = getLocalStorageItem(STORE_KEY);
    if (currentUser) {
      history.replace("/");
    }
  }, []);

  const getValues = () => {
    const username = usernameRef?.current?.value;
    const pass = passRef?.current?.value;

    return { username, pass };
  };

  const isValid = () => {
    const { username, pass } = getValues();

    if (!username) {
      alert.error("Please Enter Username");
      return false;
    } else if (!pass) {
      alert.error("Please Enter Password");
      return false;
    }

    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!isLoading?.current && isValid()) {
      isLoading.current = true;
      let { username, pass } = getValues();
      username = username.slice(0, MAX_LENGTH);
      pass = pass.slice(0, MAX_LENGTH);
      pass = SHA1(pass);

      setItemInLocalStorage(STORE_KEY, { username, password: pass });

      history.replace("/");
    }
  };

  return (
    <div className={"container padding-default margin-row-large"}>
      <form
        className={
          "display-flex padding-default flex-direction-column align-center " +
          "login-parent padding-col-default-xs"
        }
        onSubmit={onSubmit}
      >
        <h3 className="margin-none text-center">Login/Signup With Username</h3>
        <input
          ref={usernameRef}
          type="text"
          placeholder="USERNAME"
          className="form-control"
          maxLength={MAX_LENGTH}
          required
        />
        <input
          ref={passRef}
          type="password"
          placeholder="PASSWORD"
          className="form-control"
          maxLength={MAX_LENGTH}
          required
        />
        <button className="login-button">Login / Signup</button>
      </form>
    </div>
  );
}

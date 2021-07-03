import React, { useEffect, useState } from "react";
import { STORE_KEY, getLocalStorageItem } from "../../utils";
import Header from "./header";
import Loader from "../shared-components/loader";
import Iframe from "./iframe";

// import css files here
import "../../web-viewer.css";

export default function WebViewer({ history }) {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [searchBox1Value, setSearchBox1Value] = useState("");
  const [searchBox2Value, setSearchBox2Value] = useState("");

  useEffect(() => {
    const currentUser = getLocalStorageItem(STORE_KEY);
    setCurrentUser(currentUser);
    if (!currentUser) {
      history.replace("/login");
    }
  }, []);

  return !!currentUser ? (
    <div>
      <Header
        userData={currentUser}
        {...{
          history,
          setSearchBox1Value,
          setSearchBox2Value,
          searchBox1Value,
          searchBox2Value,
        }}
      />
      <div className="display-flex flex-direction-column-xs">
        <Iframe url={searchBox1Value} title="Search Bar 1" />
        <Iframe url={searchBox2Value} title="Search Bar 2" />
      </div>
    </div>
  ) : (
    <Loader />
  );
}

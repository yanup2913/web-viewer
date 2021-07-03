import React, { useRef } from "react";
import { STORE_KEY, removeItemFromLocalStorage } from "../../utils";

const MAX_LENGTH = 200;

export default function Header({
  userData = {},
  history,
  setSearchBox1Value,
  setSearchBox2Value,
  searchBox1Value,
  searchBox2Value,
}) {
  const url1Ref = useRef(null);
  const url2Ref = useRef(null);

  const onURL1Change = (ev) => {
    let value = ev?.target?.value || "";

    value = value.trim();
    value = value.slice(0, MAX_LENGTH);

    setSearchBox1Value(value);
  };

  const onURL2Change = (ev) => {
    let value = ev?.target?.value || "";

    value = value.trim();
    value = value.slice(0, MAX_LENGTH);

    setSearchBox2Value(value);
  };

  const onLogoutClick = () => {
    removeItemFromLocalStorage(STORE_KEY);

    history.replace("/login");
  };

  return (
    <header className="display-flex margin-col-default align-center justify-space-between padding-top-default">
      <div className="display-flex align-center flex-direction-column-xs margin-right-default">
        <div
          className="text-capitalize margin-right-default username"
          title={userData.username}
        >
          {userData.username}
        </div>
        <input
          ref={url1Ref}
          type="url"
          className="form-control search-box"
          placeholder="Search bar 1"
          value={searchBox1Value}
          onChange={onURL1Change}
          maxLength={MAX_LENGTH}
          required
        />
      </div>
      <div className="display-flex align-center flex-direction-column-rev-xs">
        <input
          ref={url2Ref}
          type="url"
          className="form-control search-box"
          placeholder="Search bar 2"
          value={searchBox2Value}
          onChange={onURL2Change}
          maxLength={MAX_LENGTH}
          required
        />
        <button
          className="margin-left-default logout-button"
          onClick={onLogoutClick}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

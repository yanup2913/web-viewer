export const STORE_KEY = "logged_user";

export function getLocalStorageItem(key) {
  if (key) {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (e) {
      throw e;
    }
  } else {
    throw "Key is missing while getting item from local storage";
  }
}

export function setItemInLocalStorage(key, value = {}) {
  if (key && value) {
    try {
      return window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      throw e;
    }
  } else {
    throw "Either Key Or Value is missing while setting item in local storage";
  }
}

export function removeItemFromLocalStorage(key) {
  if (key) {
    try {
      return window.localStorage.removeItem(key);
    } catch (e) {
      throw e;
    }
  } else {
    throw "Key is missing while removing item from local storage";
  }
}

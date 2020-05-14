import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setTokenExpirationDate, setUserId } from "../actions/Auth";

let logoutTimer;

export const useAuth = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const tokenExpirationDate = useSelector(
    (state) => state.auth.tokenExpirationDate
  );
  const userId = useSelector((state) => state.auth.userId);

  const login = useCallback((uid, token, expirationDate) => {
    dispatch(setToken(token));
    dispatch(setUserId(uid));

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    dispatch(setTokenExpirationDate(tokenExpirationDate));
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    dispatch(setToken(null));
    dispatch(setUserId(null));
    dispatch(setTokenExpirationDate(null));
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  return { token, login, logout, userId };
};

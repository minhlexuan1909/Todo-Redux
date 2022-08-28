import "./App.css";

import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppRoute from "./routers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfoThunk } from "./features/profile/services/profileThunk";
import { getTodoThunk } from "./features/todo/services/todoThunk";
import {
  authTokenSelector,
  userIdSelector,
} from "./features/auth/services/authSlice";

function App() {
  const dispatch = useDispatch();

  const userId = useSelector(userIdSelector);
  const token = useSelector(authTokenSelector);
  useEffect(() => {
    const data = {
      id: userId,
      token: token,
    };
    dispatch(getInfoThunk(data));
    dispatch(getTodoThunk({ token: token }));
  }, [dispatch, userId, token]);
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="colored"
      />
      <HashRouter basename="/">
        <AppRoute></AppRoute>
      </HashRouter>
    </div>
  );
}

export default App;

import "./App.css";

import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppRoute from "./routers";

function App() {
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

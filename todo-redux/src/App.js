import "./App.css";

import { BrowserRouter } from "react-router-dom";

import AppRoute from "./routers";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter>
        <AppRoute></AppRoute>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";

import { BrowserRouter } from "react-router-dom";

import AppRoute from "./routers/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoute></AppRoute>
      </BrowserRouter>
    </div>
  );
}

export default App;

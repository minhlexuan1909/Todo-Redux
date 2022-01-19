import LoginPage from "../../features/auth/pages/LoginPage/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage/RegisterPage";

const routes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];
export default routes;

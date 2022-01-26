import LoginPage from "../features/auth/pages/LoginPage/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage/RegisterPage";
import ChangePasswordPage from "../features/profile/page/ChangePasswordPage/ChangePasswordPage";
import ProfilePage from "../features/profile/page/ProfilePage/ProfilePage";
import DashBoardPage from "../features/todo/pages/DashBoardPage/DashBoardPage";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const routes = [
  {
    path: "",
    element: <LoginPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "dashboard",
    element: <PrivateRoutes component={<DashBoardPage />} />,
  },
  {
    path: "dashboard/profile/change-password",
    element: <PrivateRoutes component={<ChangePasswordPage />} />,
  },
  {
    path: "dashboard/profile",
    element: <PrivateRoutes component={<ProfilePage />} />,
  },
];
export default routes;

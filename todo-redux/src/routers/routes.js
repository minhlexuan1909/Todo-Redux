import LoginPage from "../features/auth/pages/LoginPage/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage/RegisterPage";
import ChangePasswordPage from "../features/profile/page/ChangePasswordPage/ChangePasswordPage";
import ProfilePage from "../features/profile/page/ProfilePage/ProfilePage";
import ProfileTabPage from "../features/profile/page/ProfileTabPage/ProfileTabPage";
import CreateTodoPage from "../features/todo/pages/CreateTodoPage/CreateTodoPage";
import DashBoardPage from "../features/todo/pages/DashBoardPage/DashBoardPage";
import EditTodoPage from "../features/todo/pages/EditTodoPage/EditTodoPage";
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
    element: (
      <PrivateRoutes component={<ProfileTabPage route={"change-password"} />} />
    ),
  },
  {
    path: "dashboard/profile",
    element: <PrivateRoutes component={<ProfileTabPage />} />,
  },
  {
    path: "dashboard/create-todo",
    element: <PrivateRoutes component={<CreateTodoPage />} />,
  },
  {
    path: "dashboard/edit-todo/:idTodo",
    element: <PrivateRoutes component={<EditTodoPage />} />,
  },
];
export default routes;

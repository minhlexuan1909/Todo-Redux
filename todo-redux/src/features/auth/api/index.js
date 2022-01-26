import { axiosInstance } from "../../../services/axiosInstance";
const AuthAPI = {
  login: (data) => {
    const url = "Accounts/login";
    return axiosInstance.post(url, data);
  },
  register: (data) => {
    const url = "Accounts";
    return axiosInstance.post(url, data);
  },
  logout: () => {
    const url = "Accounts/logout";
    return axiosInstance.post(url);
  },
};

export default AuthAPI;

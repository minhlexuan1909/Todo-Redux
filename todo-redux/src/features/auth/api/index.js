import { axiosInstance } from "../../../services/axiosInstance";
const AuthAPI = {
  login: (data) => {
    const url = "/Accounts/login";
    return axiosInstance.post(url, data);
  },
  register: (data) => {
    const url = "/Accounts";
    return axiosInstance.post(url, data);
  },
};

export default AuthAPI;

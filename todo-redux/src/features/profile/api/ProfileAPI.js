import { axiosInstance } from "../../../services/axiosInstance";
const ProfileAPI = {
  changePassword: (data, token) => {
    const url = `Accounts/change-password?access_token=${token}`;
    return axiosInstance.post(url, data);
  },
  getInfo: (id, token) => {
    const url = `Accounts/${id}?access_token=${token}`;
    return axiosInstance.get(url);
  },
  editInfo: (data, id, token) => {
    const url = `Accounts/${id}?access_token=${token}`;
    return axiosInstance.patch(url, data);
  },
};

export default ProfileAPI;

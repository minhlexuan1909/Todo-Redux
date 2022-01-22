import { axiosInstance } from "../../../services/axiosInstance";

const TodoAPI = {
  getTodo: (token) => {
    const url = `todos?access_token=${token}`;
    return axiosInstance.get(url);
  },
  toggleStatusTodo: (data, id, token) => {
    const url = `todos/${id}?access_token=${token}`;
    return axiosInstance.patch(url, data);
  },
};

export default TodoAPI;

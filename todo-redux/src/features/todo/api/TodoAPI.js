import { axiosInstance } from "../../../services/axiosInstance";

const TodoAPI = {
  getTodo: (token) => {
    const url = `todos?access_token=${token}`;
    return axiosInstance.get(url);
  },
  getTodoById: (id, token) => {
    const url = `todos/${id}?access_token=${token}`;
    return axiosInstance.get(url);
  },
  toggleStatusTodo: (data, id, token) => {
    const url = `todos/${id}?access_token=${token}`;
    return axiosInstance.patch(url, data);
  },
  addNote: (data, token) => {
    const url = `notes?access_token=${token}`;
    return axiosInstance.post(url, data);
  },
  deleteNote: (id, token) => {
    const url = `notes/${id}?access_token=${token}`;
    return axiosInstance.delete(url);
  },
  editNote: (id, data, token) => {
    const url = `https://api.todo.ql6625.live/api/notes/${id}?access_token=${token}`;
    return axiosInstance.patch(url, data);
  },
  addTodo: (data, token) => {
    const url = `https://api.todo.ql6625.live/api/todos?access_token=${token}`;
    return axiosInstance.post(url, data);
  },
  editTodo: (id, data, token) => {
    const url = `https://api.todo.ql6625.live/api/todos/${id}?access_token=${token}`;
    return axiosInstance.patch(url, data);
  },
  deleteTodo: (id, token) => {
    const url = `https://api.todo.ql6625.live/api/todos/${id}?access_token=${token}`;
    return axiosInstance.delete(url);
  },
};

export default TodoAPI;

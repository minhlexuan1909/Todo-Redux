import { createAsyncThunk } from "@reduxjs/toolkit";
import TodoAPI from "../api/TodoAPI";

export const getTodoThunk = createAsyncThunk(
  "todo/getTodoThunk",
  async (data) => {
    try {
      const response = await TodoAPI.getTodo(data.token);
      // console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  }
);

export const getTodoByIdThunk = createAsyncThunk(
  "todo/getTodoById",
  async (data) => {
    try {
      const response = await TodoAPI.getTodoById(data.id, data.token);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  }
);

export const toggleStatusTodoThunk = createAsyncThunk(
  "todo/toggleStatusTodoThunk",
  async (data) => {
    try {
      const id = data.id;
      const token = data.token;
      delete data.id;
      delete data.token;
      console.log(data);
      const response = await TodoAPI.toggleStatusTodo(data, id, token);
      // console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  }
);

export const addNoteThunk = createAsyncThunk(
  "todo/addNoteThunk",
  async (data) => {
    try {
      const token = data.token;
      delete data.token;
      const response = await TodoAPI.addNote(data, token);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  }
);

export const deleteNoteThunk = createAsyncThunk(
  "todo/deleteNoteThunk",
  async (data) => {
    try {
      const response = await TodoAPI.deleteNote(data.id, data.token);
      console.log(response.data);
      return data.id;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  }
);

export const editNoteThunk = createAsyncThunk(
  "todo/editNoteThunk",
  async (data) => {
    try {
      const id = data.id;
      const token = data.token;
      const dataAPI = { ...data };
      delete dataAPI.id;
      delete dataAPI.token;
      const response = await TodoAPI.editNote(id, dataAPI, token);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  }
);

export const addTodoThunk = createAsyncThunk(
  "todo/addTodoThunk",
  async (data) => {
    try {
      const token = data.token;
      delete data.token;
      const listNote = data.listNote;
      delete data.listNote;
      const response = await TodoAPI.addTodo(data, token);
      // console.log(response.data);

      const todoId = response.data.id;
      if (data.isDone) {
        const responseToggle = await TodoAPI.toggleStatusTodo(
          data,
          todoId,
          token
        );

        // console.log(responseToggle.data);
      }
      if (listNote.length !== 0) {
        await listNote.forEach((note) => {
          const dataNote = {
            content: note,
            userId: data.userId,
            todoId: todoId,
          };
          const responseNote = TodoAPI.addNote(dataNote, token);
          console.log(responseNote.data);
        });
      }
      return { ...response.data, isDone: data.isDone };
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  }
);

export const editTodoThunk = createAsyncThunk(
  "todo/editTodoThunk",
  async (data) => {
    try {
      const id = data.id;
      delete data.id;
      const token = data.token;
      delete data.token;
      // const listNote = data.listNote;
      // delete data.listNote;
      const response = await TodoAPI.editTodo(id, data, token);
      console.log(response.data);

      const todoId = response.data.id;
      if (data.isDone) {
        const responseToggle = await TodoAPI.toggleStatusTodo(
          data,
          todoId,
          token
        );

        // console.log(responseToggle.data);
      }
      // if (listNote.length !== 0) {
      //   await listNote.forEach((note) => {
      //     const dataNote = {
      //       content: note,
      //       userId: data.userId,
      //       todoId: todoId,
      //     };
      //     const responseNote = TodoAPI.addNote(dataNote, token);
      //     console.log(responseNote.data);
      //   });
      // }
      return { ...response.data, isDone: data.isDone };
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "todo/deleteTodoThunk",
  async (data) => {
    try {
      const id = data.id;
      const token = data.token;
      const response = await TodoAPI.deleteTodo(id, token);
      // console.log(response.data);
      return { id: id };
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    }
  }
);

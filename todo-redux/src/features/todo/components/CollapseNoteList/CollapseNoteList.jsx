import "./CollapseNoteList.scss";

import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Collapse,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  authTokenSelector,
  userIdSelector,
} from "../../../auth/services/authSlice";
import {
  addNoteThunk,
  deleteNoteThunk,
  editNoteThunk,
} from "../../services/todoThunk";

// import {} from "bootstrap-icons";
const CollapseNoteList = ({ id, notes }) => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const token = useSelector(authTokenSelector);

  const buttonRef = useRef([]);
  const [open, setOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [isEdit, setIsEdit] = useState([]);
  const [editNote, setEditNote] = useState("");

  const handleNewNoteChange = (e) => {
    setNewNote(e.target.value);
  };
  const handleAddNoteButtonClick = () => {
    // notes.push(newNote);
    const data = {
      todoId: id,
      content: newNote,
      userId: userId,
    };
    // dispatch(todoAction.addNote(data));
    dispatch(addNoteThunk({ ...data, token: token }));
    setNewNote("");
  };
  const handleDeleteNoteButtonClick = (id) => {
    const data = {
      id: id,
      token: token,
    };
    dispatch(deleteNoteThunk(data));
  };

  const handleSubmitEditNoteButtonClick = (index, noteId) => {
    const data = {
      id: noteId,
      token: token,
      content: editNote,
    };
    dispatch(editNoteThunk(data));
    isEdit[index] = !isEdit[index];
    setIsEdit([...isEdit]);
    setEditNote("");
  };

  useEffect(() => {
    notes.map((note, index) => setIsEdit([...isEdit, false]));
    // console.log(notes);
  }, []);
  return (
    <div className="note-list">
      <Button
        className="d-block bg-secondary"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Notes
      </Button>
      <Collapse in={open} className="w-100">
        <div id="example-collapse-text">
          {notes.map((note, index) => (
            <Card
              key={index}
              onMouseEnter={(e) => {
                if (!isEdit[index]) {
                  buttonRef.current[index].classList.add("appear");
                  buttonRef.current[index].classList.remove("disappear");
                }
              }}
              onMouseLeave={() => {
                if (!isEdit[index]) {
                  buttonRef.current[index].classList.add("disappear");
                  buttonRef.current[index].classList.remove("appear");
                }
              }}
            >
              <Card.Body>
                {isEdit[index] ? (
                  <FormControl
                    className="mr-3"
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                  ></FormControl>
                ) : (
                  <Card.Title>{note.content}</Card.Title>
                )}

                <div
                  ref={(el) => (buttonRef.current[index] = el)}
                  className={`buttons ${
                    isEdit[index] ? "appear" : "disappear"
                  }`}
                >
                  <Button
                    variant="primary"
                    className="mr-1"
                    onClick={() => {
                      isEdit[index] = !isEdit[index];
                      setIsEdit([...isEdit]);
                    }}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                  {isEdit[index] ? (
                    <Button
                      variant="success"
                      onClick={() =>
                        handleSubmitEditNoteButtonClick(index, note.id)
                      }
                    >
                      <i className="bi bi-file-earmark-post-fill"></i>
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteNoteButtonClick(note.id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Type your new note here"
              value={newNote}
              onChange={handleNewNoteChange}
            />
            <Button variant="success" onClick={handleAddNoteButtonClick}>
              Add
            </Button>
          </InputGroup>
        </div>
      </Collapse>
    </div>
  );
};

export default CollapseNoteList;

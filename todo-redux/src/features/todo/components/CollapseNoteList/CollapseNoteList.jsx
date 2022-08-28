import "./CollapseNoteList.scss";

import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Collapse,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import CircularProgressForButton from "../../../../components/CircularProgressForButton/CircularProgressForButton";
import {
  authTokenSelector,
  userIdSelector,
} from "../../../auth/services/authSlice";
import { todoAction } from "../../services/todoSlice";
import {
  addNoteThunk,
  deleteNoteThunk,
  editNoteThunk,
} from "../../services/todoThunk";

// import {} from "bootstrap-icons";
const CollapseNoteList = ({ loadingAddNote, id, notes, enableCollapse }) => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const token = useSelector(authTokenSelector);

  const buttonRef = useRef([]);
  const [open, setOpen] = useState(false);

  const [newNote, setNewNote] = useState("");
  // const [isEdit, setIsEdit] = useState([]);
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
  const handleEditNoteButtonClick = (idNote) => {
    dispatch(todoAction.toggleEditButton(idNote));
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
    // isEdit[index] = !isEdit[index];
    // setIsEdit([...isEdit]);
    setEditNote("");
  };

  // useEffect(() => {
  //   // notes.map((note, index) => setIsEdit([...isEdit, false]));
  //   // console.log(notes);
  // }, []);
  // console.log(notes);
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
      <Collapse in={open && enableCollapse} className="w-100">
        <div id="example-collapse-text">
          {notes.map((note, index) => (
            <Card
              key={index}
              onMouseEnter={(e) => {
                if (!note.isEditNote) {
                  buttonRef.current[index].classList.add("appear");
                  buttonRef.current[index].classList.remove("disappear");
                }
              }}
              onMouseLeave={() => {
                if (!note.isEditNote) {
                  buttonRef.current[index].classList.add("disappear");
                  buttonRef.current[index].classList.remove("appear");
                }
              }}
            >
              <Card.Body>
                {note.isEditNote ? (
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
                    note.isEditNote ? "appear" : "disappear"
                  }`}
                >
                  <Button
                    disabled={note.loadingEditNote}
                    variant="primary"
                    className="mr-1"
                    onClick={() => handleEditNoteButtonClick(note.id)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                  {note.isEditNote ? (
                    <Button
                      disabled={note.loadingEditNote}
                      variant="success"
                      onClick={() =>
                        handleSubmitEditNoteButtonClick(index, note.id)
                      }
                    >
                      {note.loadingEditNote ? (
                        <CircularProgressForButton />
                      ) : (
                        <i className="bi bi-file-earmark-post-fill"></i>
                      )}
                    </Button>
                  ) : (
                    <Button
                      disabled={note.loadingDeleteNote}
                      variant="danger"
                      onClick={() => handleDeleteNoteButtonClick(note.id)}
                    >
                      {note.loadingDeleteNote ? (
                        <CircularProgressForButton />
                      ) : (
                        <i className="bi bi-x-lg"></i>
                      )}
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
            <Button
              disabled={loadingAddNote}
              variant="success"
              onClick={handleAddNoteButtonClick}
            >
              {loadingAddNote ? <CircularProgressForButton /> : "Add"}
            </Button>
          </InputGroup>
        </div>
      </Collapse>
    </div>
  );
};

export default CollapseNoteList;

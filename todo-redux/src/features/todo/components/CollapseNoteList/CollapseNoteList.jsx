import React, { useState } from "react";
import { Button, Card, Collapse } from "react-bootstrap";

const CollapseNoteList = ({ notes }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        // className="w-100"
        className="d-block bg-secondary"
        // size="lg"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Notes
      </Button>
      <Collapse in={open} className="w-100">
        <div id="example-collapse-text">
          {notes.map((note) => (
            <Card>
              <Card.Body>
                <Card.Title>{note.content}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Collapse>
    </>
  );
};

export default CollapseNoteList;

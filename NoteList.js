import React from "react";

function NoteList({ notes, deleteNote, selectNote }) {
  console.log("Notes passed to NoteList:", notes); // Check if notes are passed correctly

  if (!notes || notes.length === 0) {
    return <p>No notes available</p>;
  }

  return (
    <div className="note-container">
      <h2>Notes</h2>
      <div className="note-list">
        {notes.map((note) => (
          <div className="note-card" key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            <div className="tags">
              {note.tags.map((tag, index) => (
                <span key={index} className="tag-badge">
                  {tag}
                </span>
              ))}
            </div>

            <div className="note-buttons">
              <button onClick={() => selectNote(note)}>
                <i className="fas fa-pencil-alt"></i> Edit
              </button>
              <button
                onClick={() => deleteNote(note._id)}
                className="delete-button"
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;

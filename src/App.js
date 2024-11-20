import React, { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import "./App.css";
import { FaUser } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Apply theme based on the user's choice
  useEffect(() => {
    document.body.classList.add(isDarkTheme ? "dark-theme" : "light-theme");
    document.body.classList.remove(isDarkTheme ? "light-theme" : "dark-theme");
  }, [isDarkTheme]);

  // Load notes from local storage when the app loads
  useEffect(() => {
    loadNotesFromLocalStorage();
  }, []);

  // Function to load notes from local storage
  const loadNotesFromLocalStorage = () => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  };

  // Function to save notes to local storage
  const saveNotesToLocalStorage = (newNotes) => {
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  // Function to add a new note
  const addNote = (note) => {
    if (notes.some((n) => n.title === note.title && !selectedNote)) {
      alert("A note with this title already exists!");
      return;
    }

    if (selectedNote) {
      // Update an existing note
      const updatedNotes = notes.map((n) =>
        n.id === selectedNote.id ? { ...n, ...note } : n
      );
      setNotes(updatedNotes);
      saveNotesToLocalStorage(updatedNotes);
      setSelectedNote(null); // Clear selected note after updating
    } else {
      // Add a new note
      const newNote = { ...note, id: Date.now() }; // Add a unique ID
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      saveNotesToLocalStorage(updatedNotes);
    }
  };

  // Function to delete a note by its unique ID
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
    if (selectedNote && selectedNote.id === id) {
      setSelectedNote(null); // Clear selected note if it's deleted
    }
  };

  // Function to select a note for editing
  const selectNote = (note) => {
    setSelectedNote(note);
  };

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div
      className={`app-container ${isDarkTheme ? "dark-theme" : "light-theme"}`}
    >
      <div className="header">
        <div className="title-container">
          <h1>Digital Note-Taker</h1>
        </div>
        <div className="header-actions">
          <button onClick={toggleTheme} className="theme-toggle">
            {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
          </button>
          <div className="author-info">
            <FaUser className="header-icon" />
            <span>
              Created by{" "}
              <a
                href="https://www.linkedin.com/in/haseeb-raza-00a845231/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Haseeb Raza
              </a>
            </span>
          </div>
        </div>
      </div>
      <main className="main-content">
        <NoteForm
          addNote={addNote}
          updateNote={addNote} // Pass the same function for adding/updating
          selectedNote={selectedNote}
        />
        <NoteList
          notes={notes}
          deleteNote={deleteNote}
          selectNote={selectNote}
        />
      </main>
    </div>
  );
}

export default App;

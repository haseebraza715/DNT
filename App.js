import React, { useState,  useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import axios from "axios";
import "./App.css";
import { FaUser } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [error, setError] = useState("");
  const [isServerOnline, setIsServerOnline] = useState(true);

  // Check if Flask server is reachable
  const checkServerStatus = async () => {
    try {
      await axios.get("http://127.0.0.1:5000/health"); // Assuming you have a health check endpoint in Flask
      setIsServerOnline(true);
    } catch (error) {
      setIsServerOnline(false);
    }
  };

  useEffect(() => {
    checkServerStatus(); // Check server status on mount
  }, []);

  useEffect(() => {
    document.body.classList.add(isDarkTheme ? "dark-theme" : "light-theme");
    document.body.classList.remove(isDarkTheme ? "light-theme" : "dark-theme");
  }, [isDarkTheme]);

  const fetchNotes = async () => {
    if (isServerOnline) {
      try {
        const response = await axios.get("http://127.0.0.1:5000/notes");
        setNotes(response.data);
      } catch (error) {
        setError("Error fetching notes:", error);
        setIsServerOnline(false); // Set server status to offline if request fails
      }
    } else {
      // Fallback to local storage if server is offline
      const localNotes = JSON.parse(localStorage.getItem("notes")) || [];
      setNotes(localNotes);
    }
  };

  const generateUniqueId = () => "_" + Math.random().toString(36).substr(2, 9);

  const addNote = async (note) => {
    if (!note.id) {
      note.id = generateUniqueId(); // Assign unique id if not present
    }

    if (notes.some((n) => n.title === note.title)) {
      alert("A note with this title already exists!");
      return;
    }

    if (isServerOnline) {
      try {
        await axios.post("http://127.0.0.1:5000/notes", note);
        fetchNotes();
      } catch (error) {
        setError("Error adding note:", error);
        setIsServerOnline(false);
      }
    } else {
      // Fallback to local storage if server is offline
      const localNotes = JSON.parse(localStorage.getItem("notes")) || [];
      localNotes.push(note);
      localStorage.setItem("notes", JSON.stringify(localNotes));
      setNotes(localNotes);
    }
  };

  const updateNote = async (id, updatedContent) => {
    if (isServerOnline) {
      try {
        await axios.put(`http://127.0.0.1:5000/notes/${id}`, updatedContent);
        fetchNotes();
        setSelectedNote(null);
      } catch (error) {
        setError("Error updating note:", error);
        setIsServerOnline(false);
      }
    } else {
      // Update note in local storage if server is offline
      const localNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const updatedNotes = localNotes.map((note) =>
        note.id === id ? { ...note, ...updatedContent } : note
      );
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    }
  };

  const deleteNote = async (id) => {
    if (isServerOnline) {
      try {
        // Delete the specific note from the server by its unique ID
        await axios.delete(`http://127.0.0.1:5000/notes/${id}`);
        fetchNotes(); // Refresh the list of notes
      } catch (error) {
        setError("Error deleting note:", error);
        setIsServerOnline(false); // Switch to offline if there's an error
      }
    } else {
      // Delete the specific note from local storage by its unique ID
      const localNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const updatedNotes = localNotes.filter((note) => note.id !== id); // Ensure only the selected note is removed
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNotes(updatedNotes); // Update the state with the modified notes array
    }
  };

  const selectNote = (note) => {
    setSelectedNote(note);
  };

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    fetchNotes();
  }, [isServerOnline]); // Refetch notes if server status changes

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
      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {error}
        </p>
      )}
      <main className="main-content">
        <NoteForm
          addNote={addNote}
          updateNote={updateNote}
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

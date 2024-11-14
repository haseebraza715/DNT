import React, { useState, useEffect } from "react";

function NoteForm({ addNote, updateNote, selectedNote }) {
  const [title, setTitle] = useState(selectedNote ? selectedNote.title : "");
  const [content, setContent] = useState(
    selectedNote ? selectedNote.content : ""
  );
  const [tags, setTags] = useState(selectedNote ? selectedNote.tags : "");
  const [loading, setLoading] = useState(false); // Loading state
  const [success, setSuccess] = useState(""); // Success message state
  const [error, setError] = useState(""); // Error message state

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setTags(selectedNote.tags.join(", "));
    } else {
      resetForm();
    }
  }, [selectedNote]);

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 50) setTitle(e.target.value); // Limit to 50 characters
  };

  const handleContentChange = (e) => {
    if (e.target.value.length <= 200) setContent(e.target.value); // Limit to 200 characters
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTags("");
  };

  useEffect(() => {
    const formData = { title, content, tags };
    localStorage.setItem("noteData", JSON.stringify(formData));
  }, [title, content, tags]);

  // Load from local storage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("noteData"));
    if (savedData) {
      setTitle(savedData.title);
      setContent(savedData.content);
      setTags(savedData.tags);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if title is empty
    if (!title.trim()) {
      setError("Title cannot be empty!");
      return;
    }

    // Validation: Check if tags contain only letters and numbers
    const tagsArray = tags.split(",").map((tag) => tag.trim());
    if (tagsArray.some((tag) => !/^[a-zA-Z0-9]+$/.test(tag))) {
      setError("Tags must contain only letters and numbers.");
      return;
    }

    setError(""); // Clear any previous error messages
    setLoading(true); // Start loading state

    const noteData = {
      title,
      content,
      tags: tagsArray,
    };

    try {
      if (selectedNote) {
        await updateNote(selectedNote._id, noteData); // Assume updateNote returns a promise
        setSuccess("Note updated successfully!");
      } else {
        await addNote(noteData); // Assume addNote returns a promise
        setSuccess("Note added successfully!");
      }
    } catch (err) {
      setError("Failed to save the note. Please try again."); // Error handling
    } finally {
      setLoading(false); // Stop loading state
      setTimeout(() => setSuccess(""), 3000); // Clear success message after 3 seconds
      resetForm(); // Clear form
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h2 className="form-title">{selectedNote ? "Edit Note" : "Add Note"}</h2>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="input-group">
        <label htmlFor="title" className="input-label">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
          className="input-field"
        />
        <small className="char-counter">{title.length}/50</small>{" "}
        {/* Character counter */}
      </div>

      <div className="input-group">
        <label htmlFor="content" className="input-label">
          Content
        </label>
        <textarea
          id="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={2000}
          className="textarea-field"
        ></textarea>
        <small className="char-counter">{content.length}/2000</small>{" "}
        {/* Character counter */}
      </div>

      <div className="input-group">
        <label htmlFor="tags" className="input-label">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="input-field"
        />
      </div>

      <button type="submit" disabled={loading} className="submit-button">
        {loading ? "Processing..." : selectedNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
export default NoteForm;

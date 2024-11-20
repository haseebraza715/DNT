import React, { useState, useEffect } from "react";

function NoteForm({ addNote, selectedNote }) {
  const [title, setTitle] = useState(selectedNote ? selectedNote.title : "");
  const [content, setContent] = useState(
    selectedNote ? selectedNote.content : ""
  );
  const [tags, setTags] = useState(
    selectedNote ? selectedNote.tags.join(", ") : ""
  );
  const [loading, setLoading] = useState(false); // Loading state
  const [success, setSuccess] = useState(""); // Success message state
  const [error, setError] = useState(""); // Error message state

  // Populate form when `selectedNote` changes
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setTags(selectedNote.tags.join(", "));
    } else {
      resetForm();
    }
  }, [selectedNote]);

  // Reset the form
  const resetForm = () => {
    setTitle("");
    setContent("");
    setTags("");
  };

  // Handle form submission
  const handleSubmit = (e) => {
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

    setError(""); // Clear previous errors
    setLoading(true); // Start loading state

    // Create or update note object
    const noteData = {
      id: selectedNote ? selectedNote.id : Date.now(), // Use existing id or generate new one
      title,
      content,
      tags: tagsArray,
    };

    // Call `addNote` to handle both adding and updating notes
    try {
      addNote(noteData);
      setSuccess(
        selectedNote ? "Note updated successfully!" : "Note added successfully!"
      );
      resetForm();
    } catch (err) {
      setError("Failed to save the note. Please try again.");
    } finally {
      setLoading(false); // Stop loading state
      setTimeout(() => setSuccess(""), 3000); // Clear success message after 3 seconds
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
        <small className="char-counter">{title.length}/50</small>
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
        <small className="char-counter">{content.length}/2000</small>
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

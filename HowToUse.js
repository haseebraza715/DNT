import React from "react";

const HowToUse = () => (
  <div style={styles.container}>
    <h1 style={styles.mainHeading}>How to Use the Digital Note-Taker</h1>

    <p style={styles.paragraph}>
      This app helps you create, edit, and manage notes with ease. Follow the
      steps below to get started:
    </p>

    <h2 style={styles.sectionHeading}>1. Adding a Note</h2>
    <p style={styles.paragraph}>
      Go to the main page and fill in the "Title," "Content," and optional
      "Tags" fields. Click "Add Note" to save your note.
    </p>

    <h2 style={styles.sectionHeading}>2. Editing a Note</h2>
    <p style={styles.paragraph}>
      Click the "Edit" button on an existing note. Make any changes to the
      note's title, content, or tags, and click "Update Note" to save.
    </p>

    <h2 style={styles.sectionHeading}>3. Deleting a Note</h2>
    <p style={styles.paragraph}>
      To remove a note, click the "Delete" button on the note you want to
      delete.
    </p>

    <h2 style={styles.sectionHeading}>4. Using Tags</h2>
    <p style={styles.paragraph}>
      Tags help categorize your notes. Enter comma-separated tags when adding or
      editing a note. You can use tags like "work," "personal," or "urgent" to
      organize notes.
    </p>

    <h2 style={styles.sectionHeading}>Demo Examples</h2>
    <div style={styles.exampleContainer}>
      <div style={styles.example}>
        <span style={styles.exampleTitle}>Example 1:</span> A personal shopping
        list with tags like "groceries, weekly."
      </div>
      <div style={styles.example}>
        <span style={styles.exampleTitle}>Example 2:</span> A work task with a
        tag "urgent."
      </div>
      <div style={styles.example}>
        <span style={styles.exampleTitle}>Example 3:</span> Notes from a meeting
        with "meeting, project" tags.
      </div>
    </div>

    <p style={styles.footerText}>
      Try experimenting with different notes and tags to see how this app can
      fit into your workflow!
    </p>
  </div>
);

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    lineHeight: "1.6",
    backgroundColor: "#1a1a2e",
    color: "#e5e5e5",
  },
  mainHeading: {
    color: "#72c7ff",
    textAlign: "center",
    fontSize: "2.5em",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  sectionHeading: {
    color: "#72c7ff",
    fontSize: "1.8em",
    marginTop: "25px",
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: "1.1em",
    color: "#c5c5c5",
  },
  exampleContainer: {
    backgroundColor: "#2d2d44",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    marginTop: "20px",
  },
  example: {
    borderLeft: "4px solid #72c7ff",
    paddingLeft: "10px",
    marginBottom: "10px",
    fontSize: "1em",
    color: "#e5e5e5",
    backgroundColor: "#333a56",
    borderRadius: "5px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
  },
  exampleTitle: {
    fontWeight: "bold",
    color: "#72c7ff",
    marginRight: "5px",
  },
  footerText: {
    fontSize: "1.1em",
    color: "#888",
    marginTop: "30px",
    textAlign: "center",
    fontStyle: "italic",
  },
};

export default HowToUse;

import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notesData from "./notes";


function App() {
  const [noteList, setNoteList] = useState(notesData);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  
  const addNote = () => {
    const updatedNoteList = [
      ...noteList,
      {
        key: Date.now(),
        title: newNote.title,
        content: newNote.content,
      },
    ];
    setNoteList(updatedNoteList);
    setNewNote({ title: "", content: "" }); // Clear the input fields
  };

  const deleteNote = (key) => {
    const updatedNotes = noteList.filter((note) => note.key !== key);
    setNoteList(updatedNotes);
  };

  const clearAllNotes = () => {
    setNoteList([]); // Clear all notes
  };

  return (
    <div className="App">
      <Header />
      <div className="notes-container">
        {noteList.map((note) => (
          <Note
            key={note.key}
            title={note.title}
            content={note.content}
            onDelete={() => deleteNote(note.key)}
          />
        ))}
      </div>
      <div className="note-form">
  <input
    type="text"
    placeholder="Note Title"
    value={newNote.title}
    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
  />
  <textarea
    placeholder="Note Content"
    value={newNote.content}
    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
  />
  <button onClick={addNote}>Add Note</button>
  <div className="button-container">
    <button onClick={clearAllNotes} className="clear-button">
      Clear All Notes
    </button>
  </div>
</div>

      <Footer />
    </div>
  );
}

export default App;

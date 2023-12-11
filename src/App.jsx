import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notesData from "./notes";
import Login from "./login";
import { auth,database } from "./firebase";

function App() {
  const [user, setUser] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [noteList, setNoteList] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  console.log('Current user:', user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setAuthChecked(true);
  
      // Fetch notes when the user is initially authenticated
      if (user) {
        console.log('User UID (useEffect):', user.uid);
  
        fetch(`https://immense-tor-66429-7b1067da5daf.herokuapp.com/notes?userId=${user.uid}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => setNoteList(data))
          .catch((error) => console.error('Error fetching notes:', error));
      }
    });
  
    return () => unsubscribe();
  }, []);
  
   // Make sure to pass an empty dependency array to run this effect only once when the component mounts
  
  
  
  

  const addNote = () => {
  // Ensure that the user is logged in
  if (!user) {
    console.error('User not logged in');
    return;
  }

  console.log('User UID (addNote):', user.uid); // Add this line to log the UID

  // Add a new note to the server
  fetch('https://immense-tor-66429-7b1067da5daf.herokuapp.com/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: user.uid,
      title: newNote.title,
      content: newNote.content,
    }),
  })
    .then((response) => response.json())
    .then((data) => setNoteList([...noteList, data]))
    .catch((error) => console.error('Error adding note:', error));

  setNewNote({ title: '', content: '' });
};

  

  
  if (!authChecked) {
    // Don't render anything until authentication state is checked
    return <div>Loading...</div>;
  }
  
 

  const deleteNote = (id) => {
    // Delete an individual note on the server
    
    fetch(`https://immense-tor-66429-7b1067da5daf.herokuapp.com/notes/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        // If successful, update the client-side state
        const updatedNotes = noteList.filter((note) => note._id !== id);
        setNoteList(updatedNotes);
      })
      .catch((error) => console.error('Error deleting note:', error.message));
  };
  
  const clearAllNotes = () => {
    // Delete all notes on the server
    fetch('https://immense-tor-66429-7b1067da5daf.herokuapp.com/notes', {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        // If successful, update the client-side state
        setNoteList([]);
      })
      .catch((error) => console.error('Error clearing all notes:', error.message));
  };
  
 
  return (
    <div className="App">
      <Header />

      {!user && <Login />}

      {user && (
        <>
     

          <div className="notes-container">
            {noteList.map((note) => (
              <Note
              key={note._id}
              title={note.title}
              content={note.content}
              onDelete={() => deleteNote(note._id)}
              />
            ))}
          </div>

          <div className="note-form">
            <input
              type="text"
              placeholder="Note Title"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
            />
            <textarea
              placeholder="Note Content"
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
            />
            <button onClick={addNote}>Add Note</button>
            <div className="button-container">
              <button onClick={clearAllNotes} className="clear-button">
                Clear All Notes
              </button>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;

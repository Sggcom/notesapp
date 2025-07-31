import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from './bg.jpg';
const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("token");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // ✅ Load user's notes from localStorage
  useEffect(() => {
    if (!userEmail) {
      navigate("/");
      return;
    }
    const savedNotes = JSON.parse(localStorage.getItem(`notes_${userEmail}`)) || [];
    setNotes(savedNotes);
  }, [userEmail, navigate]);

  // ✅ Save notes to localStorage
  const saveNotesToStorage = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem(`notes_${userEmail}`, JSON.stringify(updatedNotes));
  };

  // ✅ Add or Update Note
  const addNote = () => {
    if (!newNote.trim()) return;
    const now = new Date();
    const dateTime = now.toLocaleString();

    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex].text = newNote;
      updatedNotes[editIndex].date = dateTime;
      saveNotesToStorage(updatedNotes);
      setEditIndex(null);
    } else {
      const updatedNotes = [...notes, { text: newNote, date: dateTime }];
      saveNotesToStorage(updatedNotes);
    }
    setNewNote("");
  };

  // ✅ Delete a note
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    saveNotesToStorage(updatedNotes);
  };

  // ✅ Edit a note
  const editNote = (index) => {
    setNewNote(notes[index].text);
    setEditIndex(index);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ backgroundImage: `url(${image})` }} className="bg-center  bg-cover">
    <div className="p-6 relative min-h-screen">
      {/* Logout Button - Fixed Top Right */}
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <h1 className="text-4xl mt-12 font-bold mb-10 mx-auto text-center">Welcome, {userEmail}</h1>

      {/* Notes Input Section */}
      <div className="bg-purple-100 p-4 rounded shadow max-w-xl mx-auto mb-6">
        <h2 className="text-xl font-bold mb-2">Your Notes</h2>
        <div className="flex gap-2 mb-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write a note..."
            className="border p-2 rounded flex-1 h-12 resize-none"
          />
          <button onClick={addNote} className="bg-green-600 text-white px-4 py-2 rounded">
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* Display Notes in a Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12 ">
        {notes.length > 0 ? (
          notes.map((note, index) => {
            const colors = [
              "bg-pink-200",
              "bg-yellow-200",
              "bg-green-200",
              "bg-blue-200",
              "bg-purple-200",
              "bg-orange-200",
            ];
            const noteColor = colors[index % colors.length];

            return (
              <div
                key={index}
                className={`${noteColor} p-3 rounded shadow flex flex-col justify-between w-56 mx-auto 
              transform transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <p className="text-lg mb-2 break-words">{note.text}</p>
                <p className="text-gray-700 text-sm mb-3">{note.date}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => editNote(index)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNote(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No notes yet. Add one above!
          </p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;

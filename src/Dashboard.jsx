import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "./bg.jpg";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("token");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [noteColor, setNoteColor] = useState("#f9c2ff");
  const [editId, setEditId] = useState(null);

  // Fetch notes
  useEffect(() => {
    if (!userEmail) {
      navigate("/");
      return;
    }

    const fetchNotes = async () => {
      const querySnapshot = await getDocs(collection(db, "users", userEmail, "notes"));
      const notesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotes(notesData);
    };

    fetchNotes();
  }, [userEmail, navigate]);

  // Add or Update Note
  const addOrUpdateNote = async () => {
    if (!newNote.trim()) return;
    const now = new Date();

    if (editId) {
      const noteRef = doc(db, "users", userEmail, "notes", editId);
      await updateDoc(noteRef, { text: newNote, date: now.toLocaleString(), color: noteColor });

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editId ? { ...note, text: newNote, date: now.toLocaleString(), color: noteColor } : note
        )
      );
      setEditId(null);
    } else {
      const docRef = await addDoc(collection(db, "users", userEmail, "notes"), {
        text: newNote,
        date: now.toLocaleString(),
        color: noteColor,
      });

      setNotes((prevNotes) => [
        ...prevNotes,
        { id: docRef.id, text: newNote, date: now.toLocaleString(), color: noteColor },
      ]);
    }

    setNewNote("");
    setNoteColor("#f9c2ff");
  };


  
  const deleteNote = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this note?");
  if (!confirmDelete) return;

  await deleteDoc(doc(db, "users", userEmail, "notes", id));
  setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
   toast.success(" Note deleted successfully!", { theme: "colored" });
};


  // Edit a note
  const editNote = (id, text, color) => {
    setNewNote(text);
    setNoteColor(color || "#f9c2ff");
    setEditId(id);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const colorPalette = [
  "#f9c2ff", 
  "#ffadad",
  "#ffd6a5", 
  "#fdffb6", 
  "#caffbf", 
  "#9bf6ff", 
  "#a0c4ff", 
  "#bdb2ff", 
];

  return (
    <div style={{ backgroundImage: `url(${image})` }} className="bg-center bg-cover min-h-screen">
      <div className="p-6 relative min-h-screen bg-black bg-opacity-10">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-5 right-5 bg-gradient-to-r from-red-500 to-red-900 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition sm:right-5 left-5 sm:left-auto sm:top-5 sm:mb-10"
        >
          Logout
        </button>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white drop-shadow-lg mt-8 md:mt-12 font-extrabold mb-6 md:mb-10 text-center">
  Welcome, <span className="text-yellow-300 break-words">{userEmail}</span>
</h1>


        {/* Notes Input Section */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-2xl mx-auto mb-8 backdrop-blur-lg bg-opacity-90">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Create or Edit Your Note
          </h2>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
            className="border border-gray-300 p-3 rounded-xl w-full resize-none focus:ring-2 focus:ring-purple-400 outline-none mb-4"
            rows="4"
          />
          <div className="flex justify-between items-center">
            {
            <div className="flex flex-col gap-4">
            <label className="font-semibold text-gray-600">Pick a Color:</label>
            <div className="flex flex-wrap gap-3">
              {colorPalette.map((color) => (
                <div
                  key={color}
                  onClick={() => setNoteColor(color)}
                  className={`w-9 h-9 rounded-full cursor-pointer border-4 ${
                    noteColor === color ? "border-black" : "border-white"
                  }`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
              {/* Still include an option for custom color */}
              <label className="cursor-pointer w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center">
                <input
                  type="color"
                  value={noteColor}
                  onChange={(e) => setNoteColor(e.target.value)}
                  className="opacity-0 absolute w-9 h-9 cursor-pointer"
                />
                🎨
              </label>
            </div>
          </div>
}
            <button
              onClick={addOrUpdateNote}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition mt-10"
            >
              {editId ? "Update Note" : "Add Note"}
            </button>
          </div>
        </div>

        {/* Notes Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                style={{ backgroundColor: note.color || "#f9c2ff" }}
                className="p-4 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 backdrop-blur-lg bg-opacity-95"
              >
                <p className="text-lg mb-3 break-words font-medium">{note.text}</p>
                <p className="text-gray-700 text-xs mb-4">{note.date}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => editNote(note.id, note.text, note.color)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-lg text-center col-span-full mt-6">
              No notes yet. Start by adding one above! 
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

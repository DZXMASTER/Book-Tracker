import React, { useState } from "react";
import { db, auth } from "../firebase";
import { doc, collection, addDoc, updateDoc } from "firebase/firestore";

interface AddBookModalProps {
    book?: { id: string; title: string; author: string; status: string } | null;
    onClose: () => void;
  }

const AddBookModal: React.FC<AddBookModalProps> = ({ book, onClose }) => {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [status, setStatus] = useState(book?.status || "To-Read");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title || !author) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      if (book) {
        const bookRef = doc(db, "books", book.id);
        await updateDoc(bookRef, { title, author, status });
        alert("Book updated successfully!");
      } else {
        const user = auth.currentUser;
        if (user) {
          await addDoc(collection(db, "books"), {
            title,
            author,
            status,
            userId: user.uid,
            createdAt: new Date(),
          });
          alert("Book added successfully!");
        }
      }
      onClose();
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Failed to save book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{book ? "Edit Book" : "Add Book"}</h2>
        <input
          type="text"
          placeholder="Book Title"
          className="w-full p-2 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          className="w-full p-2 border rounded mb-4"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded mb-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To-Read">To-Read</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Finished">Finished</option>
        </select>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`${
              loading ? "bg-blue-300" : "bg-blue-500"
            } text-white py-2 px-4 rounded`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;

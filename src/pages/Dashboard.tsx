import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import AddBookModal from "../components/AddBookModal";

interface Book {
  id: string;
  title: string;
  author: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    if (user) {
        const q = query(collection(db, "books"), where("userId", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const booksArray: any = [];
        querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
        });
        setBooks(booksArray);
        });
        return () => unsubscribe();
    }
  }, [navigate]);

  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteDoc(doc(db, "books", bookId));
      alert("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
    }
  };

  const openEditModal = (bookId: string, bookData: Book) => {
    const { id, ...restOfBookData } = bookData;
    setSelectedBook({ id: bookId, ...restOfBookData });
    setIsModalOpen(true);
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || book.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Your Books</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search books..."
          className="w-full p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="To-Read">To-Read</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Finished">Finished</option>
        </select>
        <button
          onClick={() => {
            setSelectedBook(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Book
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={openEditModal}
            onDelete={handleDeleteBook}
          />
        ))}
      </div>

      {isModalOpen && (
        <AddBookModal
          book={selectedBook}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
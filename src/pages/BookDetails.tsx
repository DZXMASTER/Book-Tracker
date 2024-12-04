import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Book {
  id: string;
  title: string;
  author: string;
  status: string;
}

const BookDetails: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;

      try {
        const docRef = doc(db, "books", bookId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBook({ id: bookId, ...docSnap.data() } as Book);
        } else {
          alert("Book not found.");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        alert("An error occurred.");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId, navigate]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!book) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Author:</strong> {book.author}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <strong>Status:</strong> {book.status}
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default BookDetails;

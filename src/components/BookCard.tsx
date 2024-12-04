import React from "react";

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    status: string;
  };
  onEdit: (bookId: string, bookData: any) => void;
  onDelete: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="text-lg font-bold">{book.title}</h2>
      <p className="text-gray-600">by {book.author}</p>
      <p className="text-sm text-blue-500">{book.status}</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => onEdit(book.id, book)}
          className="text-blue-500 hover:underline mr-4"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;

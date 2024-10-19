import React, { useState } from 'react';
import axios from 'axios';

const UpdateBookModal = ({ book, isOpen, onClose, onUpdate }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare updated book details
    const updatedBook = { ...book, title, author, genre };

    try {
      // Send the updated data to the backend
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No token found! Cannot update book.');
        return;
      }

      await axios.put(`http://localhost:8080/api/books/${book._id}`, updatedBook, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Call the parent onUpdate to update the UI
      onUpdate(updatedBook);
      onClose();  // Close modal after update
    } catch (error) {
      console.error('There was an error updating the book:', error);
    }
  };

  if (!isOpen) return null; // Modal is hidden when `isOpen` is false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Genre</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="py-2 px-4 bg-red-800    text-white rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookModal;

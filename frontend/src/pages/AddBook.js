import React, { useState } from 'react';
import axios from 'axios';
import BookImg from '../compornents/bok2.jpg'; // Ensure the path is correct

const AddBookModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = { title, author, genre, publicationDate };
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No token found! Cannot add book.');
        return;
      }
      const response = await axios.post('http://localhost:8080/api/books', newBook, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onAdd(response.data);
      onClose();
    } catch (error) {
      console.error('There was an error adding the book:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[500px] shadow-lg flex overflow-hidden">
        <div className="w-2/3 h-full relative">
          <img src={BookImg} alt="Book" className="w-full h-full object-cover" />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center justify-center">
          </div> */}
        </div>
        <div className="w-1/3 p-8 overflow-y-auto mt-4">
        <h1 className='font-bold'>Add Book</h1>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Genre</label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Publication Date</label>
              <input
                type="date"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md text-sm"
                required
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-300 rounded-md text-sm">
                Cancel
              </button>
              <button type="submit" className="py-2 px-4 bg-red-800 text-white rounded-md text-sm">
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
// src/pages/EditBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState({ title: '', author: '', genre: '', publicationDate: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the book!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/books/${id}`, book)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error("There was an error updating the book!", error);
      });
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input type="text" name="title" value={book.title} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Author</label>
          <input type="text" name="author" value={book.author} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Genre</label>
          <input type="text" name="genre" value={book.genre} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Publication Date</label>
          <input type="date" name="publicationDate" value={book.publicationDate} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Update Book</button>
      </form>
    </div>
  );
}

export default EditBook;

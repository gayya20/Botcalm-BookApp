import React, { useState, useEffect } from 'react';
import { PlusCircle, Book, Edit, Trash2 } from 'lucide-react'; // Import PlusCircle icon
import axios from 'axios';
import Swal from 'sweetalert2';
import BookImg from './bok.jpg';
import Footer from './Footer';
import UpdateBookModal from '../pages/UpdateBookModal';
import AddBookModal from '../pages/AddBook'; // Import the AddBookModal

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('No token found!');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBooks(response.data);
      } catch (error) {
        console.error("There was an error fetching the books!", error);
      }
    };

    fetchBooks();
  }, []);

  const handleUpdate = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book._id === updatedBook._id ? updatedBook : book))
    );
  };

  const handleAdd = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const deleteBook = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('No token found! Cannot delete book.');
          return;
        }

        await axios.delete(`http://localhost:8080/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));

        Swal.fire('Deleted!', 'Your book has been deleted.', 'success');
      } catch (error) {
        console.error("There was an error deleting the book!", error);
      }
    }
  };

  const openUpdateModal = (book) => {
    setSelectedBook(book);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedBook(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div className="container mx-auto mt-10 px-10">
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ marginTop: "50px" }}>
          My Book <span className="font-thin">Collection</span>
        </h1>
        <div className="flex justify-end mb-4">
          <button onClick={openAddModal} className="text-red-800 hover:text-green-800 transition-colors duration-300 flex items-center font-bold">
            <PlusCircle size={24} className="mr-2" /> Add Book
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginTop: "50px" }}>
          {books.map((book) => (
            <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <img src={BookImg} alt={book.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-1">
                  <Book className="inline mr-2" size={16} />
                  {book.author}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                    {book.genre}
                  </span>
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => openUpdateModal(book)}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center"
                  >
                    <Edit size={16} className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-300 flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>

      {/* AddBookModal */}
      <AddBookModal isOpen={isAddModalOpen} onClose={closeAddModal} onAdd={handleAdd} />

      {/* UpdateBookModal */}
      {selectedBook && (
        <UpdateBookModal
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          book={selectedBook}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default BookList;

import create from 'zustand';
import axios from 'axios';

const useBookStore = create((set) => ({
  books: [],
  fetchBooks: async () => {
    const response = await axios.get('/api/books');
    set({ books: response.data });
  },
  addBook: async (book) => {
    await axios.post('/api/books', book);
    set((state) => ({ books: [...state.books, book] }));
  },
  editBook: async (id, updatedBook) => {
    await axios.put(`/api/books/${id}`, updatedBook);
    set((state) => ({
      books: state.books.map((book) =>
        book._id === id ? updatedBook : book
      ),
    }));
  },
  deleteBook: async (id) => {
    await axios.delete(`/api/books/${id}`);
    set((state) => ({
      books: state.books.filter((book) => book._id !== id),
    }));
  },
}));

export default useBookStore;

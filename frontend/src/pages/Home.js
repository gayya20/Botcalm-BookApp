import React from 'react';
import Footer from '../compornents/Footer';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation */}
        {/* <nav className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800">BookExpress</div>
            <div className="space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">Login</a>
              <a href="#" className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Sign Up</a>
            </div>
          </div>
        </nav> */}

      {/* Hero Section */}
      <div className="max-w-[1350px] mx-auto mt-8 rounded-lg overflow-hidden" style={{ borderRadius: "20px" }}>
      <header className="relative bg-cover bg-center h-[500px]" style={{backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container mx-auto px-6 py-16 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Your Literary Journey Starts Here</h1>
          <p className="text-xl mb-8 text-gray-200">Discover, track, and share your reading adventures with BookExpress</p>
          <a href="#" className="bg-red-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-900 transition duration-300 inline-block w-max">Get Started</a>
        </div>
      </header>
     </div>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-800 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 className="text-xl font-semibold mb-2">Track Your Books</h2>
            <p className="text-gray-600">Easily manage your reading list and track your progress.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-800 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="text-xl font-semibold mb-2">Discover New Titles</h2>
            <p className="text-gray-600">Explore curated lists and personalized recommendations.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-800 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-xl font-semibold mb-2">Connect with Readers</h2>
            <p className="text-gray-600">Join a community of book lovers and share your thoughts.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-200">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Embark on Your Reading Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of readers who have already discovered the joy of BookExpress.</p>
          <a href="#" className="bg-red-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300">Create Your Account</a>
        </div>
      </section>

      {/* Footer */}
      
      <Footer/>
    </div>
  );
};

export default Home;
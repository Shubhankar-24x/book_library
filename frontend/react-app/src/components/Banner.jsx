import React, { useState } from 'react';
import BannerCard from '../home/BannerCard';

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleSearch = () => {
    fetch(`http://localhost:3000/books/search?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setSearchResult(data[0]); // Show only the first matched book
          setIsModalOpen(true); // Open the modal
        } else {
          setSearchResult(null);
          alert('No books found for your query.');
        }
      })
      .catch((error) => console.error('Error fetching search results:', error));
  };

  const handleAddToCart = (book) => {
    setCartItems((prevItems) => [...prevItems, book]);
    alert(`${book.title} has been added to your cart.`);
  };

  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
      <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
        {/* Left side */}
        <div className='md:w-1/2 space-y-8 h-full'>
          <h2 className='text-5xl font-bold leading-snug text-black'>
            Buy and Sell Your Books <span className='text-blue-700'>for the Best Prices</span>
          </h2>
          <p className='md:w-4/5'>
            Discover a wide range of books at unbeatable prices. Whether you're looking to buy or sell, we've got you covered.
          </p>
          <div>
            <input
              type="search"
              name='search'
              id='search'
              placeholder='Search a book'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='py-2 px-2 rounded-s-sm outline-none border border-gray-300'
            />
            <button
              onClick={handleSearch}
              className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200 rounded-e-sm'
            >
              Search
            </button>
          </div>
        </div>

        {/* Right side */}
        <div>
          <BannerCard />
        </div>
      </div>

      {/* Modal for Search Result */}
      {isModalOpen && searchResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-red-600 text-white rounded-full px-2 py-1"
            >
              X
            </button>
            <h3 className="text-2xl font-bold mb-4">Book Details</h3>
            <div className="flex flex-col items-center">
              <img
                src={searchResult.imageURL || 'default-image-url.jpg'}
                alt={`Cover of ${searchResult.title}`}
                className="w-40 h-60 object-cover mb-4"
              />
              <h4 className="text-lg font-semibold">{searchResult.title}</h4>
              <p className="text-gray-600">Author: {searchResult.author || 'Unknown'}</p>
              <p className="text-gray-600">Publisher: {searchResult.publisher || 'Unknown'}</p>
              <p className="text-lg font-bold mt-4">Price: ₹{searchResult.rentalPrice.toFixed(2)}</p>
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => alert(`Redirecting to buy page for ${searchResult.title}`)} // Replace with actual buy logic
                  className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-black transition-all ease-in duration-200"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleAddToCart(searchResult)}
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all ease-in duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;

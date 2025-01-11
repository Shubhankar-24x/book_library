import React, { useState, useEffect } from 'react';
import BookCards from '../components/BookCards';

const BestSellerBook = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    fetch("http://localhost:3000/books/bestsellers")
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch best seller books');
        }
        return res.json();
      })
      .then(data => {
        setBooks(data.slice(0, 8)); 
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if something goes wrong
  }

  return (
    <div>
      <BookCards books={books} headline="Best Seller Books"/>
      
    </div>
    
  );
};

export default BestSellerBook;

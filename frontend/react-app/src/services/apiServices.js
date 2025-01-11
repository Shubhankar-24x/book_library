import axios from 'axios';

const API_URL = 'http://localhost:3000/books';

// Function to fetch all books
export const fetchBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Function to fetch bestseller books
export const fetchBestsellers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/books/bestsellers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bestsellers:', error);
    throw error;
  }
};

// You can add more functions for other CRUD operations as needed

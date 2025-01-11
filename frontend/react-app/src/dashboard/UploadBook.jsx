import React, { useState } from 'react';
import { Button, Label, Textarea, TextInput } from "flowbite-react";

const UploadBook = () => {
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Biography",
    "Autobiography",
    "History",
    "Self-help",
    "Memoir",
    "Business",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design"
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
  const [status, setStatus] = useState("Yes");

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
  
    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = selectedBookCategory;
    const bookDescription = form.bookDescription.value;
    const isbn = form.isbn.value;
    const rentalPrice = parseFloat(form.price.value); // Changed from 'price' to 'rentalPrice'
    const publisher = form.publisher.value;
  
    const bookobj = {
      title: bookTitle,
      author: authorName,
      imageURL,
      category,
      description: bookDescription,
      isbn,
      rentalPrice, // Updated to match schema field
      publisher,
      status,
    };
  
    // Log the data to check before sending the request
    console.log("Uploading book with data:", bookobj);
  
    fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookobj),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        alert("Book uploaded successfully!");
        form.reset();
      })
      .catch((error) => {
        // Log and display the error message
        console.error("Error uploading book:", error);
        alert(`Failed to upload book. Please try again. Error: ${error.message}`);
      });
  };
  
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>

      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4 ">
        <div className='flex gap-8'>
          {/* Book Title */}
          <div className="lg:w-1/2">
            <Label htmlFor="bookTitle" value="Book Title" className="mb-2 block" />
            <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book Name" required />
          </div>

          {/* Author Name */}
          <div className="lg:w-1/2">
            <Label htmlFor="authorName" value="Author Name" className="mb-2 block" />
            <TextInput id="authorName" name='authorName' type="text" placeholder="Author Name" required />
          </div>
        </div>

        {/* Second Row */}
        <div className='flex gap-8'>
          <div className="lg:w-1/2">
            <Label htmlFor="publisher" value="Publisher" className="mb-2 block" />
            <TextInput id="publisher" name='publisher' type="text" placeholder="Publisher" required />
          </div>

          <div className="lg:w-1/2">
            <Label htmlFor="imageURL" value="Book Image URL" className="mb-2 block" />
            <TextInput id="imageURL" name='imageURL' type="text" placeholder="Book Image URL" required />
          </div>
        </div>

        {/* Category and Status */}
        <div className='flex gap-8'>
          <div className="lg:w-1/2">
            <Label htmlFor="inputState" value="Book Category" className="mb-2 block" />
            <select
              name="categoryName"
              id="inputState"
              className='w-full rounded'
              value={selectedBookCategory}
              onChange={handleChangeSelectedValue}
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="lg:w-1/2">
            <Label htmlFor="status" value="Status" className="mb-2 block" />
            <select
              name="status"
              id="status"
              className='w-full rounded'
              value={status}
              onChange={handleStatusChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* Book Description */}
        <div>
          <Label htmlFor="bookDescription" value="Book Description" className="mb-2 block" />
          <Textarea
            id="bookDescription"
            name="bookDescription"
            placeholder="Write your book description..."
            required
            className='w-full'
            rows={6}
          />
        </div>

        {/* ISBN, Price, PDF URL */}
        <div className='flex gap-8'>
          <div className="lg:w-1/3">
            <Label htmlFor="isbn" value="ISBN Number" className="mb-2 block" />
            <TextInput id="isbn" name="isbn" type='text' placeholder="ISBN" required />
          </div>

          <div className="lg:w-1/3">
            <Label htmlFor="price" value="Price" className="mb-2 block" />
            <TextInput id="price" name="price" type='number' placeholder="Price" required />
          </div>

          
        </div>

        <button type='submit' className='mt-5 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4'>
          Upload Book
        </button>
      </form>
    </div>
  );
};

export default UploadBook;





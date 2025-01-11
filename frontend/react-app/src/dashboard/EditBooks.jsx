import React, { useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { Label, Textarea, TextInput } from "flowbite-react";

const EditBooks = () => {
  const { id } = useParams(); // Get book ID from the URL params
  const { _id, title, author, imageURL, category, description, isBestseller } = useLoaderData();

  const bookCategories = [
    "Fiction", "Non-Fiction", "Mystery", "Programming", "Science Fiction", "Fantasy", "Horror",
    "Biography", "Autobiography", "History", "Self-help", "Memoir", "Business", "Children Books",
    "Travel", "Religion", "Art and Design"
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(category);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const _id = form.bookId.value; // Capture bookId
    const title = form.title.value;
    const author = form.author.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const description = form.description.value;
    const isBestseller = form.isBestseller.value;

    const updateBookObj = {
      _id, // Include bookId in the payload
      title,
      author,
      imageURL,
      category,
      description,
      isBestseller,
    };

    // Update book data using the correct URL
    fetch(`http://localhost:3000/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateBookObj),
    })
      .then(res => res.json())
      .then(data => {
        alert("Book updated successfully!");
      })
      .catch(error => {
        alert("Error updating book. Please try again.");
      });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update the Book Data</h2>

      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col gap-4">
        {/* Book ID */}
        <div className="lg:w-1/2">
          <Label htmlFor="bookId" value="Book ID" className="mb-2 block" />
          <TextInput
            id="_id"
            name="bookId"
            type="text"
            placeholder="Book ID"
            required
            defaultValue={_id}
            
          />
        </div>

        <div className='flex gap-8'>
          {/* Book Title */}
          <div className="lg:w-1/2">
            <Label htmlFor="title" value="Book Title" className="mb-2 block" />
            <TextInput
              id="title"
              name='bookTitle'
              type="text"
              placeholder="Book Name"
              required
              defaultValue={title}
            />
          </div>

          {/* Author Name */}
          <div className="lg:w-1/2">
            <Label htmlFor="authorName" value="Author Name" className="mb-2 block" />
            <TextInput
              id="author"
              name='authorName'
              type="text"
              placeholder="Author Name"
              required
              defaultValue={author}
            />
          </div>
        </div>

        <div className='flex gap-8'>
          {/* Book Image URL */}
          <div className="lg:w-1/2">
            <Label htmlFor="imageURL" value="Book Image URL" className="mb-2 block" />
            <TextInput
              id="imageURL"
              name='imageURL'
              type="text"
              placeholder="Book Image URL"
              required
              defaultValue={imageURL}
            />
          </div>

          {/* Book Category */}
          <div className="lg:w-1/2">
            <Label htmlFor="categoryName" value="Book Category" className="mb-2 block" />
            <select
              name="categoryName"
              id="category"
              className='w-full rounded'
              value={selectedBookCategory}
              onChange={handleChangeSelectedValue}
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Book Description */}
        <div>
          <Label htmlFor="description" value="description" className="mb-2 block" />
          <Textarea
            id="description"
            name="description"
            placeholder="Write your book description..."
            required
            className='w-full'
            rows={6}
            defaultValue={description}
          />
        </div>
        {/*is bestseller */}
        <div>
          <Label htmlFor="Bestseller" value="Bestseller" className="mb-2 block" />
          <Textarea
            id="isBestseller"
            name="isBestseller"
            placeholder="Write your book description..."
            required
            className='w-full'
            rows={6}
            defaultValue={isBestseller}
          />
        </div>

        

        <button type='submit' className='mt-5 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4'>
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBooks;

import { useEffect, useState } from "react";
import { Table, Spinner, TextInput, Select, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }
        return res.json();
      })
      .then((data) => {
        // Sorting books by `createdAt` in descending order
        const sortedBooks = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAllBooks(sortedBooks);
        setFilteredBooks(sortedBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            alert("Book is deleted successfully");
            setAllBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
            setFilteredBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
          } else {
            alert("Failed to delete the book");
          }
        })
        .catch((error) => console.error("Error deleting book:", error));
    }
  };

  // Search Handler (Dynamic Search)
  const handleSearch = () => {
    let filtered = allBooks.filter((book) => {
      const normalizedSearchQuery = searchQuery.replace(/\s+/g, '').toLowerCase();
      const normalizedTitle = book.title.replace(/\s+/g, '').toLowerCase();
      const normalizedAuthor = book.author.replace(/\s+/g, '').toLowerCase();

      return normalizedTitle.includes(normalizedSearchQuery) || normalizedAuthor.includes(normalizedSearchQuery);
    });
    setFilteredBooks(filtered);
  };

  // Filter Handler
  const handleFilter = () => {
    let filtered = allBooks;

    if (categoryFilter) {
      filtered = filtered.filter((book) => book.category === categoryFilter);
    }

    if (priceFilter) {
      const [minPrice, maxPrice] = priceFilter.split("-").map(Number);
      filtered = filtered.filter((book) => {
        const price = parseFloat(book.rentalPrice);
        return price >= minPrice && price <= maxPrice;
      });
    }

    setFilteredBooks(filtered);
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setPriceFilter("");
    setFilteredBooks(allBooks);
  };

  // Dynamic search triggered as the user types
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  useEffect(() => {
    handleFilter();
  }, [categoryFilter, priceFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  // Show "No Books Found" message when there are no books in filteredBooks
  const noBooksFound = filteredBooks.length === 0;

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Manage Your Books</h2>

      {/* Search and Filter Section */}
      <div className="flex gap-4 mb-8">
        {/* Search Input */}
        <TextInput
          placeholder="Search by book name or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Dynamically update search query
        />

        {/* Category Filter */}
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Science">Science</option>
          <option value="Biography">Biography</option>
          {/* Add other categories as needed */}
        </Select>

        {/* Price Filter */}
        <Select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="0-100">₹0 - ₹100</option>
          <option value="101-500">₹101 - ₹500</option>
          <option value="501-1000">₹501 - ₹1000</option>
          <option value="1001-5000">₹1001 - ₹5000</option>
          {/* Add other price ranges as needed */}
        </Select>

        {/* Apply Filter Button */}
        <Button onClick={handleFilter} className="bg-green-600">Apply Filters</Button>
        <Button onClick={resetFilters} className="bg-gray-400">Reset Filters</Button>
      </div>

      {/* Show "No Books Found" message if no books match search/filter criteria */}
      {noBooksFound && (
        <div className="flex flex-col items-center mt-12">
          <h2 className="text-3xl font-bold mb-4">No Books Found</h2>
          <p className="text-gray-600">Try adding some books or adjust your filters to see results.</p>
        </div>
      )}

      {/* Table for book data */}
      {!noBooksFound && (
        <Table className="lg:w-[1180px]">
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Book Image</Table.HeadCell>
            <Table.HeadCell>Book Name</Table.HeadCell>
            <Table.HeadCell>Author Name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Edit or Manage</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredBooks.map((book, index) => (
              <Table.Row key={book._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={book.imageURL || "/default-book-image.jpg"}
                    alt={book.title || "No Title Available"}
                    className="h-16 w-16 object-cover rounded"
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {book.title || "No Title Available"}
                </Table.Cell>
                <Table.Cell>{book.author || "Unknown Author"}</Table.Cell>
                <Table.Cell>{book.category || "Uncategorized"}</Table.Cell>
                <Table.Cell>₹{book.rentalPrice || "N/A"}</Table.Cell>
                <Table.Cell>
                  <Link
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                    to={`/admin/dashboard/edit-books/${book._id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default ManageBooks;

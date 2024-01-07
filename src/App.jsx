// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";
import ImageDetail from "./components/ImageDetail";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [darkMode, setDarkMode] = useState(false); // Add this line
  const itemsPerPage = 21; // Set items per page

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=${
          import.meta.env.VITE_REACT_APP_PIXABAY
        }&q=${term}&image_type=photo&pretty=true&page=${currentPage}&per_page=${itemsPerPage}`
      )
      .then((res) => {
        setImages(res.data.hits);
        setTotalPages(Math.ceil(res.data.totalHits / itemsPerPage)); // Adjust total pages calculation
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Router>
      <div
        className={
          darkMode
            ? "bg-gray-900 text-white min-h-screen"
            : "bg-gray-100 min-h-screen"
        }
      >
        <div className="container mx-auto p-8">
          <button onClick={() => setDarkMode(!darkMode)}>
            Toggle Dark Mode
          </button>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1 className="text-4xl font-bold text-center mb-8 text-teal-500">
                    Pixabay Image Gallery
                  </h1>
                  <ImageSearch searchText={(text) => setTerm(text)} />

                  {!isLoading && images.length === 0 && (
                    <h2 className="text-2xl text-center my-8 text-gray-600">
                      No Images Found
                    </h2>
                  )}
                  {isLoading ? (
                    <h2 className="text-2xl text-center my-8 text-gray-600">
                      Loading...
                    </h2>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {images.map((image) => (
                          <ImageCard key={image.id} image={image} />
                        ))}
                      </div>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                        >
                          Previous Page
                        </button>
                        <button
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                        >
                          Next Page
                        </button>
                      </div>
                    </>
                  )}
                </>
              }
            />
            <Route
              path="/image/:id"
              element={<ImageDetail darkMode={darkMode} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

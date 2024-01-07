import { useState } from "react";
import PropTypes from "prop-types";

const ImageSearch = ({ searchText }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    searchText(text);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-10 mt-10">
      <form onSubmit={onSubmit} className="flex items-center">
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Search for images..."
          className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-teal-500"
        />
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-r"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

ImageSearch.propTypes = {
  searchText: PropTypes.func.isRequired,
};

export default ImageSearch;

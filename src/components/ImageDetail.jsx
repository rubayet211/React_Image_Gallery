import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios"; // Import axios

const ImageDetail = ({ darkMode }) => {
  const { id } = useParams();
  const [imageDetail, setImageDetail] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=${
          import.meta.env.VITE_REACT_APP_PIXABAY
        }&id=${id}`
      )
      .then((res) => {
        const data = res.data;
        if (data.hits && data.hits.length > 0) {
          setImageDetail(data.hits[0]);
        } else {
          console.error("Image not found");
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!imageDetail) {
    return <div className="text-lg font-semibold">Loading...</div>;
  }

  return (
    <div
      className={
        darkMode
          ? "max-w-2xl mx-auto bg-gray-900 text-white shadow-md rounded-lg p-6"
          : "max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6"
      }
    >
      <Link
        to="/"
        className="inline-block mb-4 text-blue-500 hover:text-blue-600"
      >
        Home
      </Link>
      <h2 className="text-2xl font-bold mb-2">{imageDetail.user}</h2>
      <img
        src={imageDetail.largeImageURL}
        alt={imageDetail.tags}
        className="w-full object-cover object-center rounded-lg shadow-md"
      />
      <div className="flex items-center mt-4 text-gray-500">
        <strong className="text-sm uppercase">Tags:</strong>
        <span className="ml-2 text-sm">{imageDetail.tags}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-500">
        <strong className="text-sm uppercase">Views:</strong>
        <span className="ml-2 text-sm">{imageDetail.views}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-500">
        <strong className="text-sm uppercase">Downloads:</strong>
        <span className="ml-2 text-sm">{imageDetail.downloads}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-500">
        <strong className="text-sm uppercase">Likes:</strong>
        <span className="ml-2 text-sm">{imageDetail.likes}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-500">
        <strong className="text-sm uppercase">Comments:</strong>
        <span className="ml-2 text-sm">{imageDetail.comments}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-500">
        <strong className="text-sm uppercase">User:</strong>
        <span className="ml-2 text-sm">{imageDetail.user}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-700">
        <strong className="text-sm uppercase">User URL:</strong>
        <a
          href={imageDetail.pageURL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-blue-400 underline"
        >
          {imageDetail.pageURL}
        </a>
      </div>
    </div>
  );
};

ImageDetail.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default ImageDetail;

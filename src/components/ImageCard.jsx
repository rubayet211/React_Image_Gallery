import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ImageCard = ({ image }) => {
  const tags = image.tags.split(",");

  return (
    <div className="max-w-md bg-white rounded overflow-hidden shadow-lg">
      <Link to={`/image/${image.id}`}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          className="w-full h-48 object-cover object-center"
        />
      </Link>
      <div className="px-6 py-4">
        <div className="font-bold text-gray-800 text-xl mb-2">
          Photo by {image.user}
        </div>
        <ul>
          <li className="text-slate-800">
            <strong className="text-slate-800">Views: </strong>
            {image.views}
          </li>
          <li className="text-slate-800">
            <strong className="text-slate-800">Likes: </strong>
            {image.likes}
          </li>
        </ul>
      </div>
      <div className="px-6 py-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
};

export default ImageCard;

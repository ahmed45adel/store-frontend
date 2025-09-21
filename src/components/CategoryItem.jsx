import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative block rounded-lg overflow-hidden shadow-lg"
    >
      <img
        src={category.imageUrl}
        alt={category.name}
        className="w-full h-64 object-cover group-hover:scale-105 transform transition duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center">
        <h3 className="text-white text-xl sm:text-2xl font-semibold">{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryItem;
import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import LoadingSpinner from "../components/LoadingSpinner";

const categories = [
  { slug: "jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { slug: "t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { slug: "shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { slug: "glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { slug: "jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { slug: "suits", name: "Suits", imageUrl: "/suits.jpg" },
  { slug: "bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, featuredProducts, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.slug} />
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <LoadingSpinner />
          </div>
        ) : (
          featuredProducts.length > 0 && (
            <FeaturedProducts featuredProducts={featuredProducts} />
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
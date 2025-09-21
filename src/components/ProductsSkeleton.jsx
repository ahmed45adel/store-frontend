const ProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse bg-gray-800 rounded-lg p-4 w-full flex flex-col"
        >
          <div className="bg-gray-700 h-48 w-full rounded-md mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductsSkeleton;
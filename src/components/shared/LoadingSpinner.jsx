const LoadingSpinner = ({ size = "lg" }) => {
  const sizes = { sm: "h-6 w-6", md: "h-10 w-10", lg: "h-16 w-16" };
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        <div
          className={`${sizes[size]} rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin`}
        />
        <div className="absolute inset-0 flex items-center justify-center text-lg">
          🐾
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

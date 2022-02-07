const Container = ({ children }) => {
  return (
    <div className="border border-gray-900 rounded shadow-2xl mx-4 my-4 md:mx-8 p-2 text-gray-100 bg-gray-800 bg-opacity-20">
      {children}
    </div>
  );
};

export default Container;

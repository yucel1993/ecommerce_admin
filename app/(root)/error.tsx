"use client";

import { useState } from "react";

const Error = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    window.location.reload(); // Reload the page
  };

  return (
    <div className="flex max-w-[1000px] mx-auto justify-center items-center">
      <p className="text-bold text-3xl text-purple-500">
        Oops! Connection has been lost. Refresh the page again 🚀
      </p>
      <button
        onClick={handleRefresh}
        className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        disabled={refreshing}
      >
        {refreshing ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
};

export default Error;

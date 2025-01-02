import React, { useEffect, useState } from "react";
import LoadingSpinner from "../shared-components/LoadingSpinner";
import RandomUserList from "../components/RandomUserList";
import { getUserList } from "../store/slices/user/service"; // Adjust the import
import { useUser } from "../store/slices/user/actions"; // Adjust the import

const HomePage = () => {
  const { userList, updateUserList } = useUser(); // Assuming useUser provides userList and actions
  const [pageLoading, setPageLoading] = useState(true);

  // Fetch user list on component mount
  useEffect(() => {
    if (!userList || userList.length === 0) {
      getUserList(setPageLoading); // Pass setPageLoading to getUserList to handle loading state
    }
  }, [userList]); // Fetch only when the userList is empty or null

  console.log("users:", userList);

  return (
    <>
      {pageLoading && (!userList || userList.length === 0) ? (
        <LoadingSpinner />
      ) : userList && userList.length ? (
        <div className="relative min-h-screen text-white overflow-hidden">
          <div className="flex flex-col items-center justify-center z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
              Random Person
            </h1>
            <p className="text-center text-xl text-gray-300 mb-12">
              Discover the latest random Person
            </p>

            <RandomUserList randomUsers={userList} />

            <button
              onClick={() => getUserList(setPageLoading)} // Fetch new users when button is clicked
              disabled={pageLoading}
              className={`p-2 m-1 bg-emerald-400 text-2xl shadow-transparent rounded-sm hover:bg-emerald-300 ${
                pageLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {pageLoading ? "Loading..." : "Random Person"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500 mt-16">
          Failed to load random users. Please try again.
        </p>
      )}
    </>
  );
};

export default HomePage;

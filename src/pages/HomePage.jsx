import React, { useEffect } from "react";
import { useRandomStore } from "../store/useRandomStore";
import LoadingSpinner from "../shared-components/LoadingSpinner";
import RandomUserItem from "../components/RandomUserItem";

const HomePage = () => {
  const { getRandomUsers, randomUser, isRandomUsersLoading } = useRandomStore();

  useEffect(() => {
    getRandomUsers();
  }, [getRandomUsers]);

  // Make sure randomUser is defined and has results
  const user = randomUser?.results?.[0];  // Access the first user

  return (
    <>
      {isRandomUsersLoading ? (
        <LoadingSpinner />
      ) : user ? (

        <div className="relative min-h-screen text-white overflow-hidden">
        <div className="flex flex-col items-center justify-center z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
            Random Person
          </h1>
          <p className="text-center text-xl text-gray-300 mb-12">
            Discover the latest random Person
          </p>
          <RandomUserItem user={user} />
          <button
          onClick={getRandomUsers}
           className="p-2 m-1 bg-emerald-400 text-2xl shadow-transparent rounded-sm hover:bg-emerald-300">Random Person</button>
          </div>
          </div>
    
     
      
      
      ) : (
        <p>No user data found</p>
      )}
    </>
  );
};

export default HomePage;

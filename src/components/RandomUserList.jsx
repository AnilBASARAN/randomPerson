import React from "react";
import RandomUserItem from "./RandomUserItem";



const RandomUserList = ({randomUsers}) => {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {randomUsers && randomUsers.length > 0 ? (
        randomUsers.map((user, index) => (
          <RandomUserItem user={user} key={ index} />
        ))
      ) : (
        <p className="text-center text-gray-400 col-span-full">
          No random users available.
        </p>
      )}
    </div>
  );
};

export default RandomUserList;

const RandomUserItem = ({ user }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <img
        src={user.picture?.large} // Ensure that the picture exists before accessing
        alt={`${user.name?.first} ${user.name?.last}`} // Ensure that name fields exist
        className="w-32 h-32 mx-auto rounded-full mb-4"
      />
      <h2 className="text-xl font-bold text-center">
        {user.name?.first} {user.name?.last}
      </h2>
      <p className="text-center text-gray-400">{user.email}</p>
      <p className="text-center text-gray-400">{user.location?.country}</p>
    </div>
  );
};

export default RandomUserItem;

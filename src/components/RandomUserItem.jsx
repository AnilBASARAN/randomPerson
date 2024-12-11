

const RandomUserItem =(props)=> {
    const {user} = props;
    
   
    
    return(
       

          <div className="grid grid-cols-1  gap-4">
            <div className="mx-5 my-8">
              <div className="flex justify-between my-3">
                <div className="text-xl font-fair">{user.gender}</div>
              </div>
              <div className="flex justify-center">
                <div className="flex">
                  <img src={user.picture.large} alt={user.name.first} />
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-xl">{user.name.title} {user.name.first} {user.name.last}</h2>
                <p className="text-gray-300">{user.email}</p>
                <p className="text-gray-300">Age: {user.dob.age}</p>
                <p className="text-gray-300">{user.location.city}, {user.location.state}, {user.location.country}</p>
              </div>
            </div>
          </div>


       
    );
};

export default RandomUserItem;
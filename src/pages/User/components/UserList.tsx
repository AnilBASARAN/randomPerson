import { useEffect, useState } from 'react';
import { useUser } from '../../../store/slices/user/actions';
import { getUserList } from '../../../store/slices/user/service';
import Table1 from '../../../components/Tables/Table';
import PageLoading from '../../../components/PageLoading/PageLoading';
import { User } from '../../../api/Api';
import React from 'react';
import { toast } from 'react-toastify';

const UserList = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // State for filtered user list
  const { userList } = useUser();
  const authToken = true; // for now TODO

  // Fetch user list on mount
  useEffect(() => {
    if (authToken) {
      getUserList(setPageLoading);
    }
  }, [authToken]);

  // Filter users based on the search query
  useEffect(() => {
    if (userList?.results) {
      const filtered = userList.results.filter(user => 
        user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())||
        user.location.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, userList]);

  // Row for the table
  const singleRow = (data: User) => {
    return (
      <tr key={data.id.value}>
        <td
          className='text-gray-800 fw-bold fs-7 ps-4'
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '150px',
            cursor: 'pointer',
          }}
          onClick={() => {
            navigator.clipboard.writeText(data.id.name);
            toast.success('Copied to clipboard');
          }}
          title={data.id.value}
        >
          {data.id.value}
        </td>
        <td className='text-gray-900 fw-bold fs-7'>{data.name.first}</td>
        <td className='text-gray-900 fw-bold fs-7'>{data.email}</td>
        <td className='text-gray-900 fw-bold fs-7'>{data.phone}</td>
        <td className='text-gray-900 fw-bold fs-7'>{data.location.city}</td>
        <td className='text-end d-flex justify-content-end'>
          <button
            className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
          >
            Detail
          </button>
          <button className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4'>
            Edit
          </button>
        </td>
      </tr>
    );
  };

  // If the page is loading
  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <>
      {/* Search input */}
      <div className="mb-3 p-12 flex justify-center items-center gap-2">
        <input
          type="text"
          className="form-control mt-2 p-2 "
          placeholder="Search by name or email or city"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={() => setSearchQuery(searchQuery)} // Trigger search on button click
        >
          Search
        </button>
      </div>

      {/* Display the filtered table */}
      <Table1
        title='User List'
        tableId='user-list'
        data={filteredUsers || []} // Use the filtered list for rendering
        headers={[
          { title: 'Id', width: '125px' },
          { title: 'First Name', width: '125px' },
          { title: 'Email', width: '300px' },
          { title: 'Phone', width: '200px' },
          { title: 'City', width: '125px' },
          { title: 'Actions', width: '125px' },
        ]}
        singleRow={singleRow}
      />
    </>
  );
};

export default UserList;

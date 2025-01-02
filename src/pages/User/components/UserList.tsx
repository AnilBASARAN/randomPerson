import React, { useEffect, useState } from 'react';
import { useUser } from '../../../store/slices/user/actions';
import { getUserList } from '../../../store/slices/user/service';
import Table1 from '../../../components/Tables/Table';
import PageLoading from '../../../components/PageLoading/PageLoading';
import { User } from '../../../api/Api';
import { toast } from 'react-toastify';

const UserList = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortBy, setSortBy] = useState<{ column: string; order: 'asc' | 'desc' }>({ column: '', order: 'asc' });

  const { userList } = useUser();
  const authToken = true; // for now TODO

  useEffect(() => {
    if (authToken) {
      getUserList(setPageLoading);
    }
  }, [authToken]);

  useEffect(() => {
    if (userList?.results) {
      let filtered = userList.results.filter(user =>
        user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location.city.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Sort the filtered list
      if (sortBy.column) {
        filtered.sort((a, b) => {
          const aValue = getNestedValue(a, sortBy.column);
          const bValue = getNestedValue(b, sortBy.column);

          if (!aValue || !bValue) return 0; // Handle undefined values
          if (sortBy.order === 'asc') return aValue > bValue ? 1 : -1;
          else return aValue < bValue ? 1 : -1;
        });
      }

      setFilteredUsers(filtered);
    }
  }, [searchQuery, userList, sortBy]);

  const handleSort = (column: string) => {
    setSortBy(prev => ({
      column,
      order: prev.column === column && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((value, key) => value?.[key], obj);
  };

  const singleRow = (data: User, index: number) => (
    <tr key={data.id.value || `user-${index}`}>
      <td
        className="text-gray-800 fw-bold fs-7 ps-4"
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
      <td className="text-gray-900 fw-bold fs-7">{data.name.first}</td>
      <td className="text-gray-900 fw-bold fs-7">{data.email}</td>
      <td className="text-gray-900 fw-bold fs-7">{data.phone}</td>
      <td className="text-gray-900 fw-bold fs-7">{data.location.city}</td>
      <td className="text-end d-flex justify-content-end">
        <button className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2">
          Detail
        </button>
        <button className="btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4">
          Edit
        </button>
      </td>
    </tr>
  );

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <div className="mb-3 p-12 flex justify-center items-center gap-2">
        <input
          type="text"
          className="form-control mt-2 p-2"
          placeholder="Search by name or email or city"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={() => setSearchQuery(searchQuery)}>
          Search
        </button>
      </div>

      <Table1
        title="User List"
        tableId="user-list"
        data={filteredUsers || []}
        headers={[
          { title: 'Id', width: '125px' },
          {
            title: (
              <>
                First Name{' '}
                <button onClick={() => handleSort('name.first')}>
                  {sortBy.column === 'name.first' ? (sortBy.order === 'asc' ? '▲' : '▼') : '↕'}
                </button>
              </>
            ),
            width: '125px',
          },
          {
            title: (
              <>
                Email{' '}
                <button onClick={() => handleSort('email')}>
                  {sortBy.column === 'email' ? (sortBy.order === 'asc' ? '▲' : '▼') : '↕'}
                </button>
              </>
            ),
            width: '300px',
          },
          { title: 'Phone', width: '200px' },
          {
            title: (
              <>
                City{' '}
                <button onClick={() => handleSort('location.city')}>
                  {sortBy.column === 'location.city' ? (sortBy.order === 'asc' ? '▲' : '▼') : '↕'}
                </button>
              </>
            ),
            width: '125px',
          },
          { title: 'Actions', width: '125px' },
        ]}
        singleRow={singleRow}
      />
    </>
  );
};

export default UserList;

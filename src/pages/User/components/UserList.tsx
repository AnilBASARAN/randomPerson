import { useEffect, useState } from 'react'
import { useUser } from '../../../store/slices/user/actions'
import { getUserList } from '../../../store/slices/user/service'
import Table1 from '../../../components/Tables/Table'
import PageLoading from '../../../components/PageLoading/PageLoading'
import { User } from '../../../api/Api'
import React from 'react'
import { toast } from 'react-toastify'

const UserList = () => {
  const [pageLoading, setPageLoading] = useState(true)
  const { userList } = useUser()
  const authToken = true // for now TODO

  // Fetch user list on mount
  useEffect(() => {
    if (authToken) {
      getUserList(setPageLoading)
    }
  }, [authToken])

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
            navigator.clipboard.writeText(data.id.name)
            toast.success('Copied to clipboard')
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
    )
  }

  // If the page is loading
  if (pageLoading) {
    return <PageLoading />
  }

  return (
    <>
      <Table1
        title='User List'
        tableId='user-list'
        data={userList?.results || []}
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
  )
}

export default UserList

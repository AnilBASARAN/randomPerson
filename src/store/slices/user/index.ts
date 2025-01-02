import {createSlice} from '@reduxjs/toolkit'

// Models
import {UserList,UserDetail} from "../../../api/Api"

interface UserState {
  userList?: UserList | null
  selectedUser?: UserDetail | null
}

const initialState: UserState = {
  userList: null,
  selectedUser: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserList(state, action) {
      state.userList = action.payload
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload
    },
  },
})

export const {setUserList, setSelectedUser} = userSlice.actions

import {useSelector} from 'react-redux'
import { store } from "../../../../src/store"
import { setSelectedUser, setUserList } from '.'



export const useUser = () => useSelector((state: ReturnType<typeof store.getState>) => state.user)

// Actions
export const updateUserList = (data: any) => store.dispatch(setUserList(data))
export const updateSelectedUser = (data: any) => store.dispatch(setSelectedUser(data))

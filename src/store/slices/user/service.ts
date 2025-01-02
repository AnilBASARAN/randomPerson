import { toast } from 'react-toastify';

// Actions

// Models
import { UserList } from "../../../api/Api";

// Api Service
import api from "../../../api/axiosInterceptor";
import { updateUserList } from './actions';

export const getUserList = async (
    setPageLoading: React.Dispatch<React.SetStateAction<boolean>>, // Use React.Dispatch and React.SetStateAction
    token?: string,
) => {
  setPageLoading(true);
  try {
    const response = await api.get<UserList>("https://randomuser.me/api?results=25", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    updateUserList(response.data);
    setPageLoading(false);
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'An unknown error occurred');
    console.log(error.response?.data?.message);
    setPageLoading(false);
  }
};

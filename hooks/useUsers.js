import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getUsers } from "../services/api/userApi";
import { setUsers } from "../store/redux/reducer";

function useUsers() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getUsers();

        dispatch(setUsers(users));
      } catch (error) {
        console.error("Gagal mengambil users:", error);
      }
    }

    fetchUsers();
  }, [dispatch]);
}

export default useUsers;
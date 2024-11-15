import React, {useEffect, useState} from "react";
import api from "../../Services/api.js";
import UserCardList from "./UserCardList.jsx";

const AllUsersCardList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { users } = await api.getUsers();
      setUsers(users);
    }
    fetchUsers();
  }, []);

  return (
    <div
      className={"flex justify-center"}
    >
      <div
        className="max-w-xl"
      >
        <h1>All Users:</h1>
        <UserCardList users={users}/>
      </div>
    </div>
  )
}

export default AllUsersCardList;
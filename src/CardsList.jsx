import { Card } from "./Card";
import { useState, useEffect } from "react";
import { fetchUsers } from "./api";
import css from "./CardsList.module.css";

export const CardsList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(2);

  const loadmore = () => {
    fetchUsers({ page: page, limit: 3 }).then((users) =>
      setUsers((prevState) => [...prevState, users])
    );
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    try {
      fetchUsers().then((users) => setUsers(users));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <ul className={css.list}>
        {users.map((user) => (
          <Card user={user} key={user.id} setUsers={setUsers} />
        ))}
      </ul>
      <button onClick={loadmore} className={css.btn}>Load more</button>
    </>
  );
};

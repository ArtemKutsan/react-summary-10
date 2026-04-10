import { useSelector } from 'react-redux';

const UserList = () => {
  const users = useSelector((state) => state.users.list);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
};

export default UserList;

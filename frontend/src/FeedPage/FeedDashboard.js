import { useEffect, useState } from "react";
import axios from "axios";

const FeedDashboard = () => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newPassword, setPassword] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching items", error));
  };

  const createUser = () => {
    axios
      .post("http://localhost:5000/users", {
        name: newName,
        email: newEmail,
        password: newPassword,
      })
      .then(() => {
        setNewName("");
        setNewEmail("");
      })
      .catch((error) => console.error("Error creating the user", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>

      {/* Add User */}
      <input
        type="text"
        placeholder="Username"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="border p-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        className="border p-2 ml-2"
      />
      <button onClick={createUser} className="bg-green-500 text-white p-2 ml-2">
        Add User
      </button>
    </div>
  );
};

export default FeedDashboard;

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@mui/material";

const FeedDashboard = () => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newPassword, setPassword] = useState("");

  useEffect(() => {
    const getItems = () => {
      axios
        .get("http://localhost:5000/items")
        .then((response) => setItems(response.data))
        .catch((error) =>
          console.error("Error getting the items nigga", error)
        );
    };
    getItems();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Missing Items</h1>
      {items.map((item) => (
        <li key={item.id}>
          <Link to={`/item/${item.item_id}`}>{item.name}</Link>
        </li>
      ))}
    </div>
  );
};

export default FeedDashboard;

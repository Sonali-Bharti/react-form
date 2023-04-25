import React, { useState } from "react";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [nextId, setNextId] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = { id: users[editingIndex].id, name, email, phone };
      setUsers(updatedUsers);
      setEditingIndex(null);
    } else {
      
      setUsers([...users, { id: nextId, name, email, phone }]);
      setNextId(nextId + 1);
    }
    setName("");
    setEmail("");
    setPhone("");
  }

  function handleDelete(id) { 
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  }

  function handleEdit(id) { 
    const index = users.findIndex((user) => user.id === id);
    const userToEdit = users[index];
    setName(userToEdit.name);
    setEmail(userToEdit.email);
    setPhone(userToEdit.phone);
    setEditingIndex(index);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <button type="submit">{editingIndex !== null ? "update" : "Submit"}</button>
      </form>
      {users.map((user) => (
        <div className="new" key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <button type="b" onClick={() => handleDelete(user.id)}>
            Delete
          </button>
          <button type="b" onClick={() => handleEdit(user.id)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
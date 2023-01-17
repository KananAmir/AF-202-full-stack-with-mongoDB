import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import AddUser from "./assets/components/addUser";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      let response = await axios.get("http://localhost:8080/users/");
      setLoading(false);
      setUsers(await response.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/users/${id}`).then(() => getUsers());
  };

  return (
    <div className="App">
      {loading ? (
        "Loading...."
      ) : (
        <>
          <AddUser users={users} setUsers={setUsers} />
          <ul>
            {users.map((q) => (
              <li>
                <p>{q.fullName}</p>
                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => handleDelete(q._id)}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;

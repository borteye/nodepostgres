import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDOB] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newDOB, setNewDOB] = useState("");
  const [getId, setGetId] = useState("");
  const [users, setUsers] = useState([]);
  const [showDialog, setshowDialog] = useState(false);

  //get data from database
  const getDetails = async (e) => {
    try {
      const result = await axios.get("http://localhost:5000/students");
      const jsonResult = await result.data;
      setUsers([...jsonResult]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  //post data to database
  const handleSubmit = async () => {
    try {
      const body = {
        name,
        email,
        age,
        dob,
      };

      await axios.post("http://localhost:5000/students", body);
    } catch (error) {
      console.log(error.message);
    }
  };

  //delete data from database
  const deleteUser = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:5000/students/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  //update data from database
  const updateUser = async (id) => {
    try {
      const updatedDetails = {
        name: newName,
        email: newEmail,
        age: newAge,
        dob: newDOB,
      };
      const result = await axios.put(
        `http://localhost:5000/students/${id}`,
        updatedDetails
      );
      setshowDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const ShowUpdateForm = async (id) => {
    try {
      setGetId(id);
      const result = await axios.get(`http://localhost:5000/students/${id}`);

      result?.data.map((details) => {
        setNewName(details.name);
        setNewEmail(details.email);
        setNewAge(details.age);
        setNewDOB(details.dob);
      });

      setshowDialog(true);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  const CloseUpdateForm = async () => {
    setshowDialog(false);
  };

  function RowWidget({ data }) {
    return (
      <div className="row-two" key={data.id}>
        <div className="data">{data.name}</div>
        <div className="data">{data.email}</div>
        <div className="data">{data.age}</div>
        <div className="data">{data.dob}</div>
        <div className="data">
          <button className="update" onClick={() => ShowUpdateForm(data.id)}>
            Update
          </button>
          <button
            className="delete"
            onClick={() => {
              deleteUser(data.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showDialog && (
        <div className="container">
          <div className="overlay">
            <div className="content">
              <h2>Update</h2>
              <div className="updateContainer">
                <div className="firstName">
                  <label>Name: </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="lastName">
                  <label>Email: </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="age">
                  <label>Age: </label>
                  <input
                    type="number"
                    value={newAge}
                    onChange={(e) => {
                      setNewAge(e.target.value);
                    }}
                  />
                </div>
                <div className="dob">
                  <label>Date of Birth: </label>
                  <input
                    type="date"
                    value={newDOB}
                    onChange={(e) => {
                      setNewDOB(e.target.value);
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    updateUser(getId);
                  }}
                >
                  Update
                </button>
                <button onClick={CloseUpdateForm}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1>CRUD application with NODE JS and POSTGRES</h1>
      <form className="mainContainer" onSubmit={handleSubmit}>
        <div className="name">
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="email">
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="age">
          <label>Age: </label>
          <input
            type="number"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div className="dob">
          <label>Date of Birth: </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => {
              setDOB(e.target.value);
            }}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      <br />
      <div className="table">
        <div className="row-one">
          <div className="data">Name</div>
          <div className="data">Email</div>
          <div className="data">Age</div>
          <div className="data">DOB</div>
          <div className="action">Actions</div>
        </div>
        {users?.map((data) => {
          return <RowWidget data={data} />;
        })}
      </div>
    </>
  );
}

export default App;

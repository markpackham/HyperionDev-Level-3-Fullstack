import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  // State to store fetched data
  const [data, setData] = useState({});

  // Custom message
  const [customMessage, setCustomMessage] = useState({});

  // Fetch data each time the component loads
  useEffect(() => {
    fetchData();
    // Grab our custom message
    fetchCustomMessage();
  }, []);

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      /* Sends a GET request to
  'http://localhost:5000/api/data' (backend server) */
      const response = await axios.get("/api/data");
      setData(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCustomMessage = async () => {
    // GET custom message using axios
    // http://localhost:5000/api/message
    const res = await axios.get("/api/message");
    // Update state with fetched data
    setCustomMessage(res.data);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Display the message, or 'Loading...' if data is not yet fetched*/}
        <h1>{data.message || "Loading..."}</h1>
        <h2>Custom message below!</h2>
        <p>{customMessage.message || "Loading..."}</p>
      </header>
    </div>
  );
}
export default App;

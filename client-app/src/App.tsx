import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { List } from "semantic-ui-react";

function App() {
  const [activities, changeSt] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:5001/api/Activities").then((response) => {
      console.log(response.data);
      changeSt(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <List>
          {activities.map((activity: any) => {
            return <List.Item key={activity.id}>{activity.title}</List.Item>;
          })}
        </List>
      </header>
    </div>
  );
}

export default App;

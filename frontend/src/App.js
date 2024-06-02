import "./App.css";

import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  const joinRoom = () => {
    // check if the room input has something writen
    if (room !== "")
      socket.emit("join_room", room);
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input 
        type="text"
        placeholder="Room..."
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>

      <ul>
        <li>{messageReceived}</li>
      </ul>
    </div>
  );
}

export default App;

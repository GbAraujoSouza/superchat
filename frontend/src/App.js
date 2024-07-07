import "./App.css";

import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001", {
  query: { userId: '123'}
});

function App() {
  const [room, setRoom] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const message = { content: input, senderId: "1843b910-f979-452b-a051-5f19785728da", receiverId: "d33f458e-7c4a-47fd-8e94-d4bf5dddd3ac" }
    socket.emit("private_message", { message, room });
  };

  // const joinRoom = () => {
  //   // check if the room input has something writen
  //   if (room !== "")
  //     socket.emit("join_room", room);
  // }

  useEffect(() => {
    // socket.on("receive_message", (data) => {
    //   setMessageReceived(data.message);
    // });
    socket.on("private_message", (message) => {
      setMessages((prevMessages => [...prevMessages, message.content]));
    })
  }, [socket]);
  return (
    <div className='App'>
      {/* <input 
        type="text"
        placeholder="Room..."
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button> */}
      <input
        placeholder='Message...'
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>

      <div id='messages'>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.senderId}: {msg.content}
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { Room } from "./components/room/room";
import io from "socket.io-client";
import { Home } from "./components/home/home";
import { useParams } from "react-router-dom";

export const SpotifyContext = React.createContext();

function App() {
  let { defaultRoomID } = useParams();
  const [room, setRoom] = useState(defaultRoomID);
  const [socket, setSocket] = useState(null);
  const [queue, setQueue] = useState([]);

  const context = {
    socket: socket,
    room: room,
    setRoom: setRoom,
    queue: queue,
  };

  useEffect(() => {
    const s = io();
    setSocket(s);

    if (defaultRoomID) {
      s.emit("join", { room: defaultRoomID }, () => {});
    }

    s.on("update_queue", (queue) => {
      setQueue(queue);
    });
  }, []);

  return (
    <SpotifyContext.Provider value={context}>
      {room ? <Room /> : <Home />}
    </SpotifyContext.Provider>
  );
}

export default App;

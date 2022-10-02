import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { Room } from "./components/room/room";
import io from "socket.io-client";
import { Home } from "./components/home/home";

export const SpotifyContext = React.createContext();

function App() {
  const [room, setRoom] = useState(null);
  const [socket, setSocket] = useState(null);

  const context = {
    socket: socket,
    room: room,
    setRoom: setRoom,
  };

  useEffect(() => {
    setSocket(io());
  },[]);

  return (
    <SpotifyContext.Provider value={context}>
      {room ? <Room /> : <Home />}
    </SpotifyContext.Provider>
  );
}

export default App;

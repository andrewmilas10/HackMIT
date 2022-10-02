import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import { Room } from './components/room/room';
import io from 'socket.io-client';
import { Home } from './components/home/home';

export const SpotifyContext = React.createContext();

function App() {
  const [songName, setSongName] = useState("Set Me Free (feat. MAX)");
  const [socket, setSocket] = useState(null);

  const context = {
    socket: socket,
    songName: songName
  }

  useEffect(() => {
    const socket = io();
    setSocket(socket);
  }, []);

  return (
    <SpotifyContext.Provider value={context}>
      {/* <Room /> */}
      <Home />
    </SpotifyContext.Provider>
  );
}

export default App;

import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import { Room } from './components/room/room';
import { Home } from './components/home/home';

export const SpotifyContext = React.createContext();

function App() {
  const [songName, setSongName] = useState("Set Me Free (feat. MAX)");

  const context = {
    songName: songName
  }

  return (
    <SpotifyContext.Provider value={context}>
      {/* <Room /> */}
      <Home />
    </SpotifyContext.Provider>
  );
}

export default App;

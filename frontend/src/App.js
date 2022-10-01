import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import { Room } from './components/room/room';

export const SpotifyContext = React.createContext();

function App() {
  const [songName, setSongName] = useState("Set Me Free (feat. MAX) by Oliver Heldens");

  const context = {
    songName: songName
  }

  return (
    <SpotifyContext.Provider value={context}>
      <Room />
    </SpotifyContext.Provider>
  );
}

export default App;

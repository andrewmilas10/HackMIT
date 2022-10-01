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
      <Room />
      {/* <Home /> */}

      <footer class="footer mt-6">
        <div class="content has-text-centered">
          <p>
            <strong>Spotify Party</strong> by Daniel Kim, Andrew Milas, Kevin Wu, and Jonathan Yin.
          </p>
        </div>
      </footer>
    </SpotifyContext.Provider>
  );
}

export default App;

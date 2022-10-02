import React, { useState, useContext, useEffect } from "react";
import "./room.css";
import { SpotifyContext } from "../../App";
import { Song } from "../song/song";
import { SongItem } from "../song-item/song-item";
import axios from "axios";

export const Room = () => {
  const state = useContext(SpotifyContext);

  const [searchResults, setSearchResults] = useState([]);
  const [queueResults, setQueueResults] = useState([]);

  const query = (e) => {
    if (e == null || e.target == null || e.target.value == null || e.target.value.length === 0) {
      setSearchResults([]);
      return;
    }
    axios
      .post("/search", { params: { room_id: state.room, query: e.target.value } })
      .then((response) => {
        const res = response.data;
        // console.log(res);
        setSearchResults(res);
      })
      .catch((error) => {});
  };
  const enqueue = (song) => {
    
    axios
      .post("/queue", { params: { room_id: state.room, song: song } })
      .then((response) => {
        const res = response.data;
        // console.log(res);
      })
      .catch((error) => {});
  };

  const upvote = (song) => {
    axios
      .post("/upvote", { params: { room_id: state.room, song: song } })
  };

  const downvote = (song) => {
    axios
      .post("/downvote", { params: { room_id: state.room, song: song } })
  }


  return (
    <div className="is-flex is-flex-direction-column container is-max-desktop is-fluid">
      <div className="my-5">
        <h1 className="title">Suggest a song</h1>
        <input
          className="input"
          type="text"
          placeholder="Song name"
          onChange={query}
        ></input>
        {searchResults.map((result) => (
          <div><Song
          key={result.id}
          songName={result.name}
          artists={result.artist}
          length=""
        /><button onClick={()=>enqueue(result)}>Add to queue</button></div>
          
          
        ))}
      </div>
      <div className="my-5">
        <h1 className="title">Currently playing</h1>
         {state.song ? <Song
          songName={state.song['name']} 
          artists={state.song['artist']}
          length="3:51"
        /> : 
          <Song
          songName= "None"
          artists= "None"
          length="3:51"
        /> 
        }
      </div>
      <div className="my-5">
        <h1 className="title">Queue</h1>
        {state.queue.map((result) => (
          <div><Song
          key={result.id}
          songName={result.name}
          artists={result.artist}
          length=""
          
        /><button onClick={()=>upvote(result)}>upvote</button><button onClick={()=>downvote(result)}>peeonthem</button></div>
        ))}
        {/* <SongItem
          songName="High On Life (feat. Bonn)"
          artists="Martin Garrix, Bonn"
          length="3:51"
        />
        <SongItem
          songName="High On Life (feat. Bonn)"
          artists="Martin Garrix, Bonn"
          length="3:51"
        />
        <SongItem
          songName="High On Life (feat. Bonn)"
          artists="Martin Garrix, Bonn"
          length="3:51" */}
      </div>
    </div>
  );
};

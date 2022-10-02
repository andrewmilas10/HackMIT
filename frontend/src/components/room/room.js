import React, { useState, useContext, useEffect } from "react";
import "./room.css";
import { SpotifyContext } from "../../App";
import { Song } from "../song/song";
import { SongItem } from "../song-item/song-item";
import axios from "axios";

export const Room = () => {
  const state = useContext(SpotifyContext);

  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [showNotif, setShowNotif] = useState(false);

  const query = (e) => {
    if (
      e == null ||
      e.target == null ||
      e.target.value == null ||
      e.target.value.length === 0
    ) {
      setSearchResults([]);
      return;
    }
    setIsLoadingSearch(true);
    axios
      .post("/search", {
        params: { room_id: state.room, query: e.target.value },
      })
      .then((response) => {
        const res = response.data;
        setSearchResults(res);
        setIsLoadingSearch(false);
      })
      .catch((error) => {
        setIsLoadingSearch(false);
      });
  };
  const enqueue = (song) => {
    setSearchResults([]);
    setIsRefreshing(true);
    axios
      .post("/queue", { params: { room_id: state.room, song: song } })
      .then((response) => {
        setIsRefreshing(false);

        setShowNotif(true);
        setNotifMsg("New song added!");
        setTimeout(() => {
          setShowNotif(false);
          setNotifMsg("");
        }, 5000);
      })
      .catch((error) => {
        setIsRefreshing(false);
      });
  };

  const upvote = (song) => {
    setIsRefreshing(true);
    axios
      .post("/upvote", { params: { room_id: state.room, song: song } })
      .then((response) => {
        setIsRefreshing(false);
      })
      .catch((error) => {
        setIsRefreshing(false);
      });
  };

  const downvote = (song) => {
    setIsRefreshing(true);
    axios
      .post("/downvote", { params: { room_id: state.room, song: song } })
      .then((response) => {
        setIsRefreshing(false);
      })
      .catch((error) => {
        setIsRefreshing(false);
      });
  };

  return (
    <div className="is-flex is-flex-direction-column container is-max-desktop is-fluid">
      {showNotif ? (
        <div class="notification is-primary">{notifMsg}</div>
      ) : null}
      <div className="my-5">
        <h1 className="title">Suggest a song</h1>
        <div className={`${isLoadingSearch ? "control is-loading" : ""}`}>
          <input
            className="input"
            type="text"
            placeholder="Song name"
            onChange={query}
          ></input>
        </div>
        {searchResults.map((result) => (
          <div>
            <Song
              key={result.id}
              songName={result.name}
              artists={result.artist}
              length=""
              onClick={() => enqueue(result)}
            />
          </div>
        ))}
      </div>
      <nav className="navbar is-fixed-bottom">
        {state.song && state.song.name && state.song.name.trim().length > 0 ? (
          <Song
            songName={state.song["name"]}
            artists={state.song["artist"]}
            length="3:51"
            isFooter={true}
          />
        ) : (
          <div
            className="box has-background-grey-lighter"
            style={{ width: "100%" }}
          >
            No song currently playing
          </div>
        )}
      </nav>
      <div className="my-5">
        <h1 className="title">Queue</h1>
        {isRefreshing ? (
          <progress class="progress is-primary" max="100">
            15%
          </progress>
        ) : (
          state.queue.map((result) => (
            <div>
              <SongItem
                key={result.id}
                songName={result.name}
                artists={result.artist}
                length=""
                upvotes={result.upvotes}
                downvotes={result.downvotes}
                upvoteFn={() => upvote(result)}
                downvoteFn={() => downvote(result)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

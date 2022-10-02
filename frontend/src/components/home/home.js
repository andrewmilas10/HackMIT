import React, { useContext, useState } from "react";
import { SpotifyContext } from "../../App";
import axios from "axios";

const getData = () => {
  axios({
      method: "GET",
      url: "/hello/",
  })
      .then((response) => {
          const res = response.data;
          console.log(res);
      }).catch((error) => {

      });
}

export const Home = () => {
  const state = useContext(SpotifyContext);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    state.socket.emit("join", { username: name, room: room }, () => {
        state.setRoom(room);
    });
  };

  return (
    <div className="container mt-6">
      <section className="section">
        <h1 className="title">Spotify Party!</h1>

        <input
          className="input"
          type="text"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          className="input"
          type="text"
          placeholder="Enter room id"
          onChange={(e) => setRoom(e.target.value)}
          value={room}
        />
        <form action="http://localhost:3000/login" method="post">
            <input type="submit" value="Press to log in"/>
        </form>
        <button className="button" onClick={getData}>
            Join room
        </button>

      </section>
    </div>
  );
};

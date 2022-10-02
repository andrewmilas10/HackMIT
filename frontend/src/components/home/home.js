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
    })
    .catch((error) => {});
};

export const Home = () => {
  const state = useContext(SpotifyContext);
  const [room, setRoom] = useState("");

  return (
    <div className="container mt-6">
      <section className="section">
        <h1 className="title">Spotify Party!</h1>
        <form action="http://localhost:3000/login" method="post">
          <input type="submit" value="Press to log in" />
        </form>
      </section>
    </div>
  );
};

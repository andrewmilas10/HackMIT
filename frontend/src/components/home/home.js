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
  const redirect_uri="http://localhost:3000/login"
  const prod_redirect_uri = "https://party-session.herokuapp.com/login"
  return (
    <div className="container mt-6">
      <section className="section">
        <h1 className="title">Spotify Party!</h1>
        <form action={prod_redirect_uri} method="post">
          <input type="submit" value="Press to log in" />
        </form>
      </section>
    </div>
  );
};

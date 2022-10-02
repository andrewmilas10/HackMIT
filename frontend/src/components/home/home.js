import React, { useContext } from 'react';
import { SpotifyContext } from '../../App';
import axios from "axios";

export const Home = () => {
    const state = useContext(SpotifyContext);

    const getData = () => {
        state.socket.emit('join', { 'username': 'ef', 'room': 'room1af' });
        axios({
            method: "GET",
            url: "/hello/",
        })
            .then((response) => {
                const res = response.data;
                alert(res);
            }).catch((error) => {

            });
    }
    return (
        <div className="container mt-6">
            <section className="section">
                <h1 className="title">Spotify Party!</h1>

                <button class="button" onClick={getData}>Log into Spotify</button>

                <button class="button">Join room</button>
            </section>
        </div>
    );
}
import React, { useEffect } from 'react';
import axios from "axios";

function getData() {
    axios({
        method: "GET",
        url: "/hello/",
    })
        .then((response) => {
            const res = response.data;
            alert(res);
        }).catch((error) => {

        })
}

export const Home = () => {
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
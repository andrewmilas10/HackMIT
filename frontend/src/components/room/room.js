import React, { useState, useContext } from 'react';
import './room.css';
import { SpotifyContext } from '../../App';
import { Song } from '../song/song';

export const Room = () => {
    const state = useContext(SpotifyContext);

    return (
        <div className="container">
            <section className="section">
                <h1 className="title">Suggest a song</h1>
                <input class="input" type="text" placeholder="Song name"></input>
                <Song songName="High On Life (feat. Bonn)" artists="Martin Garrix, Bonn" length="3:51" />
                <Song songName="High On Life (feat. Bonn)" artists="Martin Garrix, Bonn" length="3:51" />
                <Song songName="High On Life (feat. Bonn)" artists="Martin Garrix, Bonn" length="3:51" />
            </section>
            <section className="section">
                <h1 class="title">Currently playing</h1>
                <Song songName={state.songName} artists="Oliver Heldens" length="3:51" />
            </section>
            <section className="section">
                <h1 className="title">Queue</h1>
                <Song songName="High On Life (feat. Bonn)" artists="Martin Garrix, Bonn" length="3:51" />
                <Song songName="High On Life (feat. Bonn)" artists="Martin Garrix, Bonn" length="3:51" />
                <Song songName="High On Life (feat. Bonn)" artists="Martin Garrix, Bonn" length="3:51" />
                <Song songName="High On Life (feat. Bonn)" artists="Martin Garrix, Bonn" length="3:51" />
                <Song songName="High On Life (feat. Bonn)" artists="Martin Garrix, Bonn" length="3:51" />
            </section>
        </div >
    );
}

import React, { useState, useContext } from 'react';
import './room.css';
import { SpotifyContext } from '../../App';
import { Song } from '../song/song';
import { SongItem } from '../song-item/song-item';

export const Room = () => {
    const state = useContext(SpotifyContext);

    return (
        <div className="is-flex is-flex-direction-column container is-max-desktop is-fluid">
            <div className="my-5">
                <h1 className="title">Suggest a song</h1>
                <input class="input" type="text" placeholder="Song name"></input>
                <Song songName="High On Life (feat. Bonn)" artists="Martin Garrix, Bonn" length="3:51" />
                <Song songName="High On Life (feat. Bonn)" artists="Martin Garrix, Bonn" length="3:51" />
                <Song songName="High On Life (feat. Bonn)" artists="Martin Garrix, Bonn" length="3:51" />
            </div>
            <div className="my-5">
                <h1 class="title">Currently playing</h1>
                <Song songName={state.songName} artists="Oliver Heldens" length="3:51" />
            </div>
            <div className="my-5">
                <h1 className="title">Queue</h1>
                <SongItem songName="High On Life (feat. Bonn)askndfipabofjiduohiasdbfjivuosdhenjfbuoewjlnfbewnfbiuewohfljbrewfobifreu" artists="Martin Garrix, Bonn" length="3:51"/>
                <SongItem songName="High On Life (feat. Bonn)" artists="Martin Garrix, Bonn" length="3:51"/>
                <SongItem songName="High On Life (feat. Bonn)" artists="Martin Garrix, Bonn" length="3:51"/>
            </div>
        </div >
    );
}

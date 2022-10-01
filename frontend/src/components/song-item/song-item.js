import React from 'react';
import './song-item.css';
import '../song/song.css';
import { Song } from '../song/song';
import { BiDownvote, BiUpvote } from 'react-icons/bi';

export const SongItem = ({ songName, artists, length }) => {
    return (
        <div className="box my-2">
            <div className="is-flex is-flex-direction-row">
                <div className="level is-flex-direction-column is-four-fifths is-justify-content-flex-start mobile-song-container">
                    <div className="level-item has-text-weight-bold song-name-container">{songName}</div>
                    <div className="level-item">{artists}</div>
                </div>
                <div className="column is-flex is-align-items-center is-justify-content-flex-end">
                    {length}
                </div>
            </div>
            <div className="column is-flex is-align-items-center py-0">
                <div className="column is-half has-text-centered">
                    <BiUpvote size="1.5em" display="block" className="icon item-icon" />
                    12
                </div>
                <div className="column is-half has-text-centered">
                    <BiDownvote size="1.5em" display="block" className="icon item-icon" />
                    5
                </div>
            </div>
        </div>
    );
}
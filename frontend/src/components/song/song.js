import React from 'react';

import './song.css';

export const Song = ({ songName, artists, length, onClick }) => {
    return (<div className="box my-2 is-clickable" onClick={onClick}>
        <div className="columns">
            <div className="column is-flex is-flex-direction-row">
                <div className="level is-flex-direction-column is-four-fifths is-justify-content-flex-start mobile-song-container">
                    <div className="level-item has-text-weight-bold">{songName}</div>
                    <div className="level-item">{artists}</div>
                </div>
            <div className="column is-flex is-align-items-center is-justify-content-flex-end">
                {length}
            </div>
            </div>
        </div>
    </div>);
}
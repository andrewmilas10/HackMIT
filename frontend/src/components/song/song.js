import React from 'react';

export const Song = ({ songName, artists, length }) => {
    return (<div className="box my-2">
        <div className="columns">
            <div className="is-flex is-align-items-center">
                <figure class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/64x64.png" />
                </figure>
            </div>
            <div className="column">
                <div className="level is-flex-direction-column is-justify-content-flex-start">
                    <div className="level-item">{songName}</div>
                    <div className="level-item">{artists}</div>
                </div>
            </div>
            <div className="column is-flex is-align-items-center is-justify-content-flex-end">
                {length}
            </div>
        </div>
    </div>);
}
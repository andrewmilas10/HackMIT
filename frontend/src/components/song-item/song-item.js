import React from "react";
import "./song-item.css";
import "../song/song.css";
import { Song } from "../song/song";
import { BiDownvote, BiUpvote } from "react-icons/bi";

export const SongItem = ({
  songName,
  artists,
  upvoteFn,
  downvoteFn,
  upvotes,
  downvotes,
  albumCoverImg,
}) => {
  return (
    <div className="box my-2">
      <div className="is-flex is-flex-direction-row">
        <div className="level is-one-fifth">
          <figure class="image is-64x64">
            <img src={albumCoverImg} />
          </figure>
        </div>
        <div className="level is-flex-direction-column is-four-fifths is-justify-content-flex-start mobile-song-container">
          <div className="level-item has-text-weight-bold song-name-container">
            {songName}
          </div>
          <div className="level-item">{artists}</div>
        </div>
      </div>
      <div className="column is-flex is-align-items-center py-0">
        <div className="column is-half has-text-centered">
          <div onClick={upvoteFn} className="is-clickable">
            <BiUpvote size="1.5em" display="block" className="icon item-icon" />
          </div>
          {upvotes}
        </div>
        <div className="column is-half has-text-centered">
          <div onClick={downvoteFn} className="is-clickable">
            <BiDownvote
              size="1.5em"
              display="block"
              className="icon item-icon"
            />
          </div>
          {downvotes}
        </div>
      </div>
    </div>
  );
};

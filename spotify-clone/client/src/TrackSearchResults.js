import React from "react";

export default function TrackSearchResults({ track, choosetrack }) {
    function handlePlay() {
        choosetrack(track);
    }
    return (
        <div
            className="d-flex m-2 align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handlePlay}
        >
            <img
                src={track.albumUrl}
                style={{ height: "64px", width: "64px" }}
            ></img>
            <div className="m-3">
                <div>{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
        </div>
    );
}

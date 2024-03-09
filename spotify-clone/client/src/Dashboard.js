import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResults from "./TrackSearchResults";
import Player from "./Player";
import axios from "axios";

const spotifyWebApi = new SpotifyWebApi({
    clientId: "6556d8da3d4545a9bf71575fa455bbf4",
});

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState("");

    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();

    const [lyrics, setLyrics] = useState("");

    function choosetrack(track) {
        setPlayingTrack(track);
        setSearch("");
        setLyrics("");
    }

    console.log(searchResults);
    useEffect(() => {
        if (!playingTrack) return;

        axios
            .get("http://localhost:3001/lyrics/", {
                params: {
                    track: playingTrack.title,
                    artist: playingTrack.artist,
                },
            })
            .then((res) => {
                setLyrics(res.data.lyrics);
            });
    }, [playingTrack]);

    useEffect(() => {
        if (!accessToken) return;
        spotifyWebApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;

        let cancel = false;
        spotifyWebApi.searchTracks(search).then((res) => {
            if (cancel) return;

            setSearchResults(
                res.body.tracks.items.map((track) => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image;
                            return smallest;
                        },
                        track.album.images[0]
                    );

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    };
                })
            );
        });
        return () => {
            cancel = true;
        };
    }, [search, accessToken]);

    return (
        <Container className="d-flex flex-column py-2 search-container">
            <Form.Control
                type="search"
                placeholder="Search Songs or Artist..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                {searchResults.map((track) => (
                    <TrackSearchResults
                        track={track}
                        key={track.uri}
                        choosetrack={choosetrack}
                    ></TrackSearchResults>
                ))}
                {searchResults.length === 0 && (
                    <div className="text-center" style={{ whiteSpace: "pre" }}>
                        {lyrics}
                    </div>
                )}
            </div>
            <div>
                <Player
                    accessToken={accessToken}
                    trackUri={playingTrack?.uri}
                ></Player>
            </div>
        </Container>
    );
}

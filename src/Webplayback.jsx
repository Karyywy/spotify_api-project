import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyWebApi = new SpotifyWebApi();

function Playlist() {
  const [playlistData, setPlaylistData] = useState({
    name: '',
    artists: '',
    url: '',
    image: ''
  });

  useEffect(() => {
   fetch('httpl:/127.0.0.1:5000/auth/token')
    .then(response => response.json())
    .then(data => {
        const accessToken = data.access_token;
        return spotifyWebApi.getPlaylist('5tesxM8F6PFrEkD3u6yKeQ')
  })
      .then((data) => {
        console.log('updating');
        console.log(data);
        setPlaylistData({
          name: data.name,
          artists: data.tracks.items.map(item => item.track.artists.map(artist => artist.name).join(', ')).join(', '),
          url: data.external_urls.spotify,
          image: data.images[0].url
        });
      });
  }, []);

  return (
    <div>
      <a href={playlistData.url}>{playlistData.name}</a>
      <p>{playlistData.artists}</p>
      <img src={playlistData.image} alt={playlistData.name} />
    </div>
  );
}

function WebPlayback(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(null); // Ensure track is defined
  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Chill Playback SDK',
        getOAuthToken: cb => { cb(props.token); },
        volume: 0.5
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.connect();
    };
  }, [props.token]);

  return (
    <div className="container">
      <div className="main-wrapper">
        {/* Add your playback controls and UI here */}
      </div>
    </div>
  );
}

export { Playlist, WebPlayback };
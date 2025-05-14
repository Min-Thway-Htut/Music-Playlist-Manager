import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = () => {
    axios.get("http://localhost:5000/songs").then((res) => setSongs(res.data))
  };

  const addSong = () => {
    if (!title || !artist ) return;
    axios.post("http://localhost:5000/songs", {title, artist})
    .then(() => {
      setTitle("");
      setArtist("");
      fetchSongs();
    });
  };

  const deleteSong = (index) => {
    axios.delete(`http://localhost:5000/songs/${index}`).then(fetchSongs);
  };



  return (
    <div style={{padding: "20px", maxWidth: "500px", margin: "auto"}}>
      <h1>🎶 Music Playlist Manager</h1>
      <input
      placeholder="Song title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      style={{width: "100%", padding: "8px", marginBottom: "8px"}}
      />
      <input 
      placeholder="Artist"
      value={artist}
      onChange={(e) => setArtist(e.target.value)}
      style={{ width: "100%", padding: "8px", marginBottom: "8px"}}
      />
      <button onClick={addSong} style={{padding: "8px", width: "100%"}}>
          ➕ Add Song
      </button>
      <ul style={{marginTop: "20px"}}>
        {songs.map((song, index) => (
          <li key={index} style={{marginBottom: "10px"}}>
            <strong>{song.title}</strong> by {song.artist}
            <button onClick={() => deleteSong(index)}
              style={{marginLeft: "10px"}}>
                      ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

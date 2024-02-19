import { useState, useEffect } from "react";
import { getPlayers, getPlayer, deletePlayer, createPlayer, getTeams } from "./api";
import { Player } from "./components/Player";
import { PlayerDetails } from "./components/PlayerDetails";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]); // State to store filtered players
  const [player, setPlayer] = useState({});
  const [teams, setTeams] = useState([]);
  const [filter, setFilter] = useState("");
  

  useEffect(() => {
    getPlayers().then((players) => {
      setPlayers(players);
    getTeams().then(teams =>
      setTeams(teams));
      setFilteredPlayers(players); // Initialize filtered players with all players
    });
  }, []);

  function handlePlayerClick(playerId) {
    getPlayer(playerId).then(setPlayer);
  }

  function handlePlayerDelete(playerId) {
    deletePlayer(playerId).then(() => {
      getPlayers().then((players) => {
        setPlayers(players);
        setFilteredPlayers(players); // Update filtered players after deletion
      });
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const newPlayer = Object.fromEntries(formData.entries());

    createPlayer(newPlayer).then(() => {
      getPlayers().then((players) => {
        setPlayers(players);
        setFilteredPlayers(players); // Update filtered players after adding a new player
      });
    });
  }

  function handleFilter(evt) {
    const inputValue = evt.target.value.toLowerCase();
    setFilter(inputValue);

    // Filter the players based on the input value
    const filtered = players.filter((player) =>
      player.name.toLowerCase().includes(inputValue) ||
      player.breed.toLowerCase().includes(inputValue)
    );

    setFilteredPlayers(filtered);
  }

  return (
    <div onClick={() => setPlayer({})}>
      <h1>Puppy Bowl</h1>
      <div className="box">
      <h2>Fill out the form below to enter your puppy!</h2>
      <PlayerDetails player={player} teams={teams} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" style={{ marginRight: '8px' }} />
        <label htmlFor="breed">Breed:</label>
        <input type="text" name="breed" style={{ marginRight: '8px' }} />
        <button type="submit" className="button-flash">Add Player</button>
      </form>
      <div>
      <span>Search Players:</span>
      <input type="text" name="filter" value={filter} onChange={handleFilter} />
      </div>
      </div>
      <div className="player-list-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Breed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <Player
                key={player.id}
                player={player}
                onClick={handlePlayerClick}
                onDelete={handlePlayerDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
const API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/2308-ac-pt-web-pt-a";

export async function getPlayers() {
  try {
    const response = await fetch(`${API_URL}/players`);
    const result = await response.json();
    return result.data.players;
  } catch (error) {
    console.error(error);
  }
}

export async function getPlayer(playerId) {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`);
    const result = await response.json();
    return result.data.player;
  } catch (error) {
    console.error(error);
  }
}

export async function createPlayer(player) {
  try {
    const response = await fetch(`${API_URL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    });
    const result = await response.json();
    return result.data.newPlayer;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePlayer(playerId) {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`, {
      method: "DELETE",
    });
    await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getTeams() {
  try {
    const response = await fetch(`${API_URL}/teams`);
    const result = await response.json();
    return result.data.teams;
  } catch (error) {
    console.error(error);
  }
}

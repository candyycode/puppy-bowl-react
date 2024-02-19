export function PlayerDetails({ player, teams }) {
  // Find the team of the player
  const team = teams.find(team => team.id === player.teamId);

  return (
    <dialog open={player.id}>
      <h2>{player.name}</h2>
      <p><strong>Team:</strong> {team ? team.name : 'Unknown'}</p>
      <img src={player.imageUrl} alt={player.name} width={200} height={200} />
    </dialog>
  );
}
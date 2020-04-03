export default function Games(props) {
  const games = props.games;

  return (
    <ul>
      {games.map(game => (
        <li>{game.id}</li>
      ))}
    </ul>
  );
}

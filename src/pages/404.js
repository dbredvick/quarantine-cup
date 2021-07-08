// pages/404.js
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>Maybe you're looking for one of these: </p>
      <ul>
        <li>
          <Link href="/game?action=join">Join a game</Link>
        </li>
        <li>
          <Link href="game?action=new">Start a game</Link>
        </li>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </>
  );
}

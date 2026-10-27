import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Georisk Stryn</h1>

      <p>
        Visualisering av geografisk klimarisiko og trafikksårbarhet.
      </p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/klimarisiko">
          <button>Klimarisiko</button>
        </Link>
      </div>

      <div style={{ marginTop: "10px" }}>
        <Link to="/trafikksaarbarhet">
          <button>Trafikkmengde</button>
        </Link>
      </div>
    </div>
  );
}

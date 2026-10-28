import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 classname="home-title">
        GeoRisk webapp - Stryn kommune
      </h1>
      <p classname = "home-description">
        Visualisering av geografisk klimarisiko og trafikkmengde.
      </p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/klimarisiko">
          <button className="home-button">Klimarisiko</button>
        </Link>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Link to="/trafikksaarbarhet">
          <button className="home-button">Trafikkmengde</button>
        </Link>
      </div>
      <div style={{ marginTop: "30px" }}>
        <Link to="/prioritering">
          <button className="home-button">Prioriteringsnivå (klimarisiko og trafikkmengde samlet)</button>
        </Link>
      </div>
    </div>
  );
}

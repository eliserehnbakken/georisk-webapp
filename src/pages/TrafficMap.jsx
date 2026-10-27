import { Link } from "react-router-dom";

export default function TrafficMap() {
  return (
    <div>
      <h1>Trafikksårbarhet</h1>
      <p>Denne siden kommer snart.</p>
            <Link to="/">
        <button
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            zIndex: 20,
          }}
        >← Hovedmeny
        </button>
      </Link>
    </div>
  );
}


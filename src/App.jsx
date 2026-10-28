import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ClimateMap from "./pages/ClimateMap";
import TrafficMap from "./pages/TrafficMap";
import PriorityMap from "./pages/PriorityMap";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/klimarisiko" element={<ClimateMap />} />
      <Route path="/trafikksaarbarhet" element={<TrafficMap />} />
      <Route path="/prioritering" element={<PriorityMap />} />
    </Routes>
  );
}
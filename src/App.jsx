import {useEffect, useRef} from "react";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";

export default function App() {
  const mapDiv = useRef(null);
  useEffect(() => {
    const map = new Map({
      basemap: "topo-vector",
      });
    
    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [6.72, 61.90], // Plasserer kartet til Stryn-kommune
      zoom: 9,
      });
    
  return () => {
    view.destroy();
    };
  }, []);

  return <div ref={mapDiv} className="map-view"></div>;
}





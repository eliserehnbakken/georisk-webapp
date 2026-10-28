import {useEffect, useRef} from "react";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import { Link } from "react-router-dom";
import "./TrafficMap.css"

export default function PriorityApp() {
  const mapDiv = useRef(null);

  useEffect(() => {
    const map = new Map({
      basemap: "topo-vector",
      });
    
    const priorityLayer = new GeoJSONLayer({
      url: "/data/prioriteringskart.geojson",
      title: "Samlet risiko: klimarisiko og trafikkmengde",
      popupTemplate: {
        title: "Prioriteringsområde",
        content: `
        <b>Prioritet:</b> {Prioritet_0_100}<br>
        <b>Klimarisiko:</b> {Fare_0_100}<br>
        <b>Trafikkmengde:</b> {adttotal_0_100}<br>
        <b>SSB-rute:</b> {ssbid}
        `,
      },
      renderer: {
        type: "class-breaks",
        field: "Prioritet_0_100",
        legendOptions: {
          title: "Prioriteringsnivå",
        },
        classBreakInfos: [
            {
              minValue: 0,
              maxValue: 15,
              label: "Svært liten risiko",
              symbol: {
                type: "simple-fill",
                color: [26, 152, 80, 0.65],
                outline: { color: "white", width: 0.5 },
              },
            },
            {
              minValue: 15,
              maxValue: 30,
              label: "Lav prioritet",
              symbol: {
                type: "simple-fill",
                color: [145, 207, 96, 0.50],
                outline: { color: "white", width: 0.5 },
              },
            },
            {
              minValue: 30,
              maxValue: 45,
              label: "Moderat prioritet",
              symbol: {
                type: "simple-fill",
                color: [255, 215, 10, 0.40],
                outline: { color: "white", width: 0.5 },
              },
            },
          {
            minValue: 45,
            maxValue: 60,
            label: "Høy prioritet",
            symbol: {
              type: "simple-fill",
              color: [253, 174, 97, 0.65],
              outline: { color: "white", width: 0.5 },
            },
          },
          {
            minValue: 60,
            maxValue: 100,
            label: "Svært høy prioritet",
            symbol: {
              type: "simple-fill",
              color: [215, 25, 28, 0.65],
              outline: { color: "white", width: 0.5 },
            },
          },
        ],
      },
    });



    map.add(priorityLayer);

    
    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [6.72, 61.90], // Plasserer kartet til Stryn-kommune
      zoom: 9,
      });
    
    priorityLayer.when().then(() =>{
      const legend = new Legend({
        view: view,
        layerInfos: [
          {
            layer: priorityLayer,
            title: "Prioriteringsnivå",
          },
        ],
      });

      view.ui.add(legend, "bottom-right");
      }).catch((error) => {
        console.error("Kunne ikke lage tegnforklaring:", error);
      });
    return () => {
      view.destroy();
    };
  }, []);



  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Link to="/">
        <button className="menu-button">← Hovedmeny</button>
      </Link>
      <div className="info-panel">
        <h3>Trafikkmengde</h3>
        <p>
          Kartet kombinerer klimarisiko og trafikksårbarhet for å identifisere områder der forebyggende tiltak kan gi størst effekt.
        </p>
      </div>
      {/* Kontrollpanel lagt over kartet */}
      {/* Selve kartvisningen */}
      <div ref={mapDiv} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
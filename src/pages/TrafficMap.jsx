import {useEffect, useRef} from "react";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import { Link } from "react-router-dom";
import "./TrafficMap.css"

export default function TrafficApp() {
  const mapDiv = useRef(null);

  useEffect(() => {
    const map = new Map({
      basemap: "topo-vector",
      });
    
    const trafficLayer = new GeoJSONLayer({
      url: "/data/trafikk_mengde_rutenett_Stryn.geojson",
      title: "Trafikksårbarhet Stryn",
      popupTemplate: {
        title: "Trafikksårbarhet",
        content: `
        <b>ÅDT:</b> {adttotal}<br>
        <b>Andel lange kjøretøy:</b> {adtandellangekjoretoy}%<br>
        <b>SSB-rute:</b> {ssbid}`
      },
      renderer: {
        type: "class-breaks",
        field: "adttotal_0_100",
        legendOptions: {
          title: "Trafikkmengde (ÅDT)",
        },
        classBreakInfos: [
            {
              minValue: 0,
              maxValue: 20,
              label: "Svært lite trafikk",
              symbol: {
                type: "simple-fill",
                color: [26, 152, 80, 0.65],
                outline: { color: "white", width: 0.5 },
              },
            },
            {
              minValue: 20,
              maxValue: 40,
              label: "Lite trafikk",
              symbol: {
                type: "simple-fill",
                color: [145, 207, 96, 0.50],
                outline: { color: "white", width: 0.5 },
              },
            },
            {
              minValue: 40,
              maxValue: 60,
              label: "Moderat trafikk",
              symbol: {
                type: "simple-fill",
                color: [255, 215, 10, 0.40],
                outline: { color: "white", width: 0.5 },
              },
            },
          {
            minValue: 60,
            maxValue: 80,
            label: "Mye trafikk",
            symbol: {
              type: "simple-fill",
              color: [253, 174, 97, 0.65],
              outline: { color: "white", width: 0.5 },
            },
          },
          {
            minValue: 80,
            maxValue: 100,
            label: "Svært mye trafikk",
            symbol: {
              type: "simple-fill",
              color: [215, 25, 28, 0.65],
              outline: { color: "white", width: 0.5 },
            },
          },
        ],
      },
    });

    const roadLayer = new GeoJSONLayer({
      url: "/data/veierStryn.geojson",
      title: "Veinett",
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-line",
          color: [120, 120, 120],
          width: 2,
        },
      },
    });

    map.add(trafficLayer);
    map.add(roadLayer);
    
    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [6.72, 61.90], // Plasserer kartet til Stryn-kommune
      zoom: 9,
      });
    
    trafficLayer.when().then(() =>{
      const legend = new Legend({
        view: view,
        layerInfos: [
          {
            layer: trafficLayer,
            title: "Trafikkmengde",
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
          Kartet viser relativ trafikkmengde basert på ÅDT.
        </p>
        <h4>Datagrunnlag</h4>
        <ul>
          <li>ÅDT (Årsdøgntrafikk)</li>
          <li>VKM (kjøretøykilometer)</li>
          <li>Veinett Stryn</li>
        </ul>
        <p>
          Høy trafikkmengde kan indikere større konsekvenser ved stengte eller påvirkede veier.
        </p>
      </div>
      {/* Kontrollpanel lagt over kartet */}


      {/* Selve kartvisningen */}
      <div ref={mapDiv} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
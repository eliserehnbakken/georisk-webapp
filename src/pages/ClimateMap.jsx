import {useEffect, useRef, useState} from "react";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import { Link } from "react-router-dom";

export default function ClimateApp() {

  const [selectedField, setSelectedField] = useState("Fare_0_100");

  const riskLayerRef = useRef(null);
  const mapDiv = useRef(null);

  useEffect(() => {
    const map = new Map({
      basemap: "topo-vector",
      });
    
    const riskLayer = new GeoJSONLayer({
      url: "/data/georisk-webapp-Stryn.geojson",
      title: "Risikoanalyse Stryn",
      renderer: {
        type: "class-breaks",
        field: selectedField,
        legendOptions: {
          title: "Risikonivå",
        },
        classBreakInfos: [
            {
              minValue: 0,
              maxValue: 20,
              label: "Svært lav risiko",
              symbol: {
                type: "simple-fill",
                color: [26, 152, 80, 0.65],
                outline: { color: "white", width: 0.5 },
              },
            },
            {
              minValue: 20,
              maxValue: 40,
              label: "Lav risiko",
              symbol: {
                type: "simple-fill",
                color: [145, 207, 96, 0.50],
                outline: { color: "white", width: 0.5 },
              },
            },
            {
              minValue: 40,
              maxValue: 60,
              label: "Moderat risiko",
              symbol: {
                type: "simple-fill",
                color: [255, 215, 10, 0.40],
                outline: { color: "white", width: 0.5 },
              },
            },
          {
            minValue: 60,
            maxValue: 80,
            label: "Høy risiko",
            symbol: {
              type: "simple-fill",
              color: [253, 174, 97, 0.65],
              outline: { color: "white", width: 0.5 },
            },
          },
          {
            minValue: 80,
            maxValue: 100,
            label: "Svært høy risiko",
            symbol: {
              type: "simple-fill",
              color: [215, 25, 28, 0.65],
              outline: { color: "white", width: 0.5 },
            },
          },
        ],
      },
    });

    riskLayerRef.current = riskLayer;
    map.add(riskLayer);
    
    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [6.72, 61.90], // Plasserer kartet til Stryn-kommune
      zoom: 9,
      });
    
    riskLayer.when().then(() => {
      const legend = new Legend({
        view: view,
        layerInfos: [
          {
            layer: riskLayer,
            title: "Samlet risiko",
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

  useEffect(() => {
    if (riskLayerRef.current && riskLayerRef.current.renderer) {
      const updatedRenderer = riskLayerRef.current.renderer.clone();
      updatedRenderer.field = selectedField;
      riskLayerRef.current.renderer = updatedRenderer;
    }
  }, [selectedField]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
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
      {/* Kontrollpanel lagt over kartet */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          background: "white",
          padding: "12px 16px",
          borderRadius: "6px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          zIndex: 10,
          fontFamily: "sans-serif",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0" }}>Vis risikofaktor</h4>

        <div>
          <label style={{ display: "block", marginBottom: "6px", cursor: "pointer" }}>
            <input
              type="radio"
              name="risk"
              checked={selectedField === "Fare_0_100"}
              onChange={() => setSelectedField("Fare_0_100")}
            />{" "}
            Samlet risiko
          </label>

          <label style={{ display: "block", marginBottom: "6px", cursor: "pointer" }}>
            <input
              type="radio"
              name="risk"
              checked={selectedField === "Wind_0_100"}
              onChange={() => setSelectedField("Wind_0_100")}
            />{" "}
            Vind
          </label>

          <label style={{ display: "block", marginBottom: "6px", cursor: "pointer" }}>
            <input
              type="radio"
              name="risk"
              checked={selectedField === "Zero_0_100"}
              onChange={() => setSelectedField("Zero_0_100")}
            />{" "}
            Nullpasseringer
          </label>

          <label style={{ display: "block", cursor: "pointer" }}>
            <input
              type="radio"
              name="risk"
              checked={selectedField === "Prec_0_100"}
              onChange={() => setSelectedField("Prec_0_100")}
            />{" "}
            Nedbør
          </label>
        </div>
      </div>

      {/* Selve kartvisningen */}
      <div ref={mapDiv} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
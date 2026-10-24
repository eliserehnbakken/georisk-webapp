import {useEffect, useRef} from "react";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import Legend from "@arcgis/core/widgets/Legend.js";

export default function App() {
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
        field: "Fare_0_100",
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

  return <div ref={mapDiv} className="map-view"></div>;
}





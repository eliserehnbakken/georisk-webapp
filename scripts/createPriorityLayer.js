import fs from "fs";

const climate = JSON.parse(
  fs.readFileSync(
    "./public/data/georisk-webapp-Stryn.geojson",
    "utf8"
  )
);

const traffic = JSON.parse(
  fs.readFileSync(
    "./public/data/trafikk_mengde_rutenett_Stryn.geojson",
    "utf8"
  )
);

const trafficLookup = {};

traffic.features.forEach((feature) => {
    trafficLookup[feature.properties.ssbid] = feature.properties;
});

climate.features.forEach((feature) => {
    const ssbid = feature.properties.ssbid;
    const trafficData = trafficLookup[ssbid];
    if (trafficData) {
        const risk = Number(feature.properties.Fare_0_100) || 0;
        const trafficValue = Number(trafficData.adttotal_0_100) || 0;
        const priority = (risk + trafficValue) / 2;

        feature.properties.Prioritet_0_100 = priority;
        feature.properties.adttotal_0_100 =trafficValue;
    }
});

fs.writeFileSync(
    "./public/data/prioriteringskart.geojson",
    JSON.stringify(climate)
);

console.log(
  "prioriteringskart.geojson opprettet"
);

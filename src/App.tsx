import "./App.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import polygonData from "./data/Maritime_Speed_Zones.json";
// import polylineData from "./data/Sculpture_by_the_Sea_2017.json";
//import vertexData from "./data/hundredthou_lines.json";
// import polylineData2 from "./data/Sydney_Spring_Cycle_15_October.json";
// import bigData from "./data/VERY_BIG_TEST.json";
// import L from "leaflet";
import TopoJSON from "./TopoJSON";

const MapEvents = () => {
  useMapEvents({
    click(e) {
      // setState your coords here
      // coords exist in "e.latlng.lat" and "e.latlng.lng"
      console.log(e.latlng.lat);
      console.log(e.latlng.lng);
    },
  });
  return null;
};

function App() {
  //for big data test
  //center={[35.85, -118.91]}

  return (
    <div className="App">
      <p>Leaflet Test</p>

      <div className="size">
        <MapContainer
          center={[-33.86, 151.21]}
          zoom={12}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents />
          {/* <TopoJSON data={vertexData} /> */}
          {/* <TopoJSON data={polygonData} />
          <TopoJSON data={polylineData} />
          <TopoJSON data={polylineData2} /> */}

          {/* <TopoJSON data={bigData} /> */}

          <Marker position={[51.505, -0.09]}></Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { Button } from "antd";
import Map from "./components/Map";
import 'ol/ol.css';
import "./css/App.css";
import AddnDelete from "./components/AddnDelete";
import DrawnModify from "./components/DrawnModify";
import GeoJSON from "./components/GeoJSON";



function App() {
  return (
    <div className="App">
      <header className="tool-header">
        <h1>Mapping Pro</h1>
        <Button type="primary">Upload</Button>
      </header>
      <section className="work-section">
        <div className="split map-area">
          {/* <div className="feature"><Map /></div> */}
          <div className="feature"><AddnDelete /></div>
          <div className="feature"><DrawnModify /></div>
          <div className="feature"><GeoJSON /></div>
          

        </div>
        <div className="split toolset"></div>
      </section>
    </div>
  );
}

export default App;

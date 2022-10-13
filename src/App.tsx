import React, { useState } from "react";
import { Button, Cascader } from "antd";
import Map from "./components/Map";
import "ol/ol.css";
import "./css/App.css";

import AddnDelete from "./components/AddnDelete";
import DrawnModify from "./components/DrawnModify";
import GeoJSON from "./components/GeoJSON";
import { Coordinate } from "ol/coordinate";
import { Feature } from "ol";



//Formik
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { transform } from "ol/proj";

const App = () => {
  const [parentFeature, setParentFeature] = useState([]);
  const [feature, setFeature] = useState("");


  const updateFeature = (features: any, ): void => {
    setParentFeature(features)
  }
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    const buttonName: string = button.name;
    setFeature(buttonName);
  };

  function GetFeature(buttonName: String) {
    switch (buttonName) {
      case "polygons":
        return <DrawnModify />;
      case "upload":
        return <GeoJSON />;
      case "points":
        return <AddnDelete listItems={parentFeature} updateFeature={updateFeature}/>;
      default:
        return <AddnDelete listItems={parentFeature} updateFeature={updateFeature}/>;

    }
  }
// Passing Coordinates to parent
const listItems = parentFeature.map((f, i) => {
  // Convert feature points from EPSG:3857 to EPSG:4326
let coordinates = parentFeature.map((f) =>
transform(f.getGeometry().getCoordinates(), "EPSG:3857", "EPSG:4326")
);
  return (
  <li key={f.get("uid")}>
    {f.get("name")}, {coordinates[i][0].toFixed(2)},{coordinates[i][1].toFixed(2)}{" "}
  </li>
)

});
  

  return (
    <div className="App">
      <header className="tool-header">
        <h1>Mapping Pro</h1>
      </header>
      <section className="work-section">
        <Formik
          initialValues={{
            point: {},
            polygon: {},
            linestring: {},
          }}
          onSubmit={(values: any, actions: any) => {
            console.log(values);
          }}
        >
          {(formProps) => (
            <div className="split map-area">
              <h2>Tools</h2>
              <div className="feature">
                {GetFeature(feature)}
                <div className="split tool-area">
                  <div className="tool">
                    <Form>
                  
                      {/* <Field
                        label="This label was set explicitly"
                        name="point"
                        component={AddnDelete}
                      /> */}
                    
                  
                      <p></p>
                      <Button color="primary" type="link">
                        Submit
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
              <div className="split toolset">
                <div className="button-tools">
                  <button name="points" type="submit" onClick={buttonHandler}>
                    Add/Remove Points
                  </button>
                  <button name="polygons" type="submit" onClick={buttonHandler}>
                    Draw/Modify Map
                  </button>
                  <button name="upload" type="submit" onClick={buttonHandler}>
                    Upload BaseMap
                  </button>
                </div>
                <div>

                  {listItems}
                </div>
                <div className="results">
                  <pre>
                    <p>Results</p> {JSON.stringify(formProps.values, null, 2)}
                    <p>Child Results: {JSON.stringify(parentFeature)}</p>

                  </pre>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </section>
    </div>
  );
};

export default App;

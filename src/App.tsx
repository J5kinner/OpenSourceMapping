import { Button } from "antd";
import "ol/ol.css";
import React, { useState } from "react";
import "./css/App.css";

import AddnDelete from "./components/AddnDelete";
import DrawnModify from "./components/DrawnModify";
import GeoJSON from "./components/GeoJSON";

//Formik
import { Field, Form, Formik } from "formik";
import { transform } from "ol/proj";

interface MyFormValues {
  point: any;
}

const App = () => {
  const [parentFeature, setParentFeature] = useState([]);
  const [mapType, setMapType] = useState("");

  const updateFeature = (features: any): void => {
    setParentFeature(features);
  };
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    const buttonName: string = button.name;
    setMapType(buttonName);
  };

  /*
   * Passing Coordinates to parent
   * Returns Converted feature points from EPSG:3857 to EPSG:4326
   */
  const listItems = parentFeature.map((f, i) => {
    let coordinates = parentFeature.map((f) =>
      transform(f.getGeometry().getCoordinates(), "EPSG:3857", "EPSG:4326")
    );
    return (
      <li key={f.get("uid")}>
        {coordinates[i][0].toFixed(2)},{coordinates[i][1].toFixed(2)}{" "}
      </li>
    );
  });

  const GetFeature = (buttonName: String) => {
    switch (buttonName) {
      case "polygons":
        return (
          <div>
            <DrawnModify />{" "}
            <Field label="This label was set explicitly" name="point" />
            {listItems}
            <button color="primary" type="submit">
              Submit
            </button>
          </div>
        );
      case "upload":
        return <GeoJSON />;
      case "points":
        return (
          <div>
            <AddnDelete
              listItems={parentFeature}
              updateFeature={updateFeature}
            />
            <Field label="This label was set explicitly" name="point" />
            {listItems}
            <button color="primary" type="submit">
              Submit
            </button>
          </div>
        );
      default:
        return (
          <div>
            <AddnDelete
              listItems={parentFeature}
              updateFeature={updateFeature}
            />
            <Field label="This label was set explicitly" name="point" />
            {listItems}
            <button color="primary" type="submit">
              Submit
            </button>
          </div>
        );
    }
  };

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
            actions.setSubmitting(false);
          }}
        >
          {(formProps) => (
            <div className="split map-area">
              <h2>Tools</h2>
              <div className="feature">
                <Form>
                  <p></p>
                  {GetFeature(mapType)}
                </Form>
                <div className="split tool-area">
                  <div className="tool"></div>
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
                <div>{listItems}</div>
                <div className="results">
                  <pre>
                    <p>Results</p> {JSON.stringify(formProps.values, null, 2)}
                
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

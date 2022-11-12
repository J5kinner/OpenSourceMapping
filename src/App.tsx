import "./css/App.css";
import "ol/ol.css";

import { Field, Form, Formik } from "formik";
import { createStringXY } from "ol/coordinate";
import { transform } from "ol/proj";
import { getUid } from "ol/util";
import React, { useState } from "react";

import AddnDelete from "./components/AddnDelete";
import DrawnModify from "./components/DrawModifyQuery";
import GeoJSONMap from "./components/GeoJSONHandler";
import GeoLocator from "./components/GeoLocator";

//Formik

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

  const stringifyFunc = createStringXY(2);

  const listItems = parentFeature.map((f, i) => {
    let coordinates = parentFeature.map((f) =>
      transform(f.getGeometry().getCoordinates(), "EPSG:3857", "EPSG:4326")
    );
    const arr = [coordinates[i][0], coordinates[i][1]];

    const out = stringifyFunc(arr);
    console.log(out);

    return (
      <li key={f.get("uid")}>
        {coordinates[i][0].toFixed(2)},{coordinates[i][1].toFixed(2)}{" "}
      </li>
    );
  });

  console.log(getUid(parentFeature));
  //perhaps there are other methods to get data?
  console.log(parentFeature);

  const GetFeature = (buttonName: String) => {
    switch (buttonName) {
      case "location":
        return (
          <div>
            <GeoLocator />
            <button className="submitButton" color="primary" type="submit">
              Submit
            </button>
          </div>
        );
      case "polygons":
        return (
          <div>
            <DrawnModify />{" "}
            <button className="submitButton" color="primary" type="submit">
              Submit
            </button>
          </div>
        );
      case "upload":
        return (
          <div>
            <GeoJSONMap />
            <button className="submitButton" color="primary" type="submit">
              Submit
            </button>
          </div>
        );
      case "points":
        return (
          <div>
            <AddnDelete
              listItems={parentFeature}
              updateFeature={updateFeature}
            />
            <button className="submitButton" color="primary" type="submit">
              Submit
            </button>
          </div>
        );
      default:
        return <GeoJSONMap />;
    }
  };

  return (
    <div className="App">
      <header className="tool-header">
        <div className="wordmark">
          <h1>Map Thesis</h1>
        </div>
        <div className="wordmark">
          <h1>Controls</h1>
        </div>
      </header>
      <Formik
        initialValues={{
          point: {},
          polygon: {},
          linestring: {},
        }}
        onSubmit={(values: any, actions: any) => {
          console.info(values.point);

          actions.setSubmitting(false);
        }}
      >
        {(formProps) => (
          <div className="split map-area">
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
                  AddnDelete
                </button>
                <button name="polygons" type="submit" onClick={buttonHandler}>
                  DrawModifyQuery
                </button>
                <button name="upload" type="submit" onClick={buttonHandler}>
                  GeoJSONHandler
                </button>
                <button name="location" type="submit" onClick={buttonHandler}>
                  GeoLocator
                </button>
              </div>
              <div>{listItems}</div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default App;

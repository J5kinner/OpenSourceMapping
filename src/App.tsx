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
  //recording coordinates for points
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
          </div>
        );
      case "polygons":
        return (
          <div>
            <DrawnModify />{" "}
          </div>
        );
      case "upload":
        return (
          <div>
            <GeoJSONMap />
          </div>
        );
      case "points":
        return (
          <div>
            <AddnDelete
              listItems={parentFeature}
              updateFeature={updateFeature}
            />
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
              <Form>{GetFeature(mapType)}</Form>

              <section className="bottom-buttons">
                <button className="submit-button" color="primary" type="submit" onClick={buttonHandler}>
                  Upload
                </button>
                <button className="grey-button" color="primary" type="submit">
                  Download
                </button>
                <button className="grey-button" color="primary" type="submit">
                  Offline BaseMap
                </button>
                <button
                  className="submit-button"
                  name="location"
                  type="submit"
                  onClick={buttonHandler}
                >
                  My Location
                </button>
              </section>
            </div>
            <div className="split toolset">
              <div className="button-tools">
                <button
                  className="control-button"
                  name="points"
                  type="submit"
                  onClick={buttonHandler}
                >
                  AddnDelete
                </button>
                <button
                  className="control-button"
                  name="polygons"
                  type="submit"
                  onClick={buttonHandler}
                >
                  DrawModifyQuery
                </button>
                <button
                  className="control-button"
                  name="upload"
                  type="submit"
                  onClick={buttonHandler}
                >
                  GeoJSONHandler
                </button>
               
                <button
                  className="grey-control-button"
                  color="primary"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
            <div>{listItems}</div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default App;

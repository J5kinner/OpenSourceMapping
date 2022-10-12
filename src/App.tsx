import React, { useState } from "react";
import { Button } from "antd";
import Map from "./components/Map";
import "ol/ol.css";
import "./css/App.css";

import AddnDelete from "./components/AddnDelete";
import DrawnModify from "./components/DrawnModify";
import GeoJSON from "./components/GeoJSON";

//Formik
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

function GetFeature(buttonName: String) {
  switch (buttonName) {
    case "points":
      return <AddnDelete />;
    case "polygons":
      return <DrawnModify />;
    case "upload":
      return <GeoJSON />;
    default:
      return <Map />;
  }
}

const App = () => {
  const [feature, setFeature] = useState("");

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    const buttonName: string = button.name;
    setFeature(buttonName);
  };

  return (
    <div className="App">
      <header className="tool-header">
        <h1>Mapping Pro</h1>
      </header>
      <section className="work-section">
        <Formik
          initialValues={{
            points: {},
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
                    {/* <Form>
                      <p>
                        First button does not specify featureType so defaults to
                        Point, center is defined
                      </p>
                      <Field
                        label="This label was set explicitly"
                        name="point"
                        center={center}
                        component={MapFormField}
                      />
                      
                      <p>Specify center position and featureType: Point</p>
                      <Field
                        name="point"
                        center={center}
                        featureType="Point"
                        component={MapFormField}
                      />
                  
                      <p></p>
                      <Button color="primary" type="link">
                        Submit
                      </Button>
                    </Form> */}
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

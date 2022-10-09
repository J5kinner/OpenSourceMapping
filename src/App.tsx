import React, {useState} from "react";
import { Button } from "antd";
import Map from "./components/Map";
import "ol/ol.css";
import "./css/App.css";
import AddnDelete from "./components/AddnDelete";
import DrawnModify from "./components/DrawnModify";
import GeoJSON from "./components/GeoJSON";

//Formik
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";



function App() {
  const [feature, setFeature] = useState('');

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  
  const button: HTMLButtonElement = event.currentTarget;
    setFeature(button.name);
  };

  return (
    <div className="App">
      <header className="tool-header">
        <h1>Mapping Pro</h1>
      </header>
      <section className="work-section">
        <div className="split map-area">
          {/* <div className="feature"><Map /></div> */}
          {feature !== "polygons" && feature !== "upload"
          ? <div className="feature"><AddnDelete /></div>
          : "No button clicked yet"}
          {feature !== "points" && feature !== "upload"
          ? <div className="feature"><DrawnModify /></div>
          : <div className="feature">
          <GeoJSON />
        </div>}
      
        <div className="feature">
            <MapForm />
          </div> 
        </div>
        <div className="split toolset">
          <div className="button-tools">
            <button name="points" type="submit" onClick={buttonHandler}>Add/Remove Points</button>
            <button name="polygons" type="submit" onClick={buttonHandler}>Draw/Modify Map</button>
            <button name="upload" type="submit" onClick={buttonHandler}>Upload BaseMap</button>
          </div>
          <div className="results">
            <pre>
              <p>Results</p> {/* {JSON.stringify(formProps.values, null, 2)} */}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

const MapForm = () => (
  <div>
    <h1>Invite friends</h1>
    <Formik
      initialValues={{
        friends: [
          {
            name: "",
            email: "",
          },
        ],
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="friends">
            {({ insert, remove, push }) => (
              <div>
                {values.friends.length > 0 &&
                  values.friends.map((friend, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`friends.${index}.name`}>Name</label>
                        <Field
                          name={`friends.${index}.name`}
                          placeholder="Jane Doe"
                          type="text"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`friends.${index}.email`}>Email</label>
                        <Field
                          name={`friends.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ name: "", email: "" })}
                >
                  Add Friend
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Invite</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default App;

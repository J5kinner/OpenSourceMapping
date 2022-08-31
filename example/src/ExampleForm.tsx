// @ts-ignore
import React from 'react';
import { Field, Form, Formik } from 'formik';
import {MapFormField} from 'faims3-map-input'
import Button from '@mui/material/Button'
import './ExampleForm.css'
import * as pointJSON from './10000_points_test.json'
 //import * as polyJSON from './10000_polygon.json'
// import * as lineJSON from './10000_lines.json'




const ExampleForm = () => {

  const center = [151.21409960967713,-33.85543752567224]

  const dataPoints = pointJSON
 //  const dataPoly = polyJSON
   //const dataLines = lineJSON


  //const wtf = {"Hello": "World"}

  return (
      <Formik
        initialValues={{ point: dataPoints , polygon: {}, linestring: {} }}
        onSubmit={(values: any, actions: any) => {
            console.log(values)
            actions.setSubmitting(false);
        }}
      >
        {(formProps) => (
          <div id="demoformcontainer">
            <div id="theform">
                  <h1>Test Form</h1>
          <Form>

            <p>First button does not specify featureType so defaults to Point, center is defined</p>
            <Field label="This label was set explicitly" name="point" center={center} component={MapFormField} />

            <p>Specify center position and featureType: Point</p>
            <Field name="point" center={center} featureType="Point" component={MapFormField} />
            <p>Polygon with no specified center, uses current location, zoom set to 10</p>
            <Field name="polygon" zoom={10} featureType="Polygon" component={MapFormField} />
            <p> Linestring with no center, uses current location</p>
            <Field name="linestring" featureType="LineString" component={MapFormField} />
            <p></p>
            <Button variant='contained' color='primary' type="submit">Submit</Button>
          </Form>

            </div>
              <div id="formvaluedisplay">
                <pre>
                {JSON.stringify(formProps.values, null, 2)}
                </pre>
              </div>
              </div>
        )}
      </Formik>
)
};


export default ExampleForm;
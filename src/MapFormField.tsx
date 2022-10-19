import React, { useState } from "react";
// import MapWrapper from './MapWrapper'
// import { Geolocation } from '@capacitor/geolocation'
import type { GeoJSONFeatureCollection } from "ol/format/GeoJSON";
import { FieldProps } from "formik";


export interface MapFieldProps extends FieldProps {
  featureType: "Point" | "Polygon" | "LineString";
  label?: string;
  FormLabelProps?: any;
}

export function MapFormField({
  field,
  form,
  ...props
}: MapFieldProps): JSX.Element {
  // get previous form state if available
//   let initialFeatures = {};
//   if (form.values[field.name]) {
//     initialFeatures = form.values[field.name];
//   }

  const [drawnFeatures, setDrawnFeatures] =
    useState<GeoJSONFeatureCollection>();

  // default to point if not specified
  if (!props.featureType) {
    props.featureType = "Point";
  }

  const mapCallback = (theFeatures: GeoJSONFeatureCollection) => {
    setDrawnFeatures(theFeatures);

    form.setFieldValue(field.name, theFeatures);
  };

  let valueText = "";
  if (drawnFeatures.features) {
    const geom = drawnFeatures.features[0].geometry;
    switch (geom.type) {
      case "Point":
        valueText =
          "Point: " +
          geom.coordinates[0].toFixed(2).toString() +
          ", " +
          geom.coordinates[1].toFixed(2).toString();
        break;
      case "Polygon":
        valueText = "Polygon: " + (geom.coordinates[0].length - 1) + " points";
        break;
      case "LineString":
        valueText = "Line String: " + geom.coordinates.length + " points";
        break;
    }
  }

  return (
    <div>
      <div>{valueText}</div>
    </div>
  );
}

export default MapFormField;
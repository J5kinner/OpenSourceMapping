import React, { useState, useCallback, useMemo } from "react";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";

import "ol/ol.css";
import * as fs from "fs";

import { RMap, ROSM, RLayerVector, RStyle } from "rlayers";

import geojsonFeatures from "./data/tenthou_points.json";

export default function Features(): JSX.Element {
  const [flow, setFlow] = React.useState([]);
  const [fileSelected, setFileSelected] = React.useState<File>();
  const [geojson, setGeojson] = React.useState<GeoJSON>();

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;

    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(fileList[0]);

    console.log(fileList[0].name);
    setFileSelected(fileList[0]);
  };

  const onReaderLoad = function (event: any) {
    var obj = JSON.parse(event.target.result);
    console.log(obj);
    setGeojson(obj);
  };

  const uploadFile = function (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    if (fileSelected) {
      const formData = new FormData();
      formData.append("image", fileSelected, fileSelected.name);
    }
  };

  return (
    <div className="d-flex flex-row">
      <RMap
        className="example-map"
        initial={{ center: fromLonLat([2.364, 48.82]), zoom: 5 }}
      >
        <ROSM />
        {/* From a static file included at bundling time */}
        {geojson && (
          <RLayerVector
            zIndex={15}
            features={new GeoJSON({
              featureProjection: "EPSG:3857",
            }).readFeatures(geojson)}
          >
            <RStyle.RStyle>
              <RStyle.RCircle radius={5}>
                <RStyle.RFill color="red" />
              </RStyle.RCircle>
            </RStyle.RStyle>
          </RLayerVector>
        )}
        <RLayerVector
          zIndex={15}
          features={new GeoJSON({
            featureProjection: "EPSG:3857",
          }).readFeatures(geojsonFeatures)}
          // onClick={useCallback(
          //   (e) => {
          //     setFlow([...flow, e.target.get("en")].slice(-16));
          //   },
          //   [flow]
          // )}
        >
          <RStyle.RStyle>
            <RStyle.RCircle radius={5}>
              <RStyle.RFill color="blue" />
            </RStyle.RCircle>
          </RStyle.RStyle>
        </RLayerVector>
        {/* From an URL */}
        <RLayerVector
          zIndex={5}
          format={new GeoJSON({ featureProjection: "EPSG:3857" })}
          url="https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson"
          onPointerEnter={useCallback(
            (e) => {
              setFlow([...flow, "Entering " + e.target.get("nom")].slice(-16));
            },
            [flow]
          )}
        >
          <RStyle.RStyle>
            <RStyle.RStroke color="#007bff" width={3} />
            <RStyle.RFill color="transparent" />
          </RStyle.RStyle>
        </RLayerVector>
      </RMap>
      <div className="mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow example-list">
        <p>Your actions</p>
        <ul
          dangerouslySetInnerHTML={{
            __html: flow.map((p) => `<li className="m-0">${p}</li>`).join(""),
          }}
        />
      </div>
      <label>onchange</label>
      <input
        accept="json/*"
        type="file"
        multiple={false}
        onClick={uploadFile}
        onChange={handleImageChange}
      />
    </div>
  );
}

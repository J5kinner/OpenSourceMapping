import React, { useCallback } from "react";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";

import { RMap, ROSM, RLayerVector, RStyle } from "rlayers";

import geojsonFeatures from "./data/geo.json";

export default function Features(): JSX.Element {
  const [flow, setFlow] = React.useState([]);
  const [fileSelected, setFileSelected] = React.useState<File>() // also tried <string | Blob>
  const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    setFileSelected(fileList[0]);
};

    const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        if (fileSelected) {
            const formData = new FormData();
            formData.append("data", fileSelected, fileSelected.name);
        }
    };
  return (
    <div className="d-flex flex-row">
      <RMap
        className="example-map"
        initial={{ center: fromLonLat([2.364, 48.82]), zoom: 11 }}
        height={"300px"}
      >
       <input type="file" onChange={ (e) => this.handleFileChange(e.target.files) } />
        <ROSM />
        {/* From a static file included at bundling time */}
        <RLayerVector
          zIndex={10}
          features={new GeoJSON({
            featureProjection: "EPSG:3857",
          }).readFeatures(geojsonFeatures)}
          onClick={useCallback(
            (e) => {
              setFlow([...flow, e.target.get("en")].slice(-16));
            },
            [flow]
          )}
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
    </div>
  );
}

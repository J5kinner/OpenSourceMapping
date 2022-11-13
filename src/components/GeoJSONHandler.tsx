import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat } from "ol/proj";
import React, { useCallback } from "react";

import "ol/ol.css";

import { RLayerVector, RMap, ROSM, RStyle } from "rlayers";

import geojsonFeatures from "./data/geo.json";

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
    // const jsonString = JSON.stringify(obj);
    // const writeFile = new fs.writeFile('./savedJSON.geojson', jsonString, err => {
    //   if (err) {
    //     console.log('Error writing file', err);
    //   } else {
    //     console.log('Successfully wrote file');
    //   }
    //   return writeFile;
    // });
  };

  const uploadFile = function (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    if (fileSelected) {
      const formData = new FormData();
      formData.append("image", fileSelected, fileSelected.name);
    }
  };

  const clearFile = function (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    setGeojson(undefined);
    setFileSelected(undefined);
  };

  return (
    <div className="d-flex flex-row">
      <RMap
        className="example-map"
        initial={{ center: fromLonLat([133.8, -23.6]), zoom: 4 }}
      >
        <ROSM />
        {/* From a static file included at bundling time */}
        {geojson && (
          <RLayerVector
            zIndex={16}
            features={new GeoJSON({
              featureProjection: "EPSG:3857",
            }).readFeatures(geojson)}
          >
            <RStyle.RStyle>
              <RStyle.RCircle radius={4}>
                <RStyle.RFill color="green" />
              </RStyle.RCircle>
              <RStyle.RStroke color="#007bff" width={3} />
              <RStyle.RFill color="rgba(255, 255, 255, 0.5)" />
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
          onPointerEnter={useCallback(
            (e) => {
              setFlow(
                [...flow, "Entering " + e.target.get("STATE_NAME")].slice(-16)
              );
            },
            [flow]
          )}
        >
          <RStyle.RStyle>
            <RStyle.RCircle radius={5}>
              <RStyle.RFill color="#A6192E" />
            </RStyle.RCircle>
          </RStyle.RStyle>
        </RLayerVector>
        {/* From an URL */}
        {/* <RLayerVector
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
        </RLayerVector> */}
      </RMap>
      <div className="mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow example-list">
        <ul
          dangerouslySetInnerHTML={{
            __html: flow.map((p) => `<li className="m-0">${p}</li>`).join(""),
          }}
        />
      </div>
      <input
        className="submit-button"
        accept="json/*"
        type="file"
        multiple={false}
        onClick={uploadFile}
        onChange={handleImageChange}
      />
      <button className="submit-button" onClick={clearFile}>
        Clear Screen
      </button>
    </div>
  );
}

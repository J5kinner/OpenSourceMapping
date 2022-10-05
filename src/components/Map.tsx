import React from "react";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

import { RMap, ROSM } from "rlayers";

const center = fromLonLat([ 151.20, -33.86]);
export default function Simple(): JSX.Element {
  return (
    <RMap width={"100%"} height={"300px"} initial={{ center: center, zoom: 11 }}>
      <ROSM />
    </RMap>
  );
}

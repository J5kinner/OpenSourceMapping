import React, { useEffect } from "react";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { Coordinate } from "ol/coordinate";
import "ol/ol.css";

import monument from "./svg/monument.svg";
import { RMap, ROSM, RLayerVector, RStyle, RFeature, ROverlay } from "rlayers";

export const coords: Record<string, Coordinate> = {
  "Tour Eiffel": [151.115684,-33.773687],
};

let unique_id = 0;

// interface AddnDeleteProps {
//   listItems: any;
//   updateFeature: (arg: any) => void;
// }

function AddnDelete({ listItems, updateFeature }): JSX.Element {
  // The features must be part of the state as they will be modified

  const [features, setFeatures] = React.useState(() =>
    Object.keys(coords).map(
      (f) =>
        new Feature({
          geometry: new Point(fromLonLat(coords[f])),
          name: f,
          uid: unique_id++,
        })
    )
  );

  const vectorRef = React.useRef() as React.RefObject<RLayerVector>;
  // Added to update parent with new features
  useEffect(() => {
    setFeatures(features);
  }, [features]);

  return (
    <React.Fragment>
      <RMap
        className="example-map"
        initial={{ center: fromLonLat([151.115684,-33.773687]), zoom: 17 }}
        onClick={(e) => {
          const coords = e.map.getCoordinateFromPixel(e.pixel);
          // console.log(e.pixel)
          // console.log(coords)

          features.push(
            new Feature({ geometry: new Point(coords), uid: unique_id++ })
          );
          // Why not setFeatures(features) ?
          // Because it won't have any effect -
          // unless you artificially create a new array
          // React won't know that something changed
          updateFeature([...features]);
        }}
      >
        <ROSM />

        <RLayerVector ref={vectorRef}>
          <RStyle.RStyle>
            <RStyle.RIcon src={monument} />
          </RStyle.RStyle>
          {features.map((f) => (
            <RFeature
              // This is the very important part: if we are going to be
              // adding or deleting features, we must have a key field
              // that won't be transient - we can't use the array index, as
              // it will change every time we delete a feature in the middle
              key={f.get("uid")}
              feature={f}
              onClick={(e) => {
                // This is the deletion
                const idx = features.findIndex(
                  (x) => x.get("uid") === e.target.get("uid")
                );
                if (idx >= 0) {
                  features.splice(idx, 1);
                  updateFeature([...features]);
                  // It is very important to return false to stop the
                  // event propagation - otherwise that same event will
                  // also trigger the Map onClick
                  return false;
                }
              }}
            >
              <ROverlay>
                <div className={"user-select-none"}>{f.get("uid")}</div>
              </ROverlay>
            </RFeature>
          ))}
        </RLayerVector>
      </RMap>
      <div className="mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow">
        <p>
          Click an empty space to add a monument or click a monument to delete
          it.
        </p>
        {/* <p>{listItems}</p> */}
      </div>
    </React.Fragment>
  );
}

export default AddnDelete;

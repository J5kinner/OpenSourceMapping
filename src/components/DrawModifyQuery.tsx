import React from "react";
import { fromLonLat } from "ol/proj";
import {
  altShiftKeysOnly,
  platformModifierKeyOnly,
  shiftKeyOnly,
  altKeyOnly,
  never,
  doubleClick,
  always,
} from "ol/events/condition";
import { Geometry, Point } from "ol/geom";
import "ol/ol.css";

import bridge from "./svg/monument.svg";
import house from "./svg/house.svg";

import {
  RMap,
  ROSM,
  RInteraction,
  RLayerVector,
  RStyle,
  RFeature,
} from "rlayers";
import VectorSource from "ol/source/Vector";

const TourEiffel = fromLonLat([151.114995, -33.773893]);
const OperaHouse = fromLonLat([151.113536, -33.773093]);

const TourEiffelPoint = new Point(TourEiffel);
const OperaHousePoint = new Point(OperaHouse);

export default function Interactions(): JSX.Element {
  const [selected, setSelected] = React.useState(false);
  const [selected2, setSelected2] = React.useState(false);
  const [controlSelected, setControl] = React.useState("");

  const controlHandler = (buttonName: String) => {
    switch (buttonName) {
      case "polygons":
        setControl("polygons");
        return;
      case "circles":
        setControl("circles");
        return;
      case "edit":
        setControl("edit");
        return;
      case "free":
        setControl("free");
        return;

      default:
        setControl("polygons");
        return;
    }
  };

  return (
    <React.Fragment>
      <RMap
        className="example-map"
        initial={{ center: fromLonLat([151.115684, -33.773687]), zoom: 16 }}
      >
        <ROSM />

        <RLayerVector>
          <RStyle.RStyle>
            <RStyle.RIcon src={bridge} />
          </RStyle.RStyle>
          <RFeature geometry={TourEiffelPoint} />
          <RFeature geometry={OperaHousePoint} />
        </RLayerVector>

        <RLayerVector
          onChange={React.useCallback((e) => {
            // On every change, check if there is a feature covering the Eiffel Tower
            const source = e.target as VectorSource<Geometry>;
            if (source?.forEachFeatureAtCoordinateDirect)
              setSelected(
                source.forEachFeatureAtCoordinateDirect(TourEiffel, () => true)
              );
            if (source?.forEachFeatureAtCoordinateDirect)
              setSelected2(
                source.forEachFeatureAtCoordinateDirect(OperaHouse, () => true)
              );
          }, [])}
        >
          {/* This is the style used for the drawn polygons */}
          <RStyle.RStyle>
            <RStyle.RStroke color="#0000ff" width={3} />
            <RStyle.RFill color="rgba(0, 0, 0, 0.75)" />
          </RStyle.RStyle>

          <RInteraction.RDraw
            type={"Polygon"}
            condition={
              controlSelected === "polygons" ? always : altShiftKeysOnly
            }
            freehandCondition={
              controlSelected === "free" ? always : altShiftKeysOnly
            }
          />

          <RInteraction.RDraw
            type={"Circle"}
            condition={
              controlSelected === "circles" ? always : altShiftKeysOnly
            }
            freehandCondition={never}
          />

          <RInteraction.RModify
            condition={controlSelected === "edit" ? always : altShiftKeysOnly}
            deleteCondition={React.useCallback(
              (e) => doubleClick(e),
              []
            )}
          />
        </RLayerVector>
      </RMap>
      <div>
        <button className="submit-button" onClick={() => controlHandler("polygons")}>
          Draw Polygons
        </button>
        <button className="submit-button"  onClick={() => controlHandler("circles")}>Draw Circles</button>
        <button className="submit-button"  onClick={() => controlHandler("edit")}>Edit/Delete Mode</button>
        <button className="submit-button"  onClick={() => controlHandler("free")}>Free Hand Mode</button>

        {/* <p className="p-0 m-0">
          Draw shapes by click without dragging for a regular polygon
        </p>
        <p className="p-0 m-0">
          Free Hand Mode is click and drag for a freehand polygon
        </p>
        <p className="p-0 m-0">
          Edit Mode to drag to move/add a vertex
        </p>
        <p className="p-0 m-0">
          Delete Mode double click to remove a vertex
        </p> */}
      </div>
      <div className="mx-0 mt-1 mb-3 p-1 w-100 jumbotron shadow shadow">
        <p><strong>Currently Mason Theatre is{selected ? "" : " not"} covered</strong></p>
        <p><strong>Currently the UBar is{selected2 ? "" : " not"} covered</strong></p>
      </div>
    </React.Fragment>
  );
}

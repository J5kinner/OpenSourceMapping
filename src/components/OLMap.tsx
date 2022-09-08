import React from 'react'; // we need this to make JSX compile
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

type OLMapProps = {
  target: string,
  source: XYZ,
  layers: [TileLayer<XYZ>],
  url: String,
  view: View,
  center: [number, number],
  zoom: number,

}

function mapDisplay(  
  target: string,
  layers: [TileLayer<XYZ>],
  view: View,) {
  new Map({
    target: target,
    layers: layers,
    view: view
  });
}

export const OLMap = ({ target, layers, view }: OLMapProps) => 
<aside>
  mapDisplay(target, layers, view)
</aside>



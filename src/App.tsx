import React from 'react';
import './App.css';

import esriConfig from "@arcgis/core/config";

import WebMap from "@arcgis/core/WebMap";
import Map from '@arcgis/core/Map';
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import * as projection from "@arcgis/core/geometry/projection";

esriConfig.assetsPath = "./assets"; 
esriConfig.apiKey = "AAPK8a6843e0d83f47bdaeae9a5259ec04a7GULvXyb7NdSzp0oEVM2EQTkExPas9lPWETDa35QtWufktGRYfiz_TXAHdbUFfQiw";

function App() {
  const [state, setState] = React.useState(1);

  const map = React.useRef(new Map({
    basemap: "arcgis-topographic" // Basemap layer service
  }));
  const mapView = React.useRef<MapView>();
  const citiesLayer = React.useRef(new FeatureLayer({
    url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0',
    definitionExpression: "STATUS = 'National capital' OR STATUS = 'National and provincial capital' OR STATUS = 'National capital and provincial capital enclave'",
    popupEnabled: true,
    popupTemplate: {
      title: "{CITY_NAME}",
      content: [{
        type: "fields",
        fieldInfos: {
          fieldName: "POP",
          label: "Population",
          format: {
            digitSeparator: true
          }
        }
      }]
    }
  }));
  
  React.useEffect(() => {
    map.current.add(citiesLayer.current);
    mapView.current = new MapView({
      map: map.current,
      center: [35.025128, 31.373781], // Longitude, latitude
      zoom: 7, // Zoom level
      container: "mapViewDiv"
    });
  }, [])

  return (
    <div className="App">
      <div id="mapViewDiv" style={{ width: 1000, height: 500 }} />
    </div>
  );
}

export default App;

import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, LayerGroup} from 'react-leaflet';
import L, { Icon } from 'leaflet';
import {
  IActivity,
  ActivityId,
} from '../types';

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIcon2xPng from "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/leaflet.css";

export interface IMapProps {
  activities: Array<IActivity>;
  selectedActivityId: ActivityId;
  setSelectedActivityId: Function;
}

export default function Map({activities, selectedActivityId, setSelectedActivityId}) {
  //  style={{width: "100vw", height: "100vh", border: "3px solid purple"}}
  // style={{width: "100%", height: "100%", border: "3px solid purple"}}
  // <Marker position={[lat, lng]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} />
  // const markerIcon = <Icon iconUrl={markerIconPng} iconSize={[25, 41]} iconAnchor={[12, 41]}/>;

  // console.info("Marker Icon:", markerIconPng);
  const [map, setMap] = React.useState<typeof MapContainer>();
  const markerLayerGroupRef = React.useRef(L.layerGroup());
  const selectedMarkerRef = React.useRef();

  const tileLayer = React.useMemo(() => (
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  ), []);

  const markerIcon = new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]});
  /* const markerIcon2x = new Icon({iconUrl: markerIcon2xPng.src, iconSize: [markerIcon2xPng.width, markerIcon2xPng.height], iconAnchor: [markerIcon2xPng.width/2, markerIcon2xPng.height]}); */
  const markerIcon2x = new Icon({iconUrl: markerIcon2xPng, iconSize: [50, 82], iconAnchor: [25, 82]});

  const clearMarkers = () => {
    markerLayerGroupRef.current.clearLayers();
  };

  React.useEffect(() => {
    // Once the map is created, add the marker layerGroup to it
    if( map ) {
      markerLayerGroupRef.current.addTo(map);
    }
  }, [map]);

  React.useEffect(() => {
    if( !map ) {
      return clearMarkers;
    }
    // The markers should automatically be cleared before reinvoking this effect because of the cleanup function we returned
    // TODO Be more sophisticated and just add/remove the markers that changed
    // TODO Be more sophisticated and just update the icons instead of regenerating all the markers when a new one is selected

    console.info("Adding activities as markers:", activities);

    activities
      .filter(({latitude, longitude}) => latitude && longitude)
      .forEach(({id, classTitle, latitude, longitude}) => {
        console.info("Creating marker with title:", id);
        const marker = L.marker([latitude, longitude], { icon: id === selectedActivityId ? markerIcon2x : markerIcon, title: id })
              .bindTooltip(classTitle)
              .on("click", (evt) => setSelectedActivityId(evt.target.options.title))
              .addTo(markerLayerGroupRef.current);
      });

    return clearMarkers;

  }, [map, activities, selectedActivityId]);

  const mapContainer = (
    <MapContainer center={[43.4508, -87.7145]} zoom={8} style={{flexGrow: 4, width: "80vw"}}>
      {tileLayer}
      <LayerGroup>
        {
          activities
            .filter( ({latitude, longitude}: IActivity) => latitude && longitude )
            .map(({id, latitude, longitude}: IActivity) => (
              <Marker icon={id === selectedActivityId ? markerIcon2x : markerIcon}
                      key={id}
                      title={id}
                      position={[latitude, longitude]}
                      eventHandlers={{click: () => {setSelectedActivityId(id)}}}
              />
            ))
        }
      </LayerGroup>
    </MapContainer>
  );

  React.useEffect(() => {
    console.warn("Map Component Reconstructed (Why?!)");
  }, []);

  return mapContainer;
}


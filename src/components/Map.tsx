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

  const tileLayer = React.useMemo(() => (
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  ), []);

  const markerIcon = new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]});
  const markerIcon2x = new Icon({iconUrl: markerIcon2xPng, iconSize: [50, 82], iconAnchor: [25, 82]});

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

  return mapContainer;
}


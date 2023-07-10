import React from 'react';
import { IActivity } from '../types';

export interface IDetailsProps {
  selectedActivity: IActivity
}

export default function Details({selectedActivity: {classTitle, classDescription}}: IDetailsProps) {

  React.useEffect(() => {
    console.warn("Details Reconstructed (am I living a lie?!)");
  }, []);

  console.info("Rendering Details for", classTitle, ": ", classDescription);
  return (
    <div className="p-4" style={{ flexGrow: "1", border: "2px solid blue", minHeight: "250px", maxHeight: "250px"}}>
      <h3 className="font-bold m-1">{classTitle}</h3>
      <p>{classDescription}</p>
    </div>
  );
}

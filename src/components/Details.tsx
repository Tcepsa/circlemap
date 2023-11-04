import { IActivity } from '../types';

export interface IDetailsProps {
  selectedActivity: IActivity
}

function convertDateToTimeString(date: Date) {
  const minutes = date.getMinutes();
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${date.getHours()}:${minutesString}`;
}

export default function Details({selectedActivity: {classTitle, classDescription, displayLocation, date, startTime, endTime, repeats, classMinimum, classMaximum, fee}}: IDetailsProps) {

  const startTimeString = startTime instanceof Date ? convertDateToTimeString(startTime) : startTime;
  const endTimeString = endTime instanceof Date ? convertDateToTimeString(endTime) : endTime;

  return (
    <div className="p-1 flex flex-col" style={{ flexGrow: "1", border: "2px solid blue", minHeight: "250px", maxHeight: "250px"}}>
      <div className="flex overflow-y-scroll" style={{minHeight: "42%", maxHeight: "50%", borderBottom: "1px solid black"}}>
        <div className="m-1 inline-block" style={{width: "50%"}}>
          <div className="underline font-bold text-xl">{classTitle}</div>
          <div><span className="font-bold">Location: </span> {displayLocation}</div>
        </div>

        <div className="p-1 inline-block" style={{width: "25%"}}>
          <div><span className="font-bold">Date: </span> {date instanceof Date ? date.toDateString() : date}</div>
          <div><span className="font-bold">Starts at: </span> {startTimeString}</div>
          <div><span className="font-bold">Ends at: </span> {endTimeString}</div>
          <div><span className="font-bold">Repeats: </span> {repeats}</div>
        </div>
        <div className="p-1 inline-block" style={{width: "25%"}}>
          <div><span className="font-bold">Minimum Participants: </span> {classMinimum}</div>
          <div><span className="font-bold">Maximum Participants: </span> {classMaximum}</div>
          <div><span className="font-bold">Fee: </span> {fee}</div>
        </div>

      </div>
      <div className="grow overflow-y-scroll">{classDescription}</div>
    </div>
  );
}

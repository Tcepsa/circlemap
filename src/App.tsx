import React from 'react';
import './App.css'
import Details from './components/Details';
/* import Filters from './components/Filters'; */
import ActivityList from './components/ActivityList';
import { v4 as uuidv4 } from 'uuid';
import Map from './components/Map';
import {
  IActivityWithoutId,
  IActivity,
  ActivityId,
    /* IFilters, */
} from './types';

function App() {
  /* const [data, setData] = React.useState([
   *   {
   *     id: crypto.randomUUID(),
   *     activityName: "Green Woodworking",
   *     latitude: 43.7644537289126,
   *     longitude: -87.70918970406954,
   *     description: "Joel provides a demonstration of green woodworking techniques such as splitting with wedges and with a froe, using the shave horse and drawknife, and turning on the pole lathe.  Participants will be offered the opportunity to try each technique under supervision, time permitting.",
   *     date: new Date(),
   *     startTime: "10:00 AM", // Change to use startTime, endTime as full Dates
   *     endTime: "12:00 PM",
   *   },
   *   {
   *     id: crypto.randomUUID(),
   *     activityName: "Disc Golf at Vollrath Park",
   *     latitude: 43.765857379005325,
   *     longitude: -87.70227524883292,
   *     description: "18 hole disc golf course; bring your own discs or rent on-site!",
   *     date: new Date(),
   *     startTime: "2:00 PM",
   *     endTime: "3:30 PM",
   *   },
   * ]);
   */

  const [data, setData] = React.useState<Array<IActivity>>([]);
  const [activitiesById, setActivitiesById] = React.useState<Record<ActivityId, IActivity>>({});
    /* const [filters, setFilters] = React.useState<IFilters>({}); */

  // "Constructor" to load data when component is first created
  React.useEffect(() => {

    fetch("/resources/geocodedClasses.json")
      .then(response => {
        if(!response.ok) {
          console.error("Something went wrong fetching the classes spreadsheet", response.status, response.statusText);
        }
        return response.json();
      })
      .then(classesDataAsJson => {
        const classesWithoutIds: Array<IActivityWithoutId> = classesDataAsJson as Array<IActivityWithoutId>;

        const classesDataWithIds: Array<IActivity> = classesWithoutIds.reduce((classesDataWithIds: Array<IActivity>, classData) => ([...classesDataWithIds, { ...classData, id: uuidv4()}]), []);

        setData(classesDataWithIds);
      });
  }, []);

  React.useEffect(() => {
    const newActivitiesById = data.reduce((activitiesById, activity) => {
      return { ...activitiesById, [activity.id]: activity };
    }, {});

    setActivitiesById( newActivitiesById );

  }, [data]);

  // Filter the data based on the filters... and the data! XD
    /* React.useEffect(() => {
     *   setFilteredData(data);

     *   console.log("Data with lat")
     * }, [data]); */

    const [filteredData, _setFilteredData] = React.useState(data);

  const [selectedActivityId, setSelectedActivityId] = React.useState<ActivityId>('');

  const selectedActivity = activitiesById[selectedActivityId];

  return (
    <div style={{display: "flex", flexDirection: "row"}} >
      <div style={{display: "flex", border: "2px solid green", height: "100vh", minWidth: "350px", maxWidth: "350px" }} >
          {/* <Filters setFilteredData={setFilteredData} /> */}
        <ActivityList activities={filteredData} selectedActivityId={selectedActivityId} setSelectedActivityId={setSelectedActivityId}/>
      </div>
      <div style={{ display: "flex", flexDirection: "column", border: "2px solid orange", flexGrow: "4" }} >
        <Map
          activities={filteredData}
          selectedActivityId={selectedActivityId}
          setSelectedActivityId={setSelectedActivityId}
        />
        {selectedActivity
        ? <Details selectedActivity={selectedActivity} />
        : <div className="p-4" style={{ flexGrow: "1", border: "2px solid blue", minHeight: "250px" }}>No activity selected yet!</div>}
      </div>
    </div>
  )
}

export default App

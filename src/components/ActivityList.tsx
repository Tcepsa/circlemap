import { IActivityListProps } from "../types.tsx";

function ActivityList({activities, selectedActivityId, setSelectedActivityId}: IActivityListProps) {
  return (
    <div className="grow overflow-y-scroll border-solid border-indigo-600 border-2">
      {activities.map(({ id, classTitle }) => (
        <div key={id}
             className={`font-bold p-4 ${id === selectedActivityId ? 'bg-slate-200' : ''} ${id === selectedActivityId ? 'dark:bg-slate-700' : ''}`}
             onClick={() => setSelectedActivityId(id)} >
          {classTitle}
        </div>))}
    </div>
  );
}

export default ActivityList;

export default function ActivityList({activities, selectedActivityId, setSelectedActivityId}) {
  return (
    <div className="grow overflow-y-scroll border-solid border-indigo-600 border-2">
      {activities.map(({ id, classTitle }) => (
        <div key={id}
             className={`font-bold p-4 ${id === selectedActivityId ? 'bg-slate-200' : ''}`}
             onClick={() => setSelectedActivityId(id)} >
          {classTitle}
        </div>))}
    </div>
  );
}

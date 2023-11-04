import { MouseEventHandler } from "react";

export interface IActivityWithoutId {
  classTitle: string;
  classDescription: string;
  displayLocation: string;
  latitude: number;
  longitude: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  repeats: string;
  classMinimum: string; // Maybe number
  classMaximum: string; // Maybe number
  fee: string; // Maybe number
}

export type ActivityId = string;

export interface IActivity extends IActivityWithoutId {
  id: ActivityId;
}

export interface IFilters {
  
}

export interface IFiltersProps {
    setFilters: MouseEventHandler<HTMLButtonElement>;
}

export interface IActivityListProps {
    activities: Array<IActivity>,
    selectedActivityId: ActivityId,
    setSelectedActivityId: (arg0: ActivityId) => void,
}

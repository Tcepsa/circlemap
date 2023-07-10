export interface IActivityWithoutId {
  classTitle: string;
  classDescription: string;
  displayLocation: string;
  latitude: number;
  longitude: number;
  date: string; // Maybe Date?
  startTime: string; // Maybe Date?
  endTime: string; // Maybe Date?
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

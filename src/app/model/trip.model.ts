export interface Trip {
  start: string;
  end: string;
  level: number;
  continued: boolean;
  repeated: boolean;
  diversionUp?: boolean;
  diversionDown?: boolean;
  newDestination?: boolean;
  arrowed?: boolean;
}

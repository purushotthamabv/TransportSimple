import { Injectable } from '@angular/core';
import { Trip } from '../model/trip.model';

@Injectable({ providedIn: 'root' })
export class TripService {
  private trips: Trip[] = [];

  addTrip(start: string, end: string): Trip[] {
    let level = 1;
    let type: Trip['type'] = 'continued';
    const last = this.trips[this.trips.length - 1];
  
    if (last) {
      const isContinued = start === last.end || 
        this.trips.some(t => t.start === start && t.end === end);
  
      if (isContinued) {
        type = 'continued';
        level = 1;
      } else {
        // We will handle other types later
        // type = 'new';
        level = 1;
      }
    }
  
    const display = `${start.slice(0, 3).toUpperCase()} - ${end.slice(0, 3).toUpperCase()}`;
    this.trips.push({ start, end, level, type, display });
  
    return [...this.trips]; // New reference for Angular change detection
  }

  reset() {
    this.trips = [];
  }

  getTrips(): Trip[] {
    return [...this.trips]; // avoid mutation issues
  }

}
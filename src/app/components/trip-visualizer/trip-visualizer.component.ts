import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-visualizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-visualizer.component.html',
  styleUrl: './trip-visualizer.component.scss'
})
export class TripVisualizerComponent {
  startPoint = '';
  endPoint = '';
  trips: Trip[] = [];
  lastTrip: Trip | null = null;

  ngOnInit(): void {
    const stored = localStorage.getItem('trips');
    if (stored) {
      this.trips = JSON.parse(stored);
    }
  }

  isTripInputValid(): boolean {
    return this.startPoint.trim().length >= 3 && this.endPoint.trim().length >= 3;
  }

  addTrip(): void {
    const start = this.startPoint.slice(0, 3).toUpperCase();
    const end = this.endPoint.slice(0, 3).toUpperCase();

    const stored = localStorage.getItem('trips');
    if (stored) {
      this.trips = JSON.parse(stored);
    }

    this.lastTrip = this.trips[this.trips.length - 1];

    const newTrip: Trip = {
      start,
      end,
      level: 1,
      continued: false,
      repeated: false,
      arrowed: false,
      diversionUp: false,
      diversionDown: false
    };

    if (!this.lastTrip) {
      newTrip.continued = true;
    } else {
      if (this.lastTrip.end === start) {
        newTrip.continued = true;
      } else {
        const earlierTrip = this.trips.find(t => t.start === start && t.end === end);
        if (earlierTrip) {
          newTrip.repeated = true;
          newTrip.level = 2;
        } else {
          newTrip.arrowed = true;
        }
      }
    }

    this.trips.push(newTrip);
    localStorage.setItem('trips', JSON.stringify(this.trips));
    this.startPoint = '';
    this.endPoint = '';
    
    console.log('First trip:', this.trips[0]);
    console.log('new trip added:', newTrip);
    console.log('Last trip:', this.lastTrip);
    console.log('Trip count:', newTrip.level);
    console.log('All trips:', this.trips);
  }

  resetTrip(): void {
    if (confirm('Are you sure you want to reset all trip data?')) {
      localStorage.clear();
      window.location.reload();
    }
  }
}

// trip.model.ts
export interface Trip {
  start: string;
  end: string;
  level: number;
  continued?: boolean;
  repeated?: boolean;
  arrowed?: boolean;
  diversionUp?: boolean;
  diversionDown?: boolean;
}
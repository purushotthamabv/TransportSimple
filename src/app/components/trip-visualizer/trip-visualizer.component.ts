import { Component, Input, SimpleChanges } from '@angular/core';
import { Trip } from '../../model/trip.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-visualizer',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './trip-visualizer.component.html',
  styleUrl: './trip-visualizer.component.scss'
})
export class TripVisualizerComponent {
  startPoint = '';
  endPoint = '';
  trips: Trip[] = [];
  lastTrip: any;
  firstTrip: any;

  isTripInputValid(): boolean {
    return (
      this.startPoint.trim().length >= 3 &&
      this.endPoint.trim().length >= 3
    );
  }

  ngOnInit(): void {
    const stored = localStorage.getItem('trips');
    if (stored) {
      this.trips = JSON.parse(stored);
    }
  }

  onTripInputChange() {
    this.lastTrip = this.trips[this.trips.length - 1];
    this.firstTrip = this.trips[0];
  }

  addTrip() {
    const start = this.startPoint.slice(0, 3).toUpperCase();
    const end = this.endPoint.slice(0, 3).toUpperCase();

    let nextLevel = 1;

    // Load previous trips
    const stored = localStorage.getItem('trips');
    if (stored) {
      this.trips = JSON.parse(stored);
    }

    // Get previous trip references
    this.lastTrip = this.trips[this.trips.length - 1];
    this.firstTrip = this.trips[0];

    // Default trip structure
    const newTrip: Trip = {
      start,
      end,
      level: 1,
      continued: false,
      repeated: false
    };

    if (!this.lastTrip) {
      newTrip.continued = true;
    } else {
      if (this.firstTrip.start === end) {
        newTrip.arrowed = true;
      } if(this.firstTrip.start && this.lastTrip.end == end) {
        newTrip.arrowed = true;
        nextLevel = 2;
      }
      if (this.lastTrip.end === start) {
        newTrip.continued = true;
      } else if (this.lastTrip.start === start && this.lastTrip.end === end) {
        newTrip.repeated = true;
        newTrip.level = 2;
      } else {
        const earlierTrip = this.trips.find(t => t.start === start && t.end === end);
        if (earlierTrip) {
          newTrip.repeated = true;
          newTrip.level = 2;
        }
      }
    }

    this.trips.push(newTrip);
    localStorage.setItem('trips', JSON.stringify(this.trips));
    this.startPoint = '';
    this.endPoint = '';
  }

  resetTrip() {
    const confirmed = confirm('Are you sure you want to reset all trip data?');
    if (confirmed) {
      localStorage.clear();
      window.location.reload();
    }
  }
}

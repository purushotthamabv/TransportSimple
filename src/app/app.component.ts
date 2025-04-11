import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Trip } from './model/trip.model';
import { TripInputComponent } from './components/trip-input/trip-input.component';
import { TripVisualizerComponent } from './components/trip-visualizer/trip-visualizer.component';
import { TripService } from './services/trip.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TripInputComponent, TripVisualizerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  trips: Trip[] = [];

  constructor(private tripService: TripService) {}

  handleTripAdd(data: { start: string; end: string }) {
    this.trips = this.tripService.addTrip(data.start, data.end); // returns new ref
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../model/trip.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-input.component.html',
  styleUrl: './trip-input.component.scss'
})
export class TripInputComponent {
  // @Output() tripAdded = new EventEmitter<{ start: string; end: string }>();
  // start = '';
  // end = '';

  // submit() {
  //   if (this.start && this.end) {
  //     this.tripAdded.emit({ start: this.start.trim(), end: this.end.trim() });
  //     this.start = '';
  //     this.end = '';
  //   }
  // }

  start = '';
  end = '';

  @Output() tripAdded = new EventEmitter<{ start: string; end: string }>();

  addTrip() {
    if (this.start && this.end) {
      this.tripAdded.emit({ start: this.start.trim(), end: this.end.trim() });
      this.start = '';
      this.end = '';
    }
  }
}

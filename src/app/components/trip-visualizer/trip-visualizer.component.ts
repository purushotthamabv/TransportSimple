import { Component, Input, SimpleChanges } from '@angular/core';
import { Trip } from '../../model/trip.model';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TripService } from '../../services/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-visualizer',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './trip-visualizer.component.html',
  styleUrl: './trip-visualizer.component.scss'
})
export class TripVisualizerComponent {
  @Input() trips: Trip[] = [];
  positions: { x: number; y: number; trip: Trip }[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['trips']) {
      let x = 60;
      this.positions = this.trips.map(t => {
        const y = this.getY(t.level);
        const p = { x, y, trip: t };
        x += 140;
        return p;
      });
    }
  }

  getY(level: number) {
    return level === 1 ? 100 : level === 2 ? 60 : 140;
  }

  getLineClass(type: string): string {
    return {
      'continued': 'line-straight',
      'constant': 'line-curve-up',
      'returned': 'line-curve-down',
      'diverted': 'line-curve-up'
    }[type] || 'line-arrow';
  }
  
  getLineStyle(i: number): any {
    const a = this.positions[i];
    const b = this.positions[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
    return {
      left: `${a.x + 15}px`,
      top: `${a.y + 15}px`,
      width: `${length}px`,
      transform: `rotate(${angle}deg)`
    };
  }

  getColor(level: number) {
    return level === 1 ? '#333' : level === 2 ? 'orange' : 'blue';
  }

  getPath(i: number) {
    const a = this.positions[i];
    const b = this.positions[i + 1];
    const dy = a.trip.level === 2 ? -40 : 40;
    return `M${a.x},${a.y} C${a.x + 30},${a.y + dy} ${b.x - 30},${b.y + dy} ${b.x},${b.y}`;
  }

}
